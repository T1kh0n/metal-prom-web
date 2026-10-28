/**
 * Dedicated Web Worker for CAD file parsing (STL / STEP).
 * Computes bounding box dimensions, exact volume, and rotational symmetry asynchronously
 * without blocking the UI main thread.
 */

import { parseCadBuffer, type CadDimensions } from '../calculator/cad-parser-core';

export type { CadDimensions };

self.onmessage = (event: MessageEvent<{ fileBuffer: ArrayBuffer; fileName: string }>) => {
	const { fileBuffer, fileName } = event.data;

	try {
		const result = parseCadBuffer(fileBuffer, fileName);
		self.postMessage({ success: true, data: result });
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : 'Unknown CAD parsing error';
		self.postMessage({ success: false, error: message });
	}
};
