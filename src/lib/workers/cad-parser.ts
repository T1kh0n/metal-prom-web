/**
 * Client-side CAD parser caller.
 * Runs parsing in an isolated, auto-terminating Web Worker to keep main thread free of CPU load.
 * Falls back to synchronous parsing if Web Workers are unavailable in the runtime environment.
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

			const cleanup = () => {
				if (timeoutId) clearTimeout(timeoutId);
				if (worker) {
					worker.terminate();
					worker = null;
				}
			};

			try {
				worker = new Worker(new URL('./cad-parser.worker.ts', import.meta.url), { type: 'module' });

				worker.onmessage = (
					e: MessageEvent<{ success: boolean; data?: CadDimensions; error?: string }>
				) => {
					cleanup();
					if (e.data.success && e.data.data) {
						resolve(e.data.data);
					} else {
						reject(new Error(e.data.error || 'Failed to parse CAD file'));
					}
				};

				worker.onerror = (e) => {
					cleanup();
					reject(new Error(e.message || 'Worker error parsing CAD file'));
				};

				// Set safety timeout of 10s
				timeoutId = setTimeout(() => {
					cleanup();
					reject(new Error('CAD parsing timed out. The file might be corrupted or too complex.'));
				}, 10000);

				worker.postMessage({ fileBuffer: buffer, fileName: file.name }, [buffer]);
			} catch (err) {
				cleanup();
				// Fallback to in-thread parsing if worker instantiation fails (e.g. CSP restrictions)
				try {
					const result = parseCadBuffer(buffer, file.name);
					resolve(result);
				} catch (fallbackErr) {
					reject(fallbackErr);
				}
			}
		});
	}

	// Direct execution fallback for non-worker environments (e.g. tests or server)
	return parseCadBuffer(buffer, file.name);
}
