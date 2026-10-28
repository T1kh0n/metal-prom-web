import { describe, expect, it } from 'vitest';
import { detectRotationalSymmetry, parseCadBuffer, type CadDimensions } from './cad-parser-core';

/**
 * Helper to construct a synthetic binary STL ArrayBuffer of a rectangular cuboid.
 * A cuboid has 6 faces * 2 triangles = 12 triangles.
 */
function createSyntheticBinaryStl(
	dx: number,
	dy: number,
	dz: number,
	headerText = 'MetalProm39 Binary STL Generator'
): ArrayBuffer {
	const triangleCount = 12;
	const buffer = new ArrayBuffer(84 + triangleCount * 50);
	const view = new DataView(buffer);

	// 80 bytes header
	const enc = new TextEncoder();
	const headerBytes = enc.encode(headerText);
	for (let i = 0; i < Math.min(80, headerBytes.length); i++) {
		view.setUint8(i, headerBytes[i]);
	}

	// 4 bytes triangle count (Uint32 LE)
	view.setUint32(80, triangleCount, true);

	// 8 vertices of the cuboid
	const v = [
		[0, 0, 0], // 0
		[dx, 0, 0], // 1
		[dx, dy, 0], // 2
		[0, dy, 0], // 3
		[0, 0, dz], // 4
		[dx, 0, dz], // 5
		[dx, dy, dz], // 6
		[0, dy, dz] // 7
	];

	// 12 triangles with outward normals
	const triangles = [
		// Bottom (-Z)
		[v[0], v[2], v[1]],
		[v[0], v[3], v[2]],
		// Top (+Z)
		[v[4], v[5], v[6]],
		[v[4], v[6], v[7]],
		// Front (-Y)
		[v[0], v[1], v[5]],
		[v[0], v[5], v[4]],
		// Back (+Y)
		[v[2], v[3], v[7]],
		[v[2], v[7], v[6]],
		// Left (-X)
		[v[0], v[4], v[7]],
		[v[0], v[7], v[3]],
		// Right (+X)
		[v[1], v[2], v[6]],
		[v[1], v[6], v[5]]
	];

	let offset = 84;
	for (const tri of triangles) {
		// Normal (0, 0, 0) - 12 bytes
		view.setFloat32(offset, 0, true);
		view.setFloat32(offset + 4, 0, true);
		view.setFloat32(offset + 8, 0, true);
		offset += 12;

		// 3 vertices (36 bytes)
		for (const pt of tri) {
			view.setFloat32(offset, pt[0], true);
			view.setFloat32(offset + 4, pt[1], true);
			view.setFloat32(offset + 8, pt[2], true);
			offset += 12;
		}

		// Attribute byte count (2 bytes)
		view.setUint16(offset, 0, true);
		offset += 2;
	}

	return buffer;
}

/**
 * Helper to construct synthetic ASCII STL string for a single triangle.
 */
function createSyntheticAsciiStl(
	v1: [number, number, number],
	v2: [number, number, number],
	v3: [number, number, number]
): ArrayBuffer {
	const text = `solid TestModel
  facet normal 0 0 1
    outer loop
      vertex ${v1[0]} ${v1[1]} ${v1[2]}
      vertex ${v2[0]} ${v2[1]} ${v2[2]}
      vertex ${v3[0]} ${v3[1]} ${v3[2]}
    endloop
  endfacet
endsolid TestModel`;
	return new TextEncoder().encode(text).buffer;
}

describe('CAD Parser Core: Rotational Symmetry Detection', () => {
	it('identifies cylindrical turned shafts along Z axis', () => {
		const result = detectRotationalSymmetry(50, 50, 250);
		expect(result.isRotational).toBe(true);
		expect(result.axis).toBe('z');
		expect(result.diameter).toBe(50);
		expect(result.length).toBe(250);
	});

	it('identifies turned flanges/discs along Z axis', () => {
		const result = detectRotationalSymmetry(180, 180, 25);
		expect(result.isRotational).toBe(true);
		expect(result.axis).toBe('z');
		expect(result.diameter).toBe(180);
		expect(result.length).toBe(25);
	});

	it('identifies rotational parts with minor aspect variations (<= 8%)', () => {
		const result = detectRotationalSymmetry(40.2, 39.8, 120);
		expect(result.isRotational).toBe(true);
		expect(result.axis).toBe('z');
		expect(result.diameter).toBe(40);
		expect(result.length).toBe(120);
	});

	it('identifies shafts along X and Y axes', () => {
		const resX = detectRotationalSymmetry(300, 45, 45);
		expect(resX.isRotational).toBe(true);
		expect(resX.axis).toBe('x');
		expect(resX.diameter).toBe(45);
		expect(resX.length).toBe(300);

		const resY = detectRotationalSymmetry(60, 400, 60);
		expect(resY.isRotational).toBe(true);
		expect(resY.axis).toBe('y');
		expect(resY.diameter).toBe(60);
		expect(resY.length).toBe(400);
	});

	it('classifies asymmetric prismatic parts as non-rotational (milling)', () => {
		const result = detectRotationalSymmetry(150, 80, 25);
		expect(result.isRotational).toBe(false);
		expect(result.length).toBe(150);
		expect(result.diameter).toBe(80);
	});
});

describe('CAD Parser Core: Binary STL Parsing', () => {
	it('parses valid binary STL cuboid with exact dimensions and volume', () => {
		const buffer = createSyntheticBinaryStl(10, 20, 40);
		const result: CadDimensions = parseCadBuffer(buffer, 'test_part.stl');

		expect(result.fileType).toBe('stl_binary');
		expect(result.triangleCount).toBe(12);

		// Bounding box dimensions
		expect(result.boundingBox.dx).toBeCloseTo(10, 1);
		expect(result.boundingBox.dy).toBeCloseTo(20, 1);
		expect(result.boundingBox.dz).toBeCloseTo(40, 1);

		// Sorted length >= width >= height
		expect(result.lengthMm).toBe(40);
		expect(result.widthMm).toBe(20);
		expect(result.heightMm).toBe(10);

		// Volume: 10 * 20 * 40 = 8,000 mm³ = 8.0 cm³
		expect(result.volumeCm3).toBe(8.0);
	});

	it('correctly parses binary STL when header starts with "solid" string (e.g. Blender/MeshLab exports)', () => {
		const buffer = createSyntheticBinaryStl(30, 30, 100, 'solid OpenSCAD Model Binary Export');
		const result = parseCadBuffer(buffer, 'cylinder_shaft.stl');

		expect(result.fileType).toBe('stl_binary');
		expect(result.triangleCount).toBe(12);
		expect(result.isRotationalSymmetric).toBe(true);
		expect(result.suggestedDiameterMm).toBe(30);
		expect(result.suggestedLengthMm).toBe(100);
	});

	it('handles corrupt binary STL with declared triangles exceeding buffer length safely', () => {
		const buffer = new ArrayBuffer(100);
		const view = new DataView(buffer);
		view.setUint32(80, 100000, true); // Declares 100,000 triangles on 100-byte file

		expect(() => parseCadBuffer(buffer, 'corrupt.stl')).toThrow();
	});
});

describe('CAD Parser Core: ASCII STL Parsing', () => {
	it('parses ASCII STL triangle with accurate bounding box and vertex scanning', () => {
		const buffer = createSyntheticAsciiStl([0, 0, 0], [100, 0, 0], [0, 50, 10]);
		const result = parseCadBuffer(buffer, 'wedge.stl');

		expect(result.fileType).toBe('stl_ascii');
		expect(result.triangleCount).toBe(1);
		expect(result.boundingBox.dx).toBe(100);
		expect(result.boundingBox.dy).toBe(50);
		expect(result.boundingBox.dz).toBe(10);
		expect(result.lengthMm).toBe(100);
		expect(result.widthMm).toBe(50);
		expect(result.heightMm).toBe(10);
	});

	it('parses scientific notation in ASCII STL floats', () => {
		const text = `solid Scientific
  facet normal 0 0 1
    outer loop
      vertex 1.25e+01 -2.5E-01 5.0
      vertex 0.0 0.0 0.0
      vertex 25.0 10.0 0.0
    endloop
  endfacet
endsolid Scientific`;
		const buffer = new TextEncoder().encode(text).buffer;
		const result = parseCadBuffer(buffer, 'scientific.stl');

		expect(result.fileType).toBe('stl_ascii');
		expect(result.boundingBox.maxX).toBe(25.0);
		expect(result.boundingBox.minY).toBeCloseTo(-0.25, 2);
	});
});

describe('CAD Parser Core: STEP File Parsing & Unsupported Extensions', () => {
	it('extracts Cartesian points from STEP file content', () => {
		const stepContent = `
ISO-10303-21;
HEADER;
ENDSEC;
DATA;
#10 = CARTESIAN_POINT ( 'Origin', ( 0.0, 0.0, 0.0 ) ) ;
#20 = CARTESIAN_POINT ( 'Corner', ( 120.0, 60.0, 30.0 ) ) ;
#30 = CARTESIAN_POINT ( 'Mid', ( 60.0, 30.0, 15.0 ) ) ;
ENDSEC;
END-ISO-10303-21;`;
		const buffer = new TextEncoder().encode(stepContent).buffer;
		const result = parseCadBuffer(buffer, 'bracket.step');

		expect(result.fileType).toBe('step');
		expect(result.triangleCount).toBe(3);
		expect(result.lengthMm).toBe(120);
		expect(result.widthMm).toBe(60);
		expect(result.heightMm).toBe(30);
	});

	it('rejects unsupported file formats gracefully', () => {
		const buffer = new ArrayBuffer(50);
		expect(() => parseCadBuffer(buffer, 'drawing.dxf')).toThrow(/Unsupported CAD format/i);
		expect(() => parseCadBuffer(buffer, 'spec.pdf')).toThrow(/Unsupported CAD format/i);
	});
});
