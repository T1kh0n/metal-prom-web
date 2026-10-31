<script lang="ts">
	import { onMount } from 'svelte';

	interface Point3D {
		x: number;
		y: number;
		z: number;
		layer: number; // 1: Raw Stock, 2: Machined Body, 3: Tolerances, 4: CMM Probes
		baseIntensity: number;
	}

	// Svelte 5 Runes for Layer Ledger Switches
	let showStock = $state(true);
	let showBody = $state(true);
	let showTolerances = $state(true);
	let showProbePoints = $state(true);

	// DOM bindings
	let containerEl: HTMLDivElement | null = $state(null);
	let canvasEl: HTMLCanvasElement | null = $state(null);

	// Callout Plaque Positions (Reactive state in screen pixels)
	let calloutA = $state({ x: 0, y: 0, visible: false, flip: false });
	let calloutB = $state({ x: 0, y: 0, visible: false, flip: false });

	// Interaction state (Full 360-degree continuous Orbit Drag Controls)
	let isHovered = $state(false);
	let isDragging = $state(false);
	let lastPointerX = 0;
	let lastPointerY = 0;

	// Orientation angles: model stays wherever user rotates it
	let rotYaw = $state(-0.42); // Horizontal turntable rotation (360 deg)
	let rotPitch = $state(0.32); // Vertical elevation tilt (-0.85 to +0.85 rad)
	let rotAxial = $state(0.5); // Axial spin around shaft centerline

	let targetYaw = -0.42;
	let targetPitch = 0.32;
	let targetAxial = 0.5;

	// Procedural points cache
	let points: Point3D[] = [];

	function generatePartGeometry(): Point3D[] {
		const pts: Point3D[] = [];

		// ==========================================
		// LAYER 1: Raw Stock Envelope (⌀120 x 250 mm)
		// ==========================================
		const stockR = 60;
		for (let i = 0; i < 14; i++) {
			const x = -115 + (i / 13) * 230;
			for (let j = 0; j < 36; j++) {
				const th = (j / 36) * Math.PI * 2;
				pts.push({
					x,
					y: stockR * Math.cos(th),
					z: stockR * Math.sin(th),
					layer: 1,
					baseIntensity: 0.35
				});
			}
		}
		// Longitudinal generator lines
		for (let j = 0; j < 8; j++) {
			const th = (j / 8) * Math.PI * 2;
			for (let i = 0; i < 30; i++) {
				const x = -115 + (i / 29) * 230;
				pts.push({
					x,
					y: stockR * Math.cos(th),
					z: stockR * Math.sin(th),
					layer: 1,
					baseIntensity: 0.4
				});
			}
		}

		// ==========================================
		// LAYER 2: Machined Body (Turned steps, flats)
		// ==========================================
		// Section 1: Journal 1 (x: -110 to -70, r: 22.5)
		for (let i = 0; i < 18; i++) {
			const x = -110 + (i / 17) * 40;
			for (let j = 0; j < 36; j++) {
				const th = (j / 36) * Math.PI * 2;
				pts.push({
					x,
					y: 22.5 * Math.cos(th),
					z: 22.5 * Math.sin(th),
					layer: 2,
					baseIntensity: 0.65
				});
			}
		}

		// Shoulder Fillet transition (x: -70 to -65, r: 22.5 -> 32.5)
		for (let i = 0; i < 6; i++) {
			const x = -70 + (i / 5) * 5;
			const r = 22.5 + (i / 5) * 10;
			for (let j = 0; j < 36; j++) {
				const th = (j / 36) * Math.PI * 2;
				pts.push({
					x,
					y: r * Math.cos(th),
					z: r * Math.sin(th),
					layer: 2,
					baseIntensity: 0.7
				});
			}
		}

		// Section 2: Center Shaft with Milled Keyway (x: -65 to 0, r: 32.5)
		for (let i = 0; i < 24; i++) {
			const x = -65 + (i / 23) * 65;
			for (let j = 0; j < 40; j++) {
				const th = (j / 40) * Math.PI * 2;
				const r = 32.5;
				let py = r * Math.cos(th);
				let pz = r * Math.sin(th);
				// Milled keyway flat at x in [-48, -18], top arc |pz| < 6.5, py > 24
				if (x >= -48 && x <= -18 && Math.abs(pz) < 7 && py > 24) {
					py = 24;
				}
				pts.push({
					x,
					y: py,
					z: pz,
					layer: 2,
					baseIntensity: 0.68
				});
			}
		}

		// Section 3: Flange Outer Rim (x: 0 to 25, r: 58)
		for (let i = 0; i < 10; i++) {
			const x = 0 + (i / 9) * 25;
			for (let j = 0; j < 48; j++) {
				const th = (j / 48) * Math.PI * 2;
				pts.push({
					x,
					y: 58 * Math.cos(th),
					z: 58 * Math.sin(th),
					layer: 2,
					baseIntensity: 0.75
				});
			}
		}

		// Flange Front & Back Face Discs with 6 bolt holes (⌀10 mm at pitch r=44)
		for (const side of [0, 25]) {
			for (let r = 34; r <= 56; r += 4.5) {
				const count = Math.round(r * 0.9);
				for (let j = 0; j < count; j++) {
					const th = (j / count) * Math.PI * 2;
					const py = r * Math.cos(th);
					const pz = r * Math.sin(th);
					// Filter out points inside 6 bolt holes
					let inHole = false;
					for (let h = 0; h < 6; h++) {
						const hTh = (h / 6) * Math.PI * 2;
						const hY = 44 * Math.cos(hTh);
						const hZ = 44 * Math.sin(hTh);
						if (Math.hypot(py - hY, pz - hZ) < 5.5) {
							inHole = true;
							break;
						}
					}
					if (!inHole) {
						pts.push({
							x: side,
							y: py,
							z: pz,
							layer: 2,
							baseIntensity: 0.72
						});
					}
				}
			}
		}

		// Section 4: Drive End Journal (x: 25 to 95, r: 27.5)
		for (let i = 0; i < 22; i++) {
			const x = 25 + (i / 21) * 70;
			for (let j = 0; j < 36; j++) {
				const th = (j / 36) * Math.PI * 2;
				pts.push({
					x,
					y: 27.5 * Math.cos(th),
					z: 27.5 * Math.sin(th),
					layer: 2,
					baseIntensity: 0.65
				});
			}
		}

		// End Chamfers
		for (let j = 0; j < 24; j++) {
			const th = (j / 24) * Math.PI * 2;
			pts.push({
				x: -110,
				y: 20 * Math.cos(th),
				z: 20 * Math.sin(th),
				layer: 2,
				baseIntensity: 0.8
			});
			pts.push({
				x: 95,
				y: 24 * Math.cos(th),
				z: 24 * Math.sin(th),
				layer: 2,
				baseIntensity: 0.8
			});
		}

		// ==========================================
		// LAYER 3: Precision Tolerance Zones (IT6/IT7)
		// ==========================================
		// Ground Bearing Seat IT6 (x: -105 to -75, r: 22.5)
		for (let i = 0; i < 18; i++) {
			const x = -105 + (i / 17) * 30;
			for (let j = 0; j < 36; j++) {
				const th = (j / 36) * Math.PI * 2 + (i % 2 === 0 ? 0.05 : 0);
				pts.push({
					x,
					y: 22.5 * Math.cos(th),
					z: 22.5 * Math.sin(th),
					layer: 3,
					baseIntensity: 0.85
				});
			}
		}

		// Ground Drive Seat IT7 (x: 35 to 85, r: 27.5)
		for (let i = 0; i < 16; i++) {
			const x = 35 + (i / 15) * 50;
			for (let j = 0; j < 36; j++) {
				const th = (j / 36) * Math.PI * 2 + (i % 2 === 0 ? 0.05 : 0);
				pts.push({
					x,
					y: 27.5 * Math.cos(th),
					z: 27.5 * Math.sin(th),
					layer: 3,
					baseIntensity: 0.85
				});
			}
		}

		// ==========================================
		// LAYER 4: CMM Probe Points (Mitutoyo verified)
		// ==========================================
		// Journal 1 multi-plane circular verification tracks
		for (const tr of [-100, -90, -80]) {
			for (let j = 0; j < 18; j++) {
				const th = (j / 18) * Math.PI * 2;
				pts.push({
					x: tr,
					y: 22.5 * Math.cos(th),
					z: 22.5 * Math.sin(th),
					layer: 4,
					baseIntensity: 1.0
				});
			}
		}

		// Journal 1 axial generatrix run (straightness & runout)
		for (let i = 0; i < 20; i++) {
			pts.push({
				x: -105 + (i / 19) * 30,
				y: 22.5,
				z: 0,
				layer: 4,
				baseIntensity: 1.0
			});
		}

		// Flange face runout verification circle
		for (let j = 0; j < 32; j++) {
			const th = (j / 32) * Math.PI * 2;
			pts.push({
				x: 25,
				y: 50 * Math.cos(th),
				z: 50 * Math.sin(th),
				layer: 4,
				baseIntensity: 1.0
			});
		}

		// Flange bolt hole pitch circles
		for (let h = 0; h < 6; h++) {
			const hTh = (h / 6) * Math.PI * 2;
			const hY = 44 * Math.cos(hTh);
			const hZ = 44 * Math.sin(hTh);
			for (let j = 0; j < 8; j++) {
				const bTh = (j / 8) * Math.PI * 2;
				pts.push({
					x: 25,
					y: hY + 5.5 * Math.cos(bTh),
					z: hZ + 5.5 * Math.sin(bTh),
					layer: 4,
					baseIntensity: 1.0
				});
			}
		}

		// Keyway depth and parallelism touch points
		for (let i = 0; i < 15; i++) {
			pts.push({
				x: -46 + (i / 14) * 26,
				y: 24,
				z: -4,
				layer: 4,
				baseIntensity: 1.0
			});
			pts.push({
				x: -46 + (i / 14) * 26,
				y: 24,
				z: 4,
				layer: 4,
				baseIntensity: 1.0
			});
		}

		// Drive journal diametral inspection tracks
		for (const tr of [45, 60, 75]) {
			for (let j = 0; j < 18; j++) {
				const th = (j / 18) * Math.PI * 2;
				pts.push({
					x: tr,
					y: 27.5 * Math.cos(th),
					z: 27.5 * Math.sin(th),
					layer: 4,
					baseIntensity: 1.0
				});
			}
		}

		return pts;
	}

	onMount(() => {
		points = generatePartGeometry();

		let animId: number;
		let isVisible = true;
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		let prefersReducedMotion = mediaQuery.matches;

		const onMqChange = (e: MediaQueryListEvent) => {
			prefersReducedMotion = e.matches;
		};
		mediaQuery.addEventListener?.('change', onMqChange);

		const ctx = canvasEl?.getContext('2d');
		if (!ctx || !canvasEl || !containerEl) return;

		// Resolve Vantage Palette Colors directly from CSS tokens
		const style = getComputedStyle(document.documentElement);
		const pointLo = style.getPropertyValue('--point-lo').trim() || 'oklch(42% 0.04 245)';
		const pointMid = style.getPropertyValue('--point-mid').trim() || 'oklch(70% 0.04 232)';
		const pointHi = style.getPropertyValue('--point-hi').trim() || 'oklch(96% 0.02 215)';
		const colorAccent = style.getPropertyValue('--color-accent').trim() || 'oklch(89% 0.19 126)';

		let width = 0;
		let height = 0;

		function handleResize() {
			if (!canvasEl || !containerEl) return;
			const rect = containerEl.getBoundingClientRect();
			width = rect.width;
			height = rect.height;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvasEl.width = Math.round(width * dpr);
			canvasEl.height = Math.round(height * dpr);
		}

		handleResize();
		const resizeObserver = new ResizeObserver(handleResize);
		resizeObserver.observe(containerEl);

		// Intersection Observer: 0% CPU consumption when scrolled past
		const observer = new IntersectionObserver(
			(entries) => {
				isVisible = entries[0].isIntersecting;
			},
			{ threshold: 0.05 }
		);
		observer.observe(containerEl);

		let sweepTime = 0;
		let lastTime = performance.now();

		function render(now: number) {
			animId = requestAnimationFrame(render);
			if ((!isVisible && !isDragging) || !ctx || !canvasEl || width === 0) return;

			const delta = Math.min(now - lastTime, 100);
			lastTime = now;

			if (!isDragging && !prefersReducedMotion) {
				// Gentle auto-rotation drift only when idle and reduced motion is NOT requested
				targetYaw += (delta / 45000) * Math.PI * 2;
				targetAxial += (delta / 30000) * Math.PI * 2;
			}
			// Smooth damping interpolation (runs for BOTH regular and reduced motion so manual rotation works on ALL devices!)
			rotYaw += (targetYaw - rotYaw) * 0.22;
			rotPitch += (targetPitch - rotPitch) * 0.22;
			rotAxial += (targetAxial - rotAxial) * 0.22;

			if (!prefersReducedMotion) {
				sweepTime += delta;
			} else {
				sweepTime = 2500;
			}

			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			ctx.save();
			ctx.scale(dpr, dpr);
			ctx.clearRect(0, 0, width, height);

			const pitch = rotPitch;
			const yaw = rotYaw;
			const cosYaw = Math.cos(yaw);
			const sinYaw = Math.sin(yaw);
			const cosPitch = Math.cos(pitch);
			const sinPitch = Math.sin(pitch);
			const cosRot = Math.cos(rotAxial);
			const sinRot = Math.sin(rotAxial);

			// Viewport projection scaling
			const zoom = Math.min(width / 340, height / 250) * 1.05;
			const centerX = width * 0.5;
			const centerY = height * 0.52;

			// Sweep plane along workpiece X axis (-130 to 130 mm every 5 seconds)
			const sweepCycle = (sweepTime % 5000) / 5000;
			const sweepX = -135 + sweepCycle * 270;

			// 3D Callout Anchors tracking
			// Anchor A: Bearing journal top seat at x = -90 (Upper hemisphere)
			const anchorAy = 22.5 * cosRot;
			const anchorAz = 22.5 * sinRot;
			const aX1 = -90 * cosYaw - anchorAz * sinYaw;
			const aZ1 = -90 * sinYaw + anchorAz * cosYaw;
			const aY1 = anchorAy * cosPitch - aZ1 * sinPitch;
			const aZ2 = anchorAy * sinPitch + aZ1 * cosPitch;
			const aScreenX = centerX + aX1 * zoom;
			const aScreenY = centerY - aY1 * zoom;

			// Anchor B: Drive journal at x = 60, bottom seat (Lower hemisphere to prevent collision)
			const anchorBy = -27.5 * cosRot;
			const anchorBz = -27.5 * sinRot;
			const bX1 = 60 * cosYaw - anchorBz * sinYaw;
			const bZ1 = 60 * sinYaw + anchorBz * cosYaw;
			const bY1 = anchorBy * cosPitch - bZ1 * sinPitch;
			const bZ2 = anchorBy * sinPitch + bZ1 * cosPitch;
			const bScreenX = centerX + bX1 * zoom;
			const bScreenY = centerY - bY1 * zoom;

			// Update callout plaque coordinates with intelligent boundary handling
			calloutA = {
				x: Math.round(aScreenX),
				y: Math.round(aScreenY),
				visible: showTolerances && aZ2 > -25,
				flip: aScreenX > width * 0.52
			};

			calloutB = {
				x: Math.round(bScreenX),
				y: Math.round(bScreenY),
				visible: (showTolerances || showProbePoints) && bZ2 > -25,
				flip: bScreenX > width * 0.52
			};

			// Render active point clouds
			for (let i = 0; i < points.length; i++) {
				const pt = points[i];

				// Filter by active Svelte layer toggles
				if (pt.layer === 1 && !showStock) continue;
				if (pt.layer === 2 && !showBody) continue;
				if (pt.layer === 3 && !showTolerances) continue;
				if (pt.layer === 4 && !showProbePoints) continue;

				// Rotation around X axis
				const py = pt.y * cosRot - pt.z * sinRot;
				const pz = pt.y * sinRot + pt.z * cosRot;

				// Isometric pitch & yaw projection
				const x1 = pt.x * cosYaw - pz * sinYaw;
				const z1 = pt.x * sinYaw + pz * cosYaw;
				const y1 = py * cosPitch - z1 * sinPitch;
				const z2 = py * sinPitch + z1 * cosPitch;

				const screenX = centerX + x1 * zoom;
				const screenY = centerY - y1 * zoom;

				// Cull offscreen points
				if (screenX < -10 || screenX > width + 10 || screenY < -10 || screenY > height + 10)
					continue;

				// Sweep plane lighting falloff
				const sweepDist = Math.abs(pt.x - sweepX);
				const isSwept = sweepDist < 16;
				const sweepGain = isSwept ? Math.max(0, 1 - sweepDist / 16) : 0;

				// Point size & color according to layer
				if (pt.layer === 4) {
					// CMM Probe Points: Chromatic Lime Metrology Signal
					const r = isSwept ? 3.4 : 2.4;
					ctx.fillStyle = colorAccent;
					ctx.beginPath();
					ctx.arc(screenX, screenY, r, 0, Math.PI * 2);
					ctx.fill();

					// Metrology pulse halo on sweep
					if (isSwept && sweepGain > 0.4) {
						ctx.fillStyle = 'rgba(159, 255, 64, 0.25)';
						ctx.beginPath();
						ctx.arc(screenX, screenY, r * 2.2, 0, Math.PI * 2);
						ctx.fill();
					}
				} else if (pt.layer === 1) {
					// Raw Stock: instrument wireframe
					ctx.fillStyle = isSwept ? pointHi : pointLo;
					ctx.fillRect(screenX - 0.6, screenY - 0.6, 1.2, 1.2);
				} else if (pt.layer === 3) {
					// Precision Tolerances: Crisp bright bands
					const r = isSwept ? 1.8 : 1.3;
					ctx.fillStyle = isSwept ? pointHi : pointMid;
					ctx.fillRect(screenX - r * 0.5, screenY - r * 0.5, r, r);
				} else {
					// Machined Body: Depth shaded points
					const r = isSwept ? 1.6 : 1.1;
					if (isSwept) {
						ctx.fillStyle = pointHi;
					} else if (z2 > 10) {
						ctx.fillStyle = pointMid;
					} else {
						ctx.fillStyle = pointLo;
					}
					ctx.fillRect(screenX - r * 0.5, screenY - r * 0.5, r, r);
				}
			}

			// Render CMM laser sweep line in 3D projection
			if (!prefersReducedMotion && (showBody || showTolerances || showProbePoints)) {
				const sweepZ = 0;
				const sweepY0 = -65;
				const sweepY1 = 65;

				const swX0 = sweepX * cosYaw - sweepZ * sinYaw;
				const swZ0 = sweepX * sinYaw + sweepZ * cosYaw;
				const sy0 = sweepY0 * cosPitch - swZ0 * sinPitch;
				const sy1 = sweepY1 * cosPitch - swZ0 * sinPitch;

				const lx = centerX + swX0 * zoom;
				const ly0 = centerY - sy0 * zoom;
				const ly1 = centerY - sy1 * zoom;

				ctx.strokeStyle = 'rgba(159, 255, 64, 0.2)';
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(lx, ly0);
				ctx.lineTo(lx, ly1);
				ctx.stroke();
			}

			ctx.restore();
		}

		animId = requestAnimationFrame(render);

		function onGlobalPointerMove(e: PointerEvent) {
			if (!isDragging) return;
			const dx = e.clientX - lastPointerX;
			const dy = e.clientY - lastPointerY;
			lastPointerX = e.clientX;
			lastPointerY = e.clientY;

			targetYaw += dx * 0.007;
			targetPitch = Math.max(-0.85, Math.min(0.85, targetPitch - dy * 0.007));
		}

		function onGlobalPointerUp(e: PointerEvent) {
			if (isDragging) {
				isDragging = false;
				try {
					canvasEl?.releasePointerCapture(e.pointerId);
				} catch {
					// Ignore
				}
			}
		}

		window.addEventListener('pointermove', onGlobalPointerMove, { passive: true });
		window.addEventListener('pointerup', onGlobalPointerUp, { passive: true });
		window.addEventListener('pointercancel', onGlobalPointerUp, { passive: true });

		// Touch gestures explicit handling with non-passive touchmove for mobile devices
		function onTouchStart(e: TouchEvent) {
			if (e.touches.length === 1) {
				isDragging = true;
				lastPointerX = e.touches[0].clientX;
				lastPointerY = e.touches[0].clientY;
			}
		}

		function onTouchMove(e: TouchEvent) {
			if (!isDragging || e.touches.length !== 1) return;
			if (e.cancelable) {
				e.preventDefault(); // Stop mobile browsers from hijacking into page scroll
			}
			const touch = e.touches[0];
			const dx = touch.clientX - lastPointerX;
			const dy = touch.clientY - lastPointerY;
			lastPointerX = touch.clientX;
			lastPointerY = touch.clientY;

			targetYaw += dx * 0.007;
			targetPitch = Math.max(-0.85, Math.min(0.85, targetPitch - dy * 0.007));
		}

		function onTouchEnd() {
			isDragging = false;
		}

		const targetNode = containerEl;
		targetNode.addEventListener('touchstart', onTouchStart, { passive: true });
		targetNode.addEventListener('touchmove', onTouchMove, { passive: false });
		targetNode.addEventListener('touchend', onTouchEnd, { passive: true });
		targetNode.addEventListener('touchcancel', onTouchEnd, { passive: true });

		return () => {
			cancelAnimationFrame(animId);
			resizeObserver.disconnect();
			observer.disconnect();
			mediaQuery.removeEventListener?.('change', onMqChange);
			window.removeEventListener('pointermove', onGlobalPointerMove);
			window.removeEventListener('pointerup', onGlobalPointerUp);
			window.removeEventListener('pointercancel', onGlobalPointerUp);
			targetNode.removeEventListener('touchstart', onTouchStart);
			targetNode.removeEventListener('touchmove', onTouchMove);
			targetNode.removeEventListener('touchend', onTouchEnd);
			targetNode.removeEventListener('touchcancel', onTouchEnd);
		};
	});

	// Interactive 360-degree free orbit drag controls (no snap back)
	function handlePointerDown(e: PointerEvent) {
		if (e.button !== undefined && e.button !== 0) return;
		isDragging = true;
		lastPointerX = e.clientX;
		lastPointerY = e.clientY;
		try {
			(e.currentTarget as HTMLElement)?.setPointerCapture?.(e.pointerId);
		} catch {
			// Window listeners will still catch pointermove and pointerup
		}
	}

	function handlePointerMove(e: PointerEvent) {
		if (!isDragging) return;
		const dx = e.clientX - lastPointerX;
		const dy = e.clientY - lastPointerY;
		lastPointerX = e.clientX;
		lastPointerY = e.clientY;

		// Horizontal drag: rotate turntable yaw continuously without bounds
		targetYaw += dx * 0.007;

		// Vertical drag: tilt pitch with smooth clamping to prevent inverted view
		targetPitch = Math.max(-0.85, Math.min(0.85, targetPitch - dy * 0.007));
	}

	function handlePointerUp(e: PointerEvent) {
		if (isDragging) {
			try {
				(e.currentTarget as HTMLElement)?.releasePointerCapture?.(e.pointerId);
			} catch {
				// Ignore
			}
		}
		isDragging = false;
	}

	function rotateBy(deltaYaw: number, deltaPitch = 0) {
		targetYaw += deltaYaw;
		targetPitch = Math.max(-0.85, Math.min(0.85, targetPitch + deltaPitch));
	}

	function resetOrientation() {
		targetYaw = -0.42;
		targetPitch = 0.32;
		targetAxial = 0.5;
	}
</script>

<section
	id="cmm-twin-section"
	class="border-b border-[var(--color-rule)] bg-[var(--color-paper)] py-16 sm:py-24"
	aria-labelledby="cmm-inspection-heading"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
			<!-- Left: Layer Ledger Switchboard (lg:col-span-5) -->
			<div class="lg:col-span-5">
				<div class="flex items-center gap-2 text-xs text-[var(--color-muted)]">
					<span class="live-dot" aria-hidden="true"></span>
					<span>ОТК и метрология · Цифровой двойник КИМ</span>
				</div>
				<h2 id="cmm-inspection-heading" class="mt-3 text-2xl text-[var(--color-ink)] sm:text-3xl">
					Контроль геометрии и слои обработки
				</h2>
				<p class="lead mt-3 text-sm leading-relaxed text-[var(--color-ink-2)] sm:text-base">
					Инструментальная верификация допусков партии по контрольным точкам КИМ и профилометрам
					Mitutoyo.
				</p>

				<!-- Switchboard Ledger -->
				<ul class="switches" role="group" aria-label="Слои цифрового двойника детали">
					<!-- Layer 1: Raw Stock Envelope -->
					<li class="switch">
						<div class="switch__name">
							<b>Контур заготовки</b>
							<span>Цилиндрический прокат Ø120×250</span>
						</div>
						<div class="switch__n num">1.2<span class="u">&thinsp;k</span></div>
						<button
							type="button"
							role="switch"
							aria-checked={showStock}
							aria-label="Переключить контур заготовки"
							class="switch__btn"
							onclick={() => (showStock = !showStock)}
						>
							<span class="switch__track {showStock ? 'is-active' : ''}"></span>
						</button>
					</li>

					<!-- Layer 2: Machined Body -->
					<li class="switch">
						<div class="switch__name">
							<b>Чистовая геометрия</b>
							<span>Ступенчатый вал со шпонпазом</span>
						</div>
						<div class="switch__n num">2.4<span class="u">&thinsp;k</span></div>
						<button
							type="button"
							role="switch"
							aria-checked={showBody}
							aria-label="Переключить чистовую геометрию"
							class="switch__btn"
							onclick={() => (showBody = !showBody)}
						>
							<span class="switch__track {showBody ? 'is-active' : ''}"></span>
						</button>
					</li>

					<!-- Layer 3: Precision Tolerance Zones (IT6/IT7) -->
					<li class="switch">
						<div class="switch__name">
							<b>Посадочные пояски IT6 / IT7</b>
							<span>Прецизионные шейки Ra 0.38</span>
						</div>
						<div class="switch__n num">0.8<span class="u">&thinsp;k</span></div>
						<button
							type="button"
							role="switch"
							aria-checked={showTolerances}
							aria-label="Переключить зоны допусков"
							class="switch__btn"
							onclick={() => (showTolerances = !showTolerances)}
						>
							<span class="switch__track {showTolerances ? 'is-active' : ''}"></span>
						</button>
					</li>

					<!-- Layer 4: CMM Probe Points (Chromatic Lime Signal) -->
					<li class="switch switch--found">
						<div class="switch__name">
							<b>Точки зондирования ОТК</b>
							<span>Лабораторные замеры КИМ Mitutoyo</span>
						</div>
						<div class="switch__n num text-[var(--color-accent)]">
							0.4<span class="u">&thinsp;k</span>
						</div>
						<button
							type="button"
							role="switch"
							aria-checked={showProbePoints}
							aria-label="Переключить контрольные точки ОТК"
							class="switch__btn"
							onclick={() => (showProbePoints = !showProbePoints)}
						>
							<span class="switch__track {showProbePoints ? 'is-active' : ''}"></span>
						</button>
					</li>
				</ul>
			</div>

			<!-- Right: 3D Point-Cloud Inspection Viewport (lg:col-span-7) -->
			<div class="order-first lg:order-last lg:col-span-7">
				<figure
					class="ticks relative m-0 overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-paper-2)]/40 p-2 sm:p-4"
				>
					<div
						class="relative aspect-[7/5] min-h-[300px] w-full touch-none select-none sm:min-h-[420px]"
						bind:this={containerEl}
						onpointerdown={handlePointerDown}
						onpointermove={handlePointerMove}
						onpointerup={handlePointerUp}
						onpointercancel={handlePointerUp}
						onmouseenter={() => (isHovered = true)}
						onmouseleave={() => (isHovered = false)}
						role="region"
						aria-label="3D интерактивная область инспекции детали"
						style="touch-action: none; -webkit-touch-callout: none; -webkit-user-select: none; user-select: none;"
					>
						<canvas
							bind:this={canvasEl}
							class="block h-full w-full cursor-grab active:cursor-grabbing touch-none select-none"
							style="touch-action: none; -webkit-touch-callout: none; -webkit-user-select: none; user-select: none; -webkit-mask-image: radial-gradient(ellipse 65% 62% at 50% 50%, var(--color-ink) 65%, transparent); mask-image: radial-gradient(ellipse 65% 62% at 50% 50%, var(--color-ink) 65%, transparent);"
						></canvas>

						<!-- Measurement Callout A: Bearing Seat IT6 (Extends UP into upper clearance zone) -->
						<div
							class="callout callout--up {calloutA.visible ? '' : 'is-hidden'} {calloutA.flip
								? 'is-flip'
								: ''}"
							style="transform: translate3d({calloutA.x}px, {calloutA.y}px, 0);"
							aria-hidden="true"
						>
							<div class="callout__dot"></div>
							<div class="callout__leader"></div>
							<div class="callout__note">
								<span>Посадочная шейка под подшипник:</span>
								<b><span class="num">45.000<span class="u">&thinsp;±0.005 мм</span></span></b>
							</div>
						</div>

						<!-- Measurement Callout B: Grinding Roughness IT6 (Extends DOWN into lower clearance zone) -->
						<div
							class="callout callout--found callout--down {calloutB.visible
								? ''
								: 'is-hidden'} {calloutB.flip ? 'is-flip' : ''}"
							style="transform: translate3d({calloutB.x}px, {calloutB.y}px, 0);"
							aria-hidden="true"
						>
							<div class="callout__dot"></div>
							<div class="callout__leader"></div>
							<div class="callout__note">
								<span>Шероховатость шлифования:</span>
								<b><span class="num">0.38<span class="u">&thinsp;Ra мкм [IT6]</span></span></b>
							</div>
						</div>
					</div>

					<!-- Technical Viewport Caption & Quick Turntable Controls -->
					<figcaption
						class="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-rule)] px-2 pt-3 text-[11px] text-[var(--color-muted)]"
					>
						<span class="flex items-center gap-1.5">
							<span>Вращение 360° · потяните мышью или пальцем</span>
						</span>
						<div class="flex items-center gap-1.5">
							<button
								type="button"
								class="inline-flex cursor-pointer items-center justify-center rounded border border-[var(--color-rule-2)] bg-[var(--color-paper-2)]/60 px-2 py-0.5 font-mono text-[11px] text-[var(--color-ink-2)] transition-colors hover:bg-[var(--color-paper-3)] hover:text-[var(--color-ink)]"
								onclick={() => rotateBy(-Math.PI / 4)}
								aria-label="Повернуть деталь влево на 45 градусов"
								title="Повернуть влево (-45°)"
							>
								⟲ -45°
							</button>
							<button
								type="button"
								class="inline-flex cursor-pointer items-center justify-center rounded border border-[var(--color-rule-2)] bg-[var(--color-paper-2)]/60 px-2 py-0.5 font-mono text-[11px] text-[var(--color-ink-2)] transition-colors hover:bg-[var(--color-paper-3)] hover:text-[var(--color-ink)]"
								onclick={() => rotateBy(Math.PI / 4)}
								aria-label="Повернуть деталь вправо на 45 градусов"
								title="Повернуть вправо (+45°)"
							>
								⟳ +45°
							</button>
							<button
								type="button"
								class="inline-flex cursor-pointer items-center justify-center rounded border border-[var(--color-rule)] bg-[var(--color-paper-2)]/30 px-2 py-0.5 font-mono text-[11px] text-[var(--color-muted)] transition-colors hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]"
								onclick={resetOrientation}
								aria-label="Сбросить ракурс детали"
								title="Исходный ракурс"
							>
								Сброс
							</button>
						</div>
					</figcaption>
				</figure>
			</div>
		</div>
	</div>
</section>

<style>
	/* Vantage Switchboard Typography and Layout */
	.switches {
		list-style: none;
		margin: var(--space-xl) 0 0;
		padding: 0;
		border-top: var(--rule-hair) solid var(--color-rule);
	}

	.switch {
		display: grid;
		grid-template-columns: 1fr auto 44px;
		align-items: center;
		gap: var(--space-md);
		padding: var(--space-md) 0;
		border-bottom: var(--rule-hair) solid var(--color-rule);
	}

	.switch__name {
		display: grid;
		gap: 2px;
	}

	.switch__name b {
		font-size: var(--text-md);
		font-weight: 400;
		color: var(--color-ink);
		letter-spacing: -0.01em;
	}

	.switch__name span {
		font-size: var(--text-xs);
		color: var(--color-muted);
	}

	.switch__n {
		color: var(--color-ink-2);
		font-size: var(--text-sm);
	}

	/* Accessible Switch Button */
	.switch__btn {
		width: 44px;
		height: 24px;
		background: transparent;
		border: 0;
		padding: 0;
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	.switch__btn:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 3px;
		border-radius: var(--radius-pill);
	}

	.switch__track {
		position: relative;
		display: block;
		width: 44px;
		height: 24px;
		border-radius: var(--radius-pill);
		box-shadow: inset 0 0 0 var(--rule-hair) var(--color-rule-2);
		background: var(--color-paper-2);
		transition: background var(--dur-short) var(--ease-out);
	}

	.switch__track::after {
		content: '';
		position: absolute;
		top: 4px;
		left: 4px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--color-muted);
		transition:
			transform var(--dur-short) var(--ease-out),
			background var(--dur-short) var(--ease-out);
	}

	.switch__track.is-active {
		background: var(--color-ink);
		box-shadow: none;
	}

	.switch__track.is-active::after {
		transform: translateX(20px);
		background: var(--color-paper);
	}

	/* Lime signal switch for CMM found/live probe points */
	.switch--found .switch__track.is-active {
		background: var(--color-accent);
	}

	.switch--found .switch__track.is-active::after {
		background: var(--color-accent-ink);
	}

	/* Vantage Measurement Callout Leaders & Plaques */
	.callout,
	.callout * {
		pointer-events: none !important;
	}

	.callout {
		position: absolute;
		left: 0;
		top: 0;
		will-change: transform;
		transition: opacity var(--dur-short) var(--ease-out);
	}

	.callout.is-hidden {
		opacity: 0;
	}

	.callout__dot {
		position: absolute;
		left: -3.5px;
		top: -3.5px;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--color-ink);
		box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-paper) 70%, transparent);
	}

	/* Callout A: Extends UP */
	.callout--up .callout__leader {
		position: absolute;
		left: 0;
		bottom: 0;
		width: var(--rule-hair);
		height: 48px;
		background: color-mix(in oklab, var(--color-ink) 55%, transparent);
	}

	.callout--up .callout__note {
		position: absolute;
		left: 0;
		bottom: 48px;
		display: grid;
		gap: 2px;
		padding: 6px 10px;
		white-space: nowrap;
		font-size: var(--text-xs);
		color: var(--color-ink-2);
		background: color-mix(in oklab, var(--color-paper) 88%, transparent);
		backdrop-filter: blur(4px);
		box-shadow: inset var(--rule-hair) 0 0 color-mix(in oklab, var(--color-ink) 55%, transparent);
		border: 1px solid var(--color-rule);
		border-radius: var(--radius-card);
	}

	.callout--up.is-flip .callout__note {
		left: auto;
		right: 0;
		text-align: right;
		box-shadow: inset calc(-1 * var(--rule-hair)) 0 0
			color-mix(in oklab, var(--color-ink) 55%, transparent);
	}

	/* Callout B: Extends DOWN into lower clearance zone */
	.callout--down .callout__leader {
		position: absolute;
		left: 0;
		top: 0;
		width: var(--rule-hair);
		height: 48px;
		background: color-mix(in oklab, var(--color-ink) 55%, transparent);
	}

	.callout--down .callout__note {
		position: absolute;
		left: 0;
		top: 48px;
		display: grid;
		gap: 2px;
		padding: 6px 10px;
		white-space: nowrap;
		font-size: var(--text-xs);
		color: var(--color-ink-2);
		background: color-mix(in oklab, var(--color-paper) 88%, transparent);
		backdrop-filter: blur(4px);
		box-shadow: inset var(--rule-hair) 0 0 color-mix(in oklab, var(--color-ink) 55%, transparent);
		border: 1px solid var(--color-rule);
		border-radius: var(--radius-card);
	}

	.callout--down.is-flip .callout__note {
		left: auto;
		right: 0;
		text-align: right;
		box-shadow: inset calc(-1 * var(--rule-hair)) 0 0
			color-mix(in oklab, var(--color-ink) 55%, transparent);
	}

	.callout__note b {
		font-size: var(--text-sm);
		color: var(--color-ink);
		font-weight: 400;
	}

	/* Found / Mitutoyo Signal Accent */
	.callout--found .callout__dot {
		background: var(--color-accent);
	}

	.callout--found .callout__leader {
		background: var(--color-accent);
	}

	.callout--found .callout__note {
		box-shadow: inset var(--rule-hair) 0 0 var(--color-accent);
		border-color: color-mix(in oklab, var(--color-accent) 40%, var(--color-rule));
	}

	.callout--found.is-flip .callout__note {
		box-shadow: inset calc(-1 * var(--rule-hair)) 0 0 var(--color-accent);
	}
</style>
