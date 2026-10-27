import { expect, test } from '@playwright/test';

test.describe('CNC Cost Calculator Interactive Component', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('renders calculator with default turning operation and inputs', async ({ page }) => {
		await expect(page.locator('#calculator-section')).toBeVisible();
		await expect(
			page.getByText('Инженерный калькулятор механической обработки с ЧПУ')
		).toBeVisible();

		// Check operations are rendered
		await expect(page.getByText('Токарная ЧПУ')).toBeVisible();
		await expect(page.getByText('Фрезерная 3-оси')).toBeVisible();
		await expect(page.getByText('Фрезерная 4-оси / 3D')).toBeVisible();
	});

	test('shows Minimum Order Value warning when batch size is small', async ({ page }) => {
		const qtyInput = page.locator('input[type="number"][min="1"][max="5000"]');
		await qtyInput.fill('1');

		// The 5,000 RUB MOV alert card should be rendered
		const movAlert = page.locator('[data-testid="mov-alert"]');
		await expect(movAlert).toBeVisible();
		await expect(movAlert).toContainText('Минимальный заказ для юрлиц — 5 000 ₽');
	});

	test('updates calculation when toggling own material', async ({ page }) => {
		// Set batch quantity to 20 to avoid MOV clamp
		const qtyInput = page.locator('input[type="number"][min="1"][max="5000"]');
		await qtyInput.fill('20');

		const ownMatCheckbox = page.getByRole('checkbox', {
			name: 'Материал заказчика (давальческий)'
		});

		// Check default state is unchecked
		await expect(ownMatCheckbox).not.toBeChecked();

		// Toggle checkbox
		await ownMatCheckbox.check();
		await expect(ownMatCheckbox).toBeChecked();

		// Check breakdown shows "Давальческий (0 ₽)"
		await expect(page.getByText('Давальческий (0 ₽)')).toBeVisible();
	});
});
