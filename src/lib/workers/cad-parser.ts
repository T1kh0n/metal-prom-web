/**
 * High-performance CAD parsing helper with automatic Web Worker offloading and robust in-thread fallback.
 */

import { parseCadBuffer, type CadDimensions } from '../calculator/cad-parser-core';

export type { CadDimensions };

export async function parseCadFile(file: File): Promise<CadDimensions> {
	const buffer = await file.arrayBuffer();

	// Check if in browser environment with Web Worker support
	if (typeof window !== 'undefined' && typeof Worker !== 'undefined') {
		return new Promise((resolve, reject) => {
			let worker: Worker | null = null;
			let timeoutId: ReturnType<typeof setTimeout> | null = null;
			let finished = false;

			const cleanup = () => {
				if (timeoutId) clearTimeout(timeoutId);
				if (worker) {
					worker.terminate();
					worker = null;
				}
			};

			const fallbackSync = () => {
				if (finished) return;
				finished = true;
				cleanup();
				try {
					const result = parseCadBuffer(buffer, file.name);
					resolve(result);
				} catch (err) {
					reject(err);
				}
			};

			try {
				worker = new Worker(new URL('./cad-parser.worker.ts', import.meta.url), { type: 'module' });

				worker.onmessage = (
					e: MessageEvent<{ success: boolean; data?: CadDimensions; error?: string }>
				) => {
					if (finished) return;
					finished = true;
					cleanup();
					if (e.data.success && e.data.data) {
						resolve(e.data.data);
					} else {
						reject(new Error(e.data.error || 'Failed to parse CAD file'));
					}
				};

				worker.onerror = () => {
					fallbackSync();
				};

				// Fallback after 1.5s if worker is slow or restricted
				timeoutId = setTimeout(() => {
					fallbackSync();
				}, 1500);

				const copy = buffer.slice(0);
				worker.postMessage({ fileBuffer: copy, fileName: file.name }, [copy]);
			} catch {
				fallbackSync();
			}
		});
	}

	return parseCadBuffer(buffer, file.name);
}
