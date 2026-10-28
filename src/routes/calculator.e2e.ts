import { expect, test } from '@playwright/test';

function createSyntheticBinaryStlBuffer(
	dx: number,
	dy: number,
	dz: number,
	headerText = 'MetalProm39 Test Binary STL'
): Buffer {
	const triangleCount = 12;
	const buf = Buffer.alloc(84 + triangleCount * 50);

	// 80 bytes header
	buf.write(headerText, 0, Math.min(80, Buffer.byteLength(headerText)), 'ascii');

	// 4 bytes triangle count (Uint32 LE)
	buf.writeUInt32LE(triangleCount, 80);

	const v = [
		[0, 0, 0],
		[dx, 0, 0],
		[dx, dy, 0],
		[0, dy, 0],
		[0, 0, dz],
		[dx, 0, dz],
		[dx, dy, dz],
		[0, dy, dz]
	];

	const triangles = [
		[v[0], v[2], v[1]],
		[v[0], v[3], v[2]],
		[v[4], v[5], v[6]],
		[v[4], v[6], v[7]],
		[v[0], v[1], v[5]],
		[v[0], v[5], v[4]],
		[v[2], v[3], v[7]],
		[v[2], v[7], v[6]],
		[v[0], v[4], v[7]],
		[v[0], v[7], v[3]],
		[v[1], v[2], v[6]],
		[v[1], v[6], v[5]]
	];

	let offset = 84;
	for (const tri of triangles) {
		// Normal (0, 0, 0)
		buf.writeFloatLE(0, offset);
		buf.writeFloatLE(0, offset + 4);
		buf.writeFloatLE(0, offset + 8);
		offset += 12;

		// 3 vertices
		for (const pt of tri) {
			buf.writeFloatLE(pt[0], offset);
			buf.writeFloatLE(pt[1], offset + 4);
			buf.writeFloatLE(pt[2], offset + 8);
			offset += 12;
		}

		// Attribute byte count
		buf.writeUInt16LE(0, offset);
		offset += 2;
	}

	return buf;
}

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

	test('parses uploaded binary STL and synchronizes dimensions with turning operation', async ({
		page
	}) => {
		// Generate synthetic cylindrical shaft (40x40x180 mm)
		const stlBuffer = createSyntheticBinaryStlBuffer(40, 40, 180);

		const fileInput = page.locator('input[data-testid="cad-file-input"]');
		await fileInput.setInputFiles({
			name: 'turning_shaft_d40_l180.stl',
			mimeType: 'model/stl',
			buffer: stlBuffer
		});

		// Info card should appear with model details
		const infoCard = page.locator('[data-testid="cad-info-card"]');
		await expect(infoCard).toBeVisible();
		await expect(infoCard).toContainText('turning_shaft_d40_l180.stl');
		await expect(infoCard).toContainText('STL BINARY');
		await expect(infoCard).toContainText('Распознано тело вращения');

		// Inputs should be synchronized to 180mm length and 40mm diameter
		const lengthInput = page.locator('#dim-length');
		const widthInput = page.locator('#dim-width');
		await expect(lengthInput).toHaveValue('180');
		await expect(widthInput).toHaveValue('40');

		// Clear button should dismiss info card
		const clearBtn = page.locator('[data-testid="cad-clear-btn"]');
		await clearBtn.click();
		await expect(infoCard).not.toBeVisible();
	});

	test('displays error alert when invalid CAD file is uploaded', async ({ page }) => {
		const invalidBuffer = Buffer.from('corrupted non-cad binary payload with no header');

		const fileInput = page.locator('input[data-testid="cad-file-input"]');
		await fileInput.setInputFiles({
			name: 'corrupted_file.stl',
			mimeType: 'model/stl',
			buffer: invalidBuffer
		});

		const errorAlert = page.locator('[data-testid="cad-error-alert"]');
		await expect(errorAlert).toBeVisible();
		await expect(errorAlert).toContainText('Ошибка CAD');
	});
});
