import { expect, test } from '@playwright/test';

const BASE = '/metal-prom-web';

test('has expected h1', async ({ page }) => {
	await page.goto(`${BASE}/`);
	await expect(page.locator('h1')).toBeVisible();
});
