/**
 * Core CAD file parsing engine (STL Binary, STL ASCII, STEP).
 * Pure, platform-agnostic, zero-memory-leak streaming parser using typed arrays.
 * Computes bounding boxes, exact signed volumes (divergence theorem), and rotational symmetry.
 */

export interface BoundingBox {
	minX: number;
	maxX: number;
	minY: number;
	maxY: number;
	minZ: number;
	maxZ: number;
	dx: number;
	dy: number;
	dz: number;
}

export interface RotationalAnalysis {
	isRotational: boolean;
	axis?: 'x' | 'y' | 'z';
	diameter: number;
	length: number;
}

export interface CadDimensions {
	lengthMm: number;
	widthMm: number;
	heightMm: number;
	volumeCm3: number;
	triangleCount: number;
	fileName: string;
	fileType: 'stl_binary' | 'stl_ascii' | 'step' | 'unknown';
	boundingBox: BoundingBox;
	isRotationalSymmetric: boolean;
	rotationalAxis?: 'x' | 'y' | 'z';
	suggestedDiameterMm?: number;
	suggestedLengthMm?: number;
}

/**
 * Analyzes aspect ratio to detect whether a component is rotational (turned on a lathe)
 * or prismatic (machined on a 3-axis/4-axis mill).
 */
export function detectRotationalSymmetry(dx: number, dy: number, dz: number): RotationalAnalysis {
	const threshold = 0.08; // 8% tolerance for matching circular cross-section

	const diffXY = Math.abs(dx - dy) / Math.max(dx, dy, 0.001);
	const diffXZ = Math.abs(dx - dz) / Math.max(dx, dz, 0.001);
	const diffYZ = Math.abs(dy - dz) / Math.max(dy, dz, 0.001);

	// Check rotation around Z axis (dx ≈ dy)
	if (diffXY <= threshold && diffXY <= diffXZ && diffXY <= diffYZ) {
		return {
			isRotational: true,
			axis: 'z',
			diameter: Math.round(((dx + dy) / 2) * 10) / 10,
			length: Math.round(dz * 10) / 10
		};
	}

	// Check rotation around Y axis (dx ≈ dz)
	if (diffXZ <= threshold && diffXZ <= diffXY && diffXZ <= diffYZ) {
		return {
			isRotational: true,
			axis: 'y',
			diameter: Math.round(((dx + dz) / 2) * 10) / 10,
			length: Math.round(dy * 10) / 10
		};
	}

	// Check rotation around X axis (dy ≈ dz)
	if (diffYZ <= threshold && diffYZ <= diffXY && diffYZ <= diffXZ) {
		return {
			isRotational: true,
			axis: 'x',
			diameter: Math.round(((dy + dz) / 2) * 10) / 10,
			length: Math.round(dx * 10) / 10
		};
	}

	const sorted = [dx, dy, dz].sort((a, b) => b - a);
	return {
		isRotational: false,
		diameter: Math.round(sorted[1] * 10) / 10,
		length: Math.round(sorted[0] * 10) / 10
	};
}

/**
 * Parses raw CAD file buffer (STL or STEP) and returns geometric bounding metrics.
 */
export function parseCadBuffer(buffer: ArrayBuffer, fileName: string): CadDimensions {
	const lower = fileName.toLowerCase();

	if (lower.endsWith('.stl')) {
		return parseStl(buffer, fileName);
	}

	if (lower.endsWith('.step') || lower.endsWith('.stp')) {
		return parseStep(buffer, fileName);
	}

	throw new Error('Unsupported CAD format. Only .STL and .STEP (.stp) files are supported.');
}

/**
 * Determines whether the STL buffer is binary or ASCII and executes the corresponding parser.
 */
function parseStl(buffer: ArrayBuffer, fileName: string): CadDimensions {
	const byteLength = buffer.byteLength;

	if (byteLength < 84) {
		// Minimum size for binary STL is 84 bytes (80 header + 4 count)
		// Try ASCII if smaller
		const text = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
		if (text.includes('facet') && text.includes('vertex')) {
			return parseAsciiStl(buffer, fileName);
		}
		throw new Error('STL file is too small or invalid.');
	}

	const view = new DataView(buffer);
	const declaredTriangles = view.getUint32(80, true);
	const expectedBinaryLength = 84 + declaredTriangles * 50;

	// Exact length match guarantees binary STL
	if (expectedBinaryLength === byteLength) {
		return parseBinaryStl(view, declaredTriangles, fileName);
	}

	// Check first 512 bytes for non-printable binary characters (null bytes or byte > 127)
	const sampleLength = Math.min(byteLength, 512);
	const sampleBytes = new Uint8Array(buffer, 0, sampleLength);
	let hasNullByte = false;

	for (let i = 0; i < sampleLength; i++) {
		if (sampleBytes[i] === 0) {
			hasNullByte = true;
			break;
		}
	}

	if (hasNullByte) {
		// Binary STL with trailing comments/padding or custom metadata
		const safeTriangles = Math.min(declaredTriangles, Math.floor((byteLength - 84) / 50));
		return parseBinaryStl(view, safeTriangles, fileName);
	}

	// Attempt ASCII parser
	try {
		return parseAsciiStl(buffer, fileName);
	} catch {
		// Fallback to binary if ASCII fails and length allows at least 1 triangle
		if (byteLength >= 134) {
			const safeTriangles = Math.min(declaredTriangles, Math.floor((byteLength - 84) / 50));
			return parseBinaryStl(view, safeTriangles, fileName);
		}
		throw new Error('Invalid or unreadable STL file.');
	}
}

/**
 * High-speed binary STL parser with O(N) single-pass vertex streaming.
 * Uses DataView for safe unaligned 32-bit float reads across 50-byte facet boundaries.
 */
function parseBinaryStl(view: DataView, triangleCount: number, fileName: string): CadDimensions {
	const totalTriangles = Math.min(triangleCount, Math.floor((view.byteLength - 84) / 50));

	if (totalTriangles <= 0) {
		throw new Error('Binary STL file contains 0 valid triangles.');
	}

	let minX = Infinity,
		maxX = -Infinity;
	let minY = Infinity,
		maxY = -Infinity;
	let minZ = Infinity,
		maxZ = -Infinity;

	let totalSignedVolume = 0;
	let offset = 84;

	for (let i = 0; i < totalTriangles; i++) {
		// Skip facet normal (12 bytes: 3 x float32)
		offset += 12;

		// Vertex 1
		const x1 = view.getFloat32(offset, true);
		const y1 = view.getFloat32(offset + 4, true);
		const z1 = view.getFloat32(offset + 8, true);
		offset += 12;

		// Vertex 2
		const x2 = view.getFloat32(offset, true);
		const y2 = view.getFloat32(offset + 4, true);
		const z2 = view.getFloat32(offset + 8, true);
		offset += 12;

		// Vertex 3
		const x3 = view.getFloat32(offset, true);
		const y3 = view.getFloat32(offset + 4, true);
		const z3 = view.getFloat32(offset + 8, true);
		offset += 12;

		// Skip attribute byte count (2 bytes)
		offset += 2;

		// Skip corrupted/NaN vertices
		if (
			!Number.isFinite(x1) ||
			!Number.isFinite(y1) ||
			!Number.isFinite(z1) ||
			!Number.isFinite(x2) ||
			!Number.isFinite(y2) ||
			!Number.isFinite(z2) ||
			!Number.isFinite(x3) ||
			!Number.isFinite(y3) ||
			!Number.isFinite(z3)
		) {
			continue;
		}

		// Update Bounding Box
		if (x1 < minX) minX = x1;
		if (x1 > maxX) maxX = x1;
		if (x2 < minX) minX = x2;
		if (x2 > maxX) maxX = x2;
		if (x3 < minX) minX = x3;
		if (x3 > maxX) maxX = x3;

		if (y1 < minY) minY = y1;
		if (y1 > maxY) maxY = y1;
		if (y2 < minY) minY = y2;
		if (y2 > maxY) maxY = y2;
		if (y3 < minY) minY = y3;
		if (y3 > maxY) maxY = y3;

		if (z1 < minZ) minZ = z1;
		if (z1 > maxZ) maxZ = z1;
		if (z2 < minZ) minZ = z2;
		if (z2 > maxZ) maxZ = z2;
		if (z3 < minZ) minZ = z3;
		if (z3 > maxZ) maxZ = z3;

		// Signed tetrahedron volume via divergence theorem: (v1 . (v2 x v3)) / 6
		const crossX = y2 * z3 - z2 * y3;
		const crossY = z2 * x3 - x2 * z3;
		const crossZ = x2 * y3 - y2 * x3;
		totalSignedVolume += (x1 * crossX + y1 * crossY + z1 * crossZ) / 6;
	}

	return buildResult({
		minX,
		maxX,
		minY,
		maxY,
		minZ,
		maxZ,
		totalSignedVolume,
		triangleCount: totalTriangles,
		fileName,
		fileType: 'stl_binary'
	});
}

/**
 * Zero-heap-allocation ASCII float scanner from raw byte array.
 * Parses ASCII floating-point numbers without creating intermediate string allocations.
 */
function parseAsciiFloat(bytes: Uint8Array, start: number, end: number): number {
	let i = start;
	let sign = 1;

	if (bytes[i] === 45) {
		// '-'
		sign = -1;
		i++;
	} else if (bytes[i] === 43) {
		// '+'
		i++;
	}

	let intPart = 0;
	while (i < end && bytes[i] >= 48 && bytes[i] <= 57) {
		intPart = intPart * 10 + (bytes[i] - 48);
		i++;
	}

	let fracPart = 0;
	let fracDiv = 1;
	if (i < end && bytes[i] === 46) {
		// '.'
		i++;
		while (i < end && bytes[i] >= 48 && bytes[i] <= 57) {
			fracPart = fracPart * 10 + (bytes[i] - 48);
			fracDiv *= 10;
			i++;
		}
	}

	let val = sign * (intPart + fracPart / fracDiv);

	if (i < end && (bytes[i] === 101 || bytes[i] === 69)) {
		// 'e' or 'E'
		i++;
		let expSign = 1;
		if (bytes[i] === 45) {
			expSign = -1;
			i++;
		} else if (bytes[i] === 43) {
			i++;
		}
		let exp = 0;
		while (i < end && bytes[i] >= 48 && bytes[i] <= 57) {
			exp = exp * 10 + (bytes[i] - 48);
			i++;
		}
		val = val * Math.pow(10, expSign * exp);
	}

	return val;
}

/**
 * Ultra-lightweight streaming ASCII STL parser.
 * Scans byte array directly without generating a massive JS string heap object.
 * Computes exact signed volume and bounding box in a single pass.
 */
function parseAsciiStl(buffer: ArrayBuffer, fileName: string): CadDimensions {
	const bytes = new Uint8Array(buffer);
	const len = bytes.length;

	let minX = Infinity,
		maxX = -Infinity;
	let minY = Infinity,
		maxY = -Infinity;
	let minZ = Infinity,
		maxZ = -Infinity;

	let totalSignedVolume = 0;
	let vertexCount = 0;

	// Triplet coordinates for tetrahedron volume
	let v1x = 0,
		v1y = 0,
		v1z = 0;
	let v2x = 0,
		v2y = 0,
		v2z = 0;

	// Scan for 'vertex' token: 'v'=118, 'e'=101, 'r'=114, 't'=116, 'e'=101, 'x'=120
	let i = 0;
	while (i < len - 10) {
		if (
			bytes[i] === 118 &&
			bytes[i + 1] === 101 &&
			bytes[i + 2] === 114 &&
			bytes[i + 3] === 116 &&
			bytes[i + 4] === 101 &&
			bytes[i + 5] === 120
		) {
			// Verify delimiter before 'vertex'
			const prevByte = i > 0 ? bytes[i - 1] : 32;
			const nextByte = bytes[i + 6];

			if (
				(prevByte === 32 || prevByte === 9 || prevByte === 10 || prevByte === 13 || i === 0) &&
				(nextByte === 32 || nextByte === 9)
			) {
				let cursor = i + 6;

				// Parse X
				while (cursor < len && (bytes[cursor] === 32 || bytes[cursor] === 9)) cursor++;
				const startX = cursor;
				while (
					cursor < len &&
					bytes[cursor] !== 32 &&
					bytes[cursor] !== 9 &&
					bytes[cursor] !== 10 &&
					bytes[cursor] !== 13
				)
					cursor++;
				const x = parseAsciiFloat(bytes, startX, cursor);

				// Parse Y
				while (cursor < len && (bytes[cursor] === 32 || bytes[cursor] === 9)) cursor++;
				const startY = cursor;
				while (
					cursor < len &&
					bytes[cursor] !== 32 &&
					bytes[cursor] !== 9 &&
					bytes[cursor] !== 10 &&
					bytes[cursor] !== 13
				)
					cursor++;
				const y = parseAsciiFloat(bytes, startY, cursor);

				// Parse Z
				while (cursor < len && (bytes[cursor] === 32 || bytes[cursor] === 9)) cursor++;
				const startZ = cursor;
				while (
					cursor < len &&
					bytes[cursor] !== 32 &&
					bytes[cursor] !== 9 &&
					bytes[cursor] !== 10 &&
					bytes[cursor] !== 13
				)
					cursor++;
				const z = parseAsciiFloat(bytes, startZ, cursor);

				if (Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z)) {
					if (x < minX) minX = x;
					if (x > maxX) maxX = x;
					if (y < minY) minY = y;
					if (y > maxY) maxY = y;
					if (z < minZ) minZ = z;
					if (z > maxZ) maxZ = z;

					const mod = vertexCount % 3;
					if (mod === 0) {
						v1x = x;
						v1y = y;
						v1z = z;
					} else if (mod === 1) {
						v2x = x;
						v2y = y;
						v2z = z;
					} else {
						// 3rd vertex: compute tetrahedron volume
						const crossX = v2y * z - v2z * y;
						const crossY = v2z * x - v2x * z;
						const crossZ = v2x * y - v2y * x;
						totalSignedVolume += (v1x * crossX + v1y * crossY + v1z * crossZ) / 6;
					}

					vertexCount++;
				}

				i = cursor;
				continue;
			}
		}
		i++;
	}

	if (vertexCount < 3) {
		throw new Error('No valid triangular facets found in ASCII STL.');
	}

	return buildResult({
		minX,
		maxX,
		minY,
		maxY,
		minZ,
		maxZ,
		totalSignedVolume,
		triangleCount: Math.floor(vertexCount / 3),
		fileName,
		fileType: 'stl_ascii'
	});
}

/**
 * Lightweight STEP / STP coordinate extractor for mechanical bounding box estimation.
 */
function parseStep(buffer: ArrayBuffer, fileName: string): CadDimensions {
	const text = new TextDecoder('utf-8', { fatal: false }).decode(buffer);

	let minX = Infinity,
		maxX = -Infinity;
	let minY = Infinity,
		maxY = -Infinity;
	let minZ = Infinity,
		maxZ = -Infinity;
	let pointCount = 0;

	// Regex for CARTESIAN_POINT('', (X, Y, Z))
	const pointRegex =
		/CARTESIAN_POINT\s*\([^,]*,\s*\(\s*([-\d.eE+]+)\s*,\s*([-\d.eE+]+)\s*,\s*([-\d.eE+]+)\s*\)\s*\)/g;
	let match;

	while ((match = pointRegex.exec(text)) !== null) {
		const x = parseFloat(match[1]);
		const y = parseFloat(match[2]);
		const z = parseFloat(match[3]);

		if (Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z)) {
			if (x < minX) minX = x;
			if (x > maxX) maxX = x;
			if (y < minY) minY = y;
			if (y > maxY) maxY = y;
			if (z < minZ) minZ = z;
			if (z > maxZ) maxZ = z;
			pointCount++;
		}
	}

	if (pointCount === 0) {
		// Fallback generic coordinate tuple scan
		const tupleRegex = /\(\s*([-\d.eE+]{2,})\s*,\s*([-\d.eE+]{2,})\s*,\s*([-\d.eE+]{2,})\s*\)/g;
		while ((match = tupleRegex.exec(text)) !== null) {
			const x = parseFloat(match[1]);
			const y = parseFloat(match[2]);
			const z = parseFloat(match[3]);
			if (
				Number.isFinite(x) &&
				Number.isFinite(y) &&
				Number.isFinite(z) &&
				Math.abs(x) < 20000 &&
				Math.abs(y) < 20000 &&
				Math.abs(z) < 20000
			) {
				if (x < minX) minX = x;
				if (x > maxX) maxX = x;
				if (y < minY) minY = y;
				if (y > maxY) maxY = y;
				if (z < minZ) minZ = z;
				if (z > maxZ) maxZ = z;
				pointCount++;
			}
		}
	}

	if (pointCount === 0) {
		throw new Error('Could not extract Cartesian point coordinates from STEP file.');
	}

	const dx = Math.max(0.1, maxX - minX);
	const dy = Math.max(0.1, maxY - minY);
	const dz = Math.max(0.1, maxZ - minZ);

	const rot = detectRotationalSymmetry(dx, dy, dz);
	const sorted = [dx, dy, dz].sort((a, b) => b - a);

	const lengthMm = Math.round(sorted[0] * 10) / 10;
	const widthMm = Math.round(sorted[1] * 10) / 10;
	const heightMm = Math.round(sorted[2] * 10) / 10;

	// Conservative machined solid ratio estimate (0.70 of bounding box)
	const volumeCm3 = Math.max(0.01, Math.round(((dx * dy * dz) / 1000) * 0.7 * 100) / 100);

	return {
		lengthMm,
		widthMm,
		heightMm,
		volumeCm3,
		triangleCount: pointCount,
		fileName,
		fileType: 'step',
		boundingBox: {
			minX,
			maxX,
			minY,
			maxY,
			minZ,
			maxZ,
			dx,
			dy,
			dz
		},
		isRotationalSymmetric: rot.isRotational,
		rotationalAxis: rot.axis,
		suggestedDiameterMm: rot.diameter,
		suggestedLengthMm: rot.length
	};
}

/**
 * Standardizes calculation of bounding dimensions, volume, and rotational symmetry.
 */
function buildResult(params: {
	minX: number;
	maxX: number;
	minY: number;
	maxY: number;
	minZ: number;
	maxZ: number;
	totalSignedVolume: number;
	triangleCount: number;
	fileName: string;
	fileType: 'stl_binary' | 'stl_ascii';
}): CadDimensions {
	const dx = Math.max(0.1, params.maxX - params.minX);
	const dy = Math.max(0.1, params.maxY - params.minY);
	const dz = Math.max(0.1, params.maxZ - params.minZ);

	const sorted = [dx, dy, dz].sort((a, b) => b - a);
	const lengthMm = Math.round(sorted[0] * 10) / 10;
	const widthMm = Math.round(sorted[1] * 10) / 10;
	const heightMm = Math.round(sorted[2] * 10) / 10;

	const bboxVolumeCm3 = (dx * dy * dz) / 1000;
	const rawVolumeCm3 = Math.abs(params.totalSignedVolume) / 1000;

	// Fallback to solid ratio if signed volume is zero (e.g. inverted/open mesh)
	const volumeCm3 =
		rawVolumeCm3 > 0.001 && rawVolumeCm3 <= bboxVolumeCm3 * 1.05
			? Math.max(0.01, Math.round(rawVolumeCm3 * 100) / 100)
			: Math.max(0.01, Math.round(bboxVolumeCm3 * 0.65 * 100) / 100);

	const rot = detectRotationalSymmetry(dx, dy, dz);

	return {
		lengthMm,
		widthMm,
		heightMm,
		volumeCm3,
		triangleCount: params.triangleCount,
		fileName: params.fileName,
		fileType: params.fileType,
		boundingBox: {
			minX: params.minX,
			maxX: params.maxX,
			minY: params.minY,
			maxY: params.maxY,
			minZ: params.minZ,
			maxZ: params.maxZ,
			dx,
			dy,
			dz
		},
		isRotationalSymmetric: rot.isRotational,
		rotationalAxis: rot.axis,
		suggestedDiameterMm: rot.diameter,
		suggestedLengthMm: rot.length
	};
}
