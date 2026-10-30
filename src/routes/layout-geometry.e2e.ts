import { test, expect, type Page } from '@playwright/test';

const BASE = '/metal-prom-web';
const toRoute = (r: string) => (r.startsWith(BASE) ? r : `${BASE}${r === "/" ? "/" : r}`);

const RAW_ROUTES = [
	'/',
	'/tokarnye-raboty-chpu/',
	'/frezernye-raboty-chpu/',
	'/zuboreznye-i-shlifovalnye-raboty/',
	'/kalkulyator-stoimosti-chpu/',
	'/portfolio/',
	'/kontrol-kachestva-i-oborudovanie/',
	'/kontakty/',
	'/stati/',
	'/stati/vybor-stali-dlya-chpu-obrabotki/',
	'/stati/kvalitety-tochnosti-i-sherohovatost-gost/',
	'/stati/optimizaciya-stoimosti-detaley-chpu/',
	'/politika-konfidentsialnosti/',
	'/sitemap/'
];

const ROUTES = RAW_ROUTES.map(toRoute);

const VIEWPORTS = {
	desktop1440: { width: 1440, height: 900 },
	desktop1280: { width: 1280, height: 800 },
	tablet768: { width: 768, height: 1024 },
	mobile390: { width: 390, height: 844 },
	mobile320: { width: 320, height: 568 }
};

const EXPECTED_NAV_LABELS = [
	'Токарная',
	'Фрезерная',
	'Зуборезка',
	'Калькулятор',
	'Портфолио',
	'ОТК и станки',
	'Статьи',
	'Контакты'
];

test.describe('Rule 1: Viewport Containment & Zero Horizontal Overflow', () => {
	for (const route of ROUTES) {
		for (const [vpName, viewport] of Object.entries(VIEWPORTS)) {
			test(`Route "${route}" at ${vpName} (${viewport.width}x${viewport.height}) has zero horizontal overflow`, async ({
				page
			}) => {
				await page.setViewportSize(viewport);
				await page.goto(route);
				await page.waitForLoadState('domcontentloaded');

				const overflow = await page.evaluate(() => {
					return {
						scrollWidth: document.documentElement.scrollWidth,
						innerWidth: window.innerWidth,
						bodyScrollWidth: document.body.scrollWidth
					};
				});

				expect(
					overflow.scrollWidth,
					`Route ${route} at ${vpName} scrollWidth (${overflow.scrollWidth}) exceeds innerWidth (${overflow.innerWidth})`
				).toBeLessThanOrEqual(overflow.innerWidth);
			});
		}
	}

	test('Invariant 1.2 & 1.3: Mobile header elements sit inside safe viewport bounds without clipping', async ({
		page
	}) => {
		for (const vp of [VIEWPORTS.mobile390, VIEWPORTS.mobile320]) {
			await page.setViewportSize(vp);
			await page.goto(toRoute('/'));

			const headerMetrics = await page.evaluate(() => {
				const header = document.querySelector('header');
				if (!header) return null;

				const brand = header.querySelector('a');
				const burger = header.querySelector('button[aria-label="Переключить меню"]');
				const cta = header.querySelector('a.btn');

				const brandRect = brand?.getBoundingClientRect();
				const burgerRect = burger?.getBoundingClientRect();
				const ctaVisible =
					cta &&
					window.getComputedStyle(cta).display !== 'none' &&
					(cta as HTMLElement).offsetWidth > 0;

				return {
					innerWidth: window.innerWidth,
					brandRect: brandRect ? { left: brandRect.left, right: brandRect.right } : null,
					burgerRect: burgerRect ? { left: burgerRect.left, right: burgerRect.right } : null,
					ctaVisible
				};
			});

			expect(headerMetrics).not.toBeNull();
			// Mobile CTA should be hidden to avoid pushing the burger menu button off-screen
			expect(
				headerMetrics!.ctaVisible,
				`CTA pill button should be hidden on mobile (${vp.width}px)`
			).toBe(false);

			// Burger button must be inside viewport with >= 8px margin
			if (headerMetrics!.burgerRect) {
				expect(headerMetrics!.burgerRect.right).toBeLessThanOrEqual(vp.width - 8);
				expect(headerMetrics!.burgerRect.left).toBeGreaterThanOrEqual(8);
			}

			// Brand must be inside viewport with >= 8px margin
			if (headerMetrics!.brandRect) {
				expect(headerMetrics!.brandRect.left).toBeGreaterThanOrEqual(8);
				if (headerMetrics!.burgerRect) {
					// Brand should not collide with burger button
					expect(headerMetrics!.brandRect.right).toBeLessThan(headerMetrics!.burgerRect.left);
				}
			}
		}
	});

	test('Invariant 1.2: Interactive header and main elements sit inside viewport safe zone across routes on mobile', async ({
		page
	}) => {
		await page.setViewportSize(VIEWPORTS.mobile390);
		for (const route of ROUTES) {
			await page.goto(route);
			const violations = await page.evaluate(() => {
				const issues: string[] = [];
				const w = window.innerWidth;
				const headerLinks = Array.from(document.querySelectorAll('header a, header button'));
				for (const el of headerLinks) {
					const style = window.getComputedStyle(el);
					if (style.display === 'none' || style.visibility === 'hidden') continue;
					const rect = el.getBoundingClientRect();
					if (rect.width === 0 || rect.height === 0) continue;
					if (rect.left < 8 || rect.right > w - 8) {
						issues.push(
							`${el.tagName} (${el.textContent?.trim().slice(0, 20)}): left=${rect.left}, right=${rect.right}, max=${w - 8}`
						);
					}
				}
				return issues;
			});

			expect(violations, `Violations on ${route}: ${violations.join('; ')}`).toEqual([]);
		}
	});
});

test.describe('Rule 2: Header Navigation Geometry & Single-Line Discipline', () => {
	test('Invariant 2.1: Desktop nav links render on a single line with height <= 38px and nowrap', async ({
		page
	}) => {
		for (const vp of [VIEWPORTS.desktop1440, VIEWPORTS.desktop1280]) {
			await page.setViewportSize(vp);
			await page.goto(toRoute('/'));

			const navLinkMetrics = await page.evaluate(() => {
				const links = Array.from(document.querySelectorAll('header nav a'));
				return links.map((a) => {
					const rect = a.getBoundingClientRect();
					const style = window.getComputedStyle(a);
					return {
						text: a.textContent?.trim(),
						whiteSpace: style.whiteSpace,
						height: rect.height,
						width: rect.width
					};
				});
			});

			expect(navLinkMetrics.length).toBeGreaterThan(0);
			for (const link of navLinkMetrics) {
				expect(
					link.whiteSpace,
					`Link "${link.text}" at ${vp.width}px should have white-space: nowrap`
				).toBe('nowrap');
				expect(
					link.height,
					`Link "${link.text}" at ${vp.width}px height (${link.height}) should be <= 38px`
				).toBeLessThanOrEqual(38);
			}
		}
	});

	test('Invariant 2.2: Concise navigation labels', async ({ page }) => {
		await page.setViewportSize(VIEWPORTS.desktop1440);
		await page.goto(toRoute('/'));

		const labels = await page.evaluate(() => {
			const links = Array.from(document.querySelectorAll('header nav a'));
			return links.map((a) => a.textContent?.trim());
		});

		expect(labels).toEqual(EXPECTED_NAV_LABELS);
	});

	test('Invariant 2.3: Minimum sibling clearance in desktop header (gap >= 24px from brand, >= 16px to CTA)', async ({
		page
	}) => {
		for (const vp of [VIEWPORTS.desktop1440, VIEWPORTS.desktop1280]) {
			await page.setViewportSize(vp);
			await page.goto(toRoute('/'));

			const clearances = await page.evaluate(() => {
				const brand = document.querySelector('header a');
				const nav = document.querySelector('header nav');
				const cta = document.querySelector('header a.btn');

				if (!brand || !nav || !cta) return null;

				const brandRect = brand.getBoundingClientRect();
				const navRect = nav.getBoundingClientRect();
				const ctaRect = cta.getBoundingClientRect();

				return {
					brandToNavGap: navRect.left - brandRect.right,
					navToCtaGap: ctaRect.left - navRect.right
				};
			});

			expect(clearances).not.toBeNull();
			expect(
				clearances!.brandToNavGap,
				`At ${vp.width}px: brand to nav clearance (${clearances!.brandToNavGap}px) must be >= 24px`
			).toBeGreaterThanOrEqual(24);
			expect(
				clearances!.navToCtaGap,
				`At ${vp.width}px: nav to CTA clearance (${clearances!.navToCtaGap}px) must be >= 16px`
			).toBeGreaterThanOrEqual(16);
		}
	});

	test('Invariant 2.4: Vertical center alignment of header items within <= 3px tolerance', async ({
		page
	}) => {
		for (const vp of [VIEWPORTS.desktop1440, VIEWPORTS.desktop1280]) {
			await page.setViewportSize(vp);
			await page.goto(toRoute('/'));

			const alignment = await page.evaluate(() => {
				const brand = document.querySelector('header a');
				const nav = document.querySelector('header nav');
				const cta = document.querySelector('header a.btn');

				if (!brand || !nav || !cta) return null;

				const brandCenter =
					brand.getBoundingClientRect().top + brand.getBoundingClientRect().height / 2;
				const navCenter = nav.getBoundingClientRect().top + nav.getBoundingClientRect().height / 2;
				const ctaCenter = cta.getBoundingClientRect().top + cta.getBoundingClientRect().height / 2;

				return {
					brandCenter,
					navCenter,
					ctaCenter,
					brandNavDiff: Math.abs(brandCenter - navCenter),
					navCtaDiff: Math.abs(navCenter - ctaCenter)
				};
			});

			expect(alignment).not.toBeNull();
			expect(
				alignment!.brandNavDiff,
				`At ${vp.width}px: Brand and Nav center diff (${alignment!.brandNavDiff}) must be <= 3px`
			).toBeLessThanOrEqual(3);
			expect(
				alignment!.navCtaDiff,
				`At ${vp.width}px: Nav and CTA center diff (${alignment!.navCtaDiff}) must be <= 3px`
			).toBeLessThanOrEqual(3);
		}
	});
});

test.describe('Rule 3: Copywriting & Typographic Discipline', () => {
	for (const route of ROUTES) {
		test(`Route "${route}" h1 length <= 55 chars, no colons, line budget <= 3 desktop / <= 4 mobile`, async ({
			page
		}) => {
			await page.setViewportSize(VIEWPORTS.desktop1440);
			await page.goto(route);

			const h1Data = await page.evaluate(() => {
				const h1 = document.querySelector('h1');
				if (!h1) return null;
				const text = h1.textContent?.replace(/\s+/g, ' ').trim() || '';
				const rect = h1.getBoundingClientRect();
				const style = window.getComputedStyle(h1);
				const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.05;
				const linesDesktop = Math.round(rect.height / lineHeight);

				return { text, length: text.length, linesDesktop };
			});

			expect(h1Data).not.toBeNull();
			expect(
				h1Data!.length,
				`h1 on "${route}" length (${h1Data!.length}) must be <= 55 chars. Text: "${h1Data!.text}"`
			).toBeLessThanOrEqual(55);
			expect(
				h1Data!.text.includes(':'),
				`h1 on "${route}" must not contain colons (':'). Text: "${h1Data!.text}"`
			).toBe(false);
			expect(
				h1Data!.linesDesktop,
				`h1 on "${route}" desktop lines (${h1Data!.linesDesktop}) must be <= 3`
			).toBeLessThanOrEqual(3);

			// Check mobile line count
			await page.setViewportSize(VIEWPORTS.mobile390);
			const linesMobile = await page.evaluate(() => {
				const h1 = document.querySelector('h1');
				if (!h1) return 0;
				const rect = h1.getBoundingClientRect();
				const style = window.getComputedStyle(h1);
				const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.05;
				return Math.round(rect.height / lineHeight);
			});

			expect(
				linesMobile,
				`h1 on "${route}" mobile lines (${linesMobile}) must be <= 4`
			).toBeLessThanOrEqual(4);
		});

		test(`Route "${route}" lead paragraph length <= 190 chars and lines <= 3 on desktop`, async ({
			page
		}) => {
			await page.setViewportSize(VIEWPORTS.desktop1440);
			await page.goto(route);

			const leadData = await page.evaluate(() => {
				const lead =
					document.querySelector('header .lead') ||
					document.querySelector('main header p') ||
					document.querySelector('.hero .lead') ||
					document.querySelector('main .lead');
				if (!lead) return null;

				const text = lead.textContent?.replace(/\s+/g, ' ').trim() || '';
				const rect = lead.getBoundingClientRect();
				const style = window.getComputedStyle(lead);
				const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.45;
				const lines = Math.round(rect.height / lineHeight);

				return { text, length: text.length, lines, width: rect.width };
			});

			if (leadData) {
				expect(
					leadData.length,
					`Lead paragraph on "${route}" length (${leadData.length}) must be <= 190 chars. Text: "${leadData.text}"`
				).toBeLessThanOrEqual(190);
				expect(
					leadData.lines,
					`Lead paragraph on "${route}" lines (${leadData.lines}) must be <= 3 on desktop`
				).toBeLessThanOrEqual(3);
			}
		});
	}

	test('Invariant 3.2: Paragraph measure on desktop stays <= 760px', async ({ page }) => {
		await page.setViewportSize(VIEWPORTS.desktop1440);
		for (const route of ['/tokarnye-raboty-chpu/', '/frezernye-raboty-chpu/', '/stati/'].map(toRoute)) {
			await page.goto(route);
			const wideParagraphs = await page.evaluate(() => {
				const paragraphs = Array.from(document.querySelectorAll('main p'));
				const issues: { text: string; width: number }[] = [];
				for (const p of paragraphs) {
					// ignore breadcrumbs or tiny labels
					if (p.textContent && p.textContent.length > 80) {
						const rect = p.getBoundingClientRect();
						if (rect.width > 760) {
							issues.push({ text: p.textContent.slice(0, 40) + '...', width: rect.width });
						}
					}
				}
				return issues;
			});

			expect(
				wideParagraphs,
				`Wide paragraphs on ${route} exceeding 760px: ${JSON.stringify(wideParagraphs)}`
			).toEqual([]);
		}
	});
});

test.describe('Rule 4: Macro-Layout Proportions & Container Utilization', () => {
	test('Invariant 4.1: Inner pages utilize full container width (>= 1100px at 1440px desktop)', async ({
		page
	}) => {
		await page.setViewportSize(VIEWPORTS.desktop1440);

		for (const route of ROUTES) {
			await page.goto(route);

			const mainMetrics = await page.evaluate(() => {
				const main = document.querySelector('main');
				if (!main) return null;

				// find the primary content container inside main
				const container = main.querySelector(':scope > div') || main;
				const rect = container.getBoundingClientRect();
				const classList = container.className;

				return {
					width: rect.width,
					hasNarrowConstraint: /max-w-[34]xl/.test(classList)
				};
			});

			expect(mainMetrics).not.toBeNull();
			expect(
				mainMetrics!.hasNarrowConstraint,
				`Route "${route}" top container should not have narrow max-w-3xl or max-w-4xl constraint`
			).toBe(false);
			expect(
				mainMetrics!.width,
				`Route "${route}" container width (${mainMetrics!.width}px) should utilize full container (>= 1100px)`
			).toBeGreaterThanOrEqual(1100);
		}
	});

	test('Invariant 4.3: Mobile content elements span full available content width (>= 350px on 390px viewport)', async ({
		page
	}) => {
		await page.setViewportSize(VIEWPORTS.mobile390);

		for (const route of [
			'/tokarnye-raboty-chpu/',
			'/frezernye-raboty-chpu/',
			'/zuboreznye-i-shlifovalnye-raboty/'
		].map(toRoute)) {
			await page.goto(route);

			const mobileWidths = await page.evaluate(() => {
				const cards = Array.from(document.querySelectorAll('.well, .v-table, table'));
				const widths = cards.map((c) => ({
					tag: c.tagName,
					width: c.getBoundingClientRect().width
				}));
				return widths;
			});

			for (const item of mobileWidths) {
				// cards and tables should be well-fitted across mobile width (>= 340px)
				expect(
					item.width,
					`Element ${item.tag} on ${route} has width ${item.width}px, should be >= 340px on mobile`
				).toBeGreaterThanOrEqual(340);
			}
		}
	});
});

test.describe('Vantage Interactive CNC CMM Inspection Twin Component', () => {
	test('renders CMM digital twin section with canvas, ticks frame, and callout plaques', async ({
		page
	}) => {
		await page.setViewportSize(VIEWPORTS.desktop1440);
		await page.goto(toRoute('/'));

		const section = page.locator('#cmm-twin-section');
		await expect(section).toBeVisible();

		// Check section header
		await expect(section.locator('h2')).toContainText('Контроль геометрии и слои обработки');

		// Check canvas and .ticks frame
		const canvas = section.locator('canvas');
		await expect(canvas).toBeVisible();
		const ticksFrame = section.locator('.ticks');
		await expect(ticksFrame).toBeVisible();

		// Check measurement callouts
		await expect(section.locator('.callout').first()).toBeAttached();
		await expect(section).toContainText('45.000');
		await expect(section).toContainText('0.38');
	});

	test('switchboard toggles all 4 layers reactively', async ({ page }) => {
		await page.setViewportSize(VIEWPORTS.desktop1440);
		await page.goto(toRoute('/'));

		const section = page.locator('#cmm-twin-section');
		const switches = section.locator('button[role="switch"]');
		expect(await switches.count()).toBe(4);

		// Verify initial active state
		for (let i = 0; i < 4; i++) {
			await expect(switches.nth(i)).toHaveAttribute('aria-checked', 'true');
		}

		// Toggle layer 1 (Stock) off and on
		await switches.nth(0).click();
		await expect(switches.nth(0)).toHaveAttribute('aria-checked', 'false');
		await switches.nth(0).click();
		await expect(switches.nth(0)).toHaveAttribute('aria-checked', 'true');

		// Toggle layer 4 (CMM Probes) off and on
		await switches.nth(3).click();
		await expect(switches.nth(3)).toHaveAttribute('aria-checked', 'false');
		await switches.nth(3).click();
		await expect(switches.nth(3)).toHaveAttribute('aria-checked', 'true');
	});

	test('maintains zero horizontal overflow on mobile viewports (390px and 320px)', async ({
		page
	}) => {
		for (const vp of [VIEWPORTS.mobile390, VIEWPORTS.mobile320]) {
			await page.setViewportSize(vp);
			await page.goto(toRoute('/'));

			const overflow = await page.evaluate(() => {
				const section = document.getElementById('cmm-twin-section');
				if (!section) return { scrollWidth: 0, innerWidth: 0 };
				return {
					scrollWidth: document.documentElement.scrollWidth,
					innerWidth: window.innerWidth,
					sectionWidth: section.getBoundingClientRect().width
				};
			});

			expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.innerWidth);
		}
	});

	test('callout plaques do not collide or overlap in 2D space', async ({ page }) => {
		await page.setViewportSize(VIEWPORTS.desktop1440);
		await page.goto(toRoute('/'));

		const section = page.locator('#cmm-twin-section');
		await section.scrollIntoViewIfNeeded();
		await page.waitForTimeout(500);

		const notes = section.locator('.callout__note');
		expect(await notes.count()).toBeGreaterThanOrEqual(2);

		const boxA = await notes.nth(0).boundingBox();
		const boxB = await notes.nth(1).boundingBox();

		if (boxA && boxB) {
			const horizontalOverlap = boxA.x < boxB.x + boxB.width && boxA.x + boxA.width > boxB.x;
			const verticalOverlap = boxA.y < boxB.y + boxB.height && boxA.y + boxA.height > boxB.y;
			const isColliding = horizontalOverlap && verticalOverlap;
			expect(isColliding).toBe(false);
		}
	});
});
