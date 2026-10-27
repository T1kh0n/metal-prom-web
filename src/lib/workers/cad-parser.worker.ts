/**
 * Dedicated Web Worker for CAD file parsing (STL / STEP).
 * Computes bounding box dimensions and volume asynchronously without blocking the UI main thread.
 */

export interface CadDimensions {
	lengthMm: number;
	widthMm: number;
	heightMm: number;
	volumeCm3: number;
	triangleCount?: number;
	fileName: string;
	fileType: 'stl_binary' | 'stl_ascii' | 'step' | 'unknown';
}

self.onmessage = (event: MessageEvent<{ fileBuffer: ArrayBuffer; fileName: string }>) => {
	const { fileBuffer, fileName } = event.data;

	try {
		const lowerName = fileName.toLowerCase();
		if (lowerName.endsWith('.stl')) {
			const result = parseStl(fileBuffer, fileName);
			self.postMessage({ success: true, data: result });
		} else if (lowerName.endsWith('.step') || lowerName.endsWith('.stp')) {
			const result = parseStep(fileBuffer, fileName);
			self.postMessage({ success: true, data: result });
		} else {
			self.postMessage({
				success: false,
				error: 'Unsupported file format. Please upload .STL or .STEP file.'
			});
		}
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : 'Unknown CAD parsing error';
		self.postMessage({ success: false, error: message });
	}
};

function parseStl(buffer: ArrayBuffer, fileName: string): CadDimensions {
	const dataView = new DataView(buffer);
	const byteLength = buffer.byteLength;

	// Check if file is binary STL: byte length must match 84 + 50 * triangleCount
	if (byteLength > 84) {
		const triangleCount = dataView.getUint32(80, true);
		const expectedLength = 84 + triangleCount * 50;

		if (expectedLength === byteLength) {
			return parseBinaryStl(dataView, triangleCount, fileName);
		}
	}

	// Otherwise attempt ASCII STL parsing
	const text = new TextDecoder().decode(buffer);
	if (text.includes('facet normal') || text.includes('vertex')) {
		return parseAsciiStl(text, fileName);
	}

	// Fallback to binary parsing attempt if header had custom bytes
	if (byteLength > 84) {
		const triangleCount = dataView.getUint32(80, true);
		return parseBinaryStl(dataView, triangleCount, fileName);
	}

	throw new Error('Invalid STL file structure.');
}

function parseBinaryStl(
	dataView: DataView,
	triangleCount: number,
	fileName: string
): CadDimensions {
	let minX = Infinity,
		maxX = -Infinity;
	let minY = Infinity,
		maxY = -Infinity;
	let minZ = Infinity,
		maxZ = -Infinity;
	let totalVolume = 0;

	let offset = 84;
	const totalTriangles = Math.min(triangleCount, Math.floor((dataView.byteLength - 84) / 50));

	for (let i = 0; i < totalTriangles; i++) {
		// Skip normal (12 bytes)
		offset += 12;

		// Vertex 1
		const x1 = dataView.getFloat32(offset, true);
		const y1 = dataView.getFloat32(offset + 4, true);
		const z1 = dataView.getFloat32(offset + 8, true);
		offset += 12;

		// Vertex 2
		const x2 = dataView.getFloat32(offset, true);
		const y2 = dataView.getFloat32(offset + 4, true);
		const z2 = dataView.getFloat32(offset + 8, true);
		offset += 12;

		// Vertex 3
		const x3 = dataView.getFloat32(offset, true);
		const y3 = dataView.getFloat32(offset + 4, true);
		const z3 = dataView.getFloat32(offset + 8, true);
		offset += 12;

		// Skip attribute byte count (2 bytes)
		offset += 2;

		minX = Math.min(minX, x1, x2, x3);
		maxX = Math.max(maxX, x1, x2, x3);
		minY = Math.min(minY, y1, y2, y3);
		maxY = Math.max(maxY, y1, y2, y3);
		minZ = Math.min(minZ, z1, z2, z3);
		maxZ = Math.max(maxZ, z1, z2, z3);

		// Signed volume of tetrahedron: (v1 . (v2 x v3)) / 6
		const crossX = y2 * z3 - z2 * y3;
		const crossY = z2 * x3 - x2 * z3;
		const crossZ = x2 * y3 - y2 * x3;
		totalVolume += (x1 * crossX + y1 * crossY + z1 * crossZ) / 6;
	}

	const dx = Math.max(0.1, maxX - minX);
	const dy = Math.max(0.1, maxY - minY);
	const dz = Math.max(0.1, maxZ - minZ);

	const sorted = [dx, dy, dz].sort((a, b) => b - a);
	const lengthMm = Math.round(sorted[0] * 10) / 10;
	const widthMm = Math.round(sorted[1] * 10) / 10;
	const heightMm = Math.round(sorted[2] * 10) / 10;

	// Convert mm³ to cm³
	const volumeCm3 = Math.max(0.01, Math.round((Math.abs(totalVolume) / 1000) * 100) / 100);

	return {
		lengthMm,
		widthMm,
		heightMm,
		volumeCm3,
		triangleCount: totalTriangles,
		fileName,
		fileType: 'stl_binary'
	};
}

function parseAsciiStl(text: string, fileName: string): CadDimensions {
	let minX = Infinity,
		maxX = -Infinity;
	let minY = Infinity,
		maxY = -Infinity;
	let minZ = Infinity,
		maxZ = -Infinity;
	let vertexCount = 0;

	const vertexRegex = /vertex\s+([-\d.eE+]+)\s+([-\d.eE+]+)\s+([-\d.eE+]+)/g;
	let match;

	while ((match = vertexRegex.exec(text)) !== null) {
		const x = parseFloat(match[1]);
		const y = parseFloat(match[2]);
		const z = parseFloat(match[3]);

		if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
			minX = Math.min(minX, x);
			maxX = Math.max(maxX, x);
			minY = Math.min(minY, y);
			maxY = Math.max(maxY, y);
			minZ = Math.min(minZ, z);
			maxZ = Math.max(maxZ, z);
			vertexCount++;
		}
	}

	if (vertexCount === 0) {
		throw new Error('No valid vertices found in ASCII STL.');
	}

	const dx = Math.max(0.1, maxX - minX);
	const dy = Math.max(0.1, maxY - minY);
	const dz = Math.max(0.1, maxZ - minZ);

	const sorted = [dx, dy, dz].sort((a, b) => b - a);
	const lengthMm = Math.round(sorted[0] * 10) / 10;
	const widthMm = Math.round(sorted[1] * 10) / 10;
	const heightMm = Math.round(sorted[2] * 10) / 10;
	const volumeCm3 = Math.round(((dx * dy * dz) / 1000) * 0.75 * 100) / 100; // conservative solid ratio

	return {
		lengthMm,
		widthMm,
		heightMm,
		volumeCm3,
		triangleCount: Math.floor(vertexCount / 3),
		fileName,
		fileType: 'stl_ascii'
	};
}

function parseStep(buffer: ArrayBuffer, fileName: string): CadDimensions {
	const text = new TextDecoder().decode(buffer);
	let minX = Infinity,
		maxX = -Infinity;
	let minY = Infinity,
		maxY = -Infinity;
	let minZ = Infinity,
		maxZ = -Infinity;
	let pointCount = 0;

	// Match CARTESIAN_POINT('',(X,Y,Z)) or CARTESIAN_POINT('...',(X,Y,Z))
	const pointRegex =
		/CARTESIAN_POINT\s*\([^,]*,\s*\(\s*([-\d.eE+]+)\s*,\s*([-\d.eE+]+)\s*,\s*([-\d.eE+]+)\s*\)\s*\)/g;
	let match;

	while ((match = pointRegex.exec(text)) !== null) {
		const x = parseFloat(match[1]);
		const y = parseFloat(match[2]);
		const z = parseFloat(match[3]);

		if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
			minX = Math.min(minX, x);
			maxX = Math.max(maxX, x);
			minY = Math.min(minY, y);
			maxY = Math.max(maxY, y);
			minZ = Math.min(minZ, z);
			maxZ = Math.max(maxZ, z);
			pointCount++;
		}
	}

	if (pointCount === 0) {
		// Fallback simple regex for coordinates inside point tuples
		const genericTuple = /\(\s*([-\d.eE+]{2,})\s*,\s*([-\d.eE+]{2,})\s*,\s*([-\d.eE+]{2,})\s*\)/g;
		while ((match = genericTuple.exec(text)) !== null) {
			const x = parseFloat(match[1]);
			const y = parseFloat(match[2]);
			const z = parseFloat(match[3]);
			if (
				!isNaN(x) &&
				!isNaN(y) &&
				!isNaN(z) &&
				Math.abs(x) < 10000 &&
				Math.abs(y) < 10000 &&
				Math.abs(z) < 10000
			) {
				minX = Math.min(minX, x);
				maxX = Math.max(maxX, x);
				minY = Math.min(minY, y);
				maxY = Math.max(maxY, y);
				minZ = Math.min(minZ, z);
				maxZ = Math.max(maxZ, z);
				pointCount++;
			}
		}
	}

	if (pointCount === 0) {
		throw new Error('Could not extract Cartesian coordinates from STEP file.');
	}

	const dx = Math.max(0.1, maxX - minX);
	const dy = Math.max(0.1, maxY - minY);
	const dz = Math.max(0.1, maxZ - minZ);

	const sorted = [dx, dy, dz].sort((a, b) => b - a);
	const lengthMm = Math.round(sorted[0] * 10) / 10;
	const widthMm = Math.round(sorted[1] * 10) / 10;
	const heightMm = Math.round(sorted[2] * 10) / 10;
	const volumeCm3 = Math.round(((dx * dy * dz) / 1000) * 0.7 * 100) / 100;

	return {
		lengthMm,
		widthMm,
		heightMm,
		volumeCm3,
		fileName,
		fileType: 'step'
	};
}
