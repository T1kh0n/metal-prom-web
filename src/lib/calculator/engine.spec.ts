import { describe, it, expect } from 'vitest';
import { calculateCncQuote } from './engine';
import {
	OPERATIONS,
	SETUP_COMPLEXITIES,
	MATERIALS,
	TOLERANCES,
	COOPERATIVE_OPERATIONS,
	MINIMUM_ORDER_VALUE,
	getBatchDiscountTier
} from './pricing-config';

describe('CNC Cost Calculator Engine (Empirical B2B Pricing)', () => {
	it('enforces strictly 5,000 RUB Minimum Order Value (MOV) on small single-piece orders', () => {
		const result = calculateCncQuote({
			operationId: 'lathe_turning',
			batchQuantity: 1,
			complexityId: 'simple',
			materialId: 'steel_45',
			isCustomerMaterial: false,
			blankLengthMm: 50,
			blankWidthMm: 20,
			blankHeightMm: 20,
			toleranceId: 'standard',
			urgencyId: 'standard'
		});

		expect(result.rawTotal).toBeLessThan(MINIMUM_ORDER_VALUE);
		expect(result.isMinimumOrderApplied).toBe(true);
		expect(result.finalTotal).toBe(5000);
		expect(result.finalUnitPrice).toBe(5000);
		expect(result.recommendedBatchForMov).toBeGreaterThan(1);
	});

	it('computes correct turning hourly rate (2,500 RUB/hr) and setup amortization', () => {
		// Batch of 10 pcs, turning default 0.25h (15 min) per piece
		// Machining unit: 0.25h * 2500 RUB/hr * 1.0 (Steel 45) * 1.0 (Standard tol) * 0.9 (10% batch discount) = 562.5 -> rounded 563 RUB
		const result = calculateCncQuote({
			operationId: 'lathe_turning',
			batchQuantity: 10,
			complexityId: 'simple', // 3,000 RUB setup
			materialId: 'steel_45',
			isCustomerMaterial: true, // ignore raw material
			blankLengthMm: 100,
			blankWidthMm: 30,
			blankHeightMm: 30,
			toleranceId: 'standard',
			urgencyId: 'standard'
		});

		expect(result.unitMachiningCost).toBe(563);
		expect(result.totalSetupCost).toBe(3000);
		expect(result.totalMachiningCost).toBe(5630);
		// Raw total = 3000 setup + 5630 machining = 8630
		expect(result.rawTotal).toBe(8630);
		expect(result.finalTotal).toBe(8630);
		expect(result.isMinimumOrderApplied).toBe(false);
	});

	it('computes 3-axis and 4-axis milling rates (3,000 and 3,500 RUB/hr)', () => {
		const res3Axis = calculateCncQuote({
			operationId: 'milling_3axis',
			batchQuantity: 20,
			complexityId: 'simple',
			materialId: 'steel_45',
			isCustomerMaterial: true,
			blankLengthMm: 100,
			blankWidthMm: 100,
			blankHeightMm: 20,
			toleranceId: 'standard',
			urgencyId: 'standard',
			customCycleTimeMinutes: 60 // 1 hour exactly
		});

		// 1 hour * 3000 RUB/hr * 1.0 * 1.0 * 0.8 (20% discount for 20 pcs) = 2400 RUB
		expect(res3Axis.unitMachiningCost).toBe(2400);

		const res4Axis = calculateCncQuote({
			operationId: 'milling_4axis',
			batchQuantity: 20,
			complexityId: 'simple',
			materialId: 'steel_45',
			isCustomerMaterial: true,
			blankLengthMm: 100,
			blankWidthMm: 100,
			blankHeightMm: 20,
			toleranceId: 'standard',
			urgencyId: 'standard',
			customCycleTimeMinutes: 60 // 1 hour exactly
		});

		// 1 hour * 3500 RUB/hr * 1.0 * 1.0 * 0.8 (20% discount) = 2800 RUB
		expect(res4Axis.unitMachiningCost).toBe(2800);
	});

	it('sets raw material cost to zero when isCustomerMaterial is true', () => {
		const customerMat = calculateCncQuote({
			operationId: 'lathe_turning',
			batchQuantity: 10,
			complexityId: 'simple',
			materialId: 'bronze_brazh', // expensive bronze
			isCustomerMaterial: true,
			blankLengthMm: 200,
			blankWidthMm: 80,
			blankHeightMm: 80,
			toleranceId: 'standard',
			urgencyId: 'standard'
		});

		expect(customerMat.unitMaterialCost).toBe(0);
		expect(customerMat.totalMaterialCost).toBe(0);

		const supplierMat = calculateCncQuote({
			operationId: 'lathe_turning',
			batchQuantity: 10,
			complexityId: 'simple',
			materialId: 'bronze_brazh',
			isCustomerMaterial: false,
			blankLengthMm: 200,
			blankWidthMm: 80,
			blankHeightMm: 80,
			toleranceId: 'standard',
			urgencyId: 'standard'
		});

		expect(supplierMat.unitMaterialCost).toBeGreaterThan(0);
		expect(supplierMat.totalMaterialCost).toBe(supplierMat.unitMaterialCost * 10);
	});

	it('applies high-precision grinding tolerance multiplier (+50%)', () => {
		const standardTol = calculateCncQuote({
			operationId: 'lathe_turning',
			batchQuantity: 10,
			complexityId: 'simple',
			materialId: 'alloy_steel_40kh',
			isCustomerMaterial: true,
			blankLengthMm: 100,
			blankWidthMm: 50,
			blankHeightMm: 50,
			toleranceId: 'standard',
			urgencyId: 'standard',
			customCycleTimeMinutes: 30
		});

		const grindingTol = calculateCncQuote({
			operationId: 'lathe_turning',
			batchQuantity: 10,
			complexityId: 'simple',
			materialId: 'alloy_steel_40kh',
			isCustomerMaterial: true,
			blankLengthMm: 100,
			blankWidthMm: 50,
			blankHeightMm: 50,
			toleranceId: 'high_precision_grinding',
			urgencyId: 'standard',
			customCycleTimeMinutes: 30
		});

		expect(grindingTol.unitMachiningCost).toBe(Math.round(standardTol.unitMachiningCost * 1.5));
	});

	it('enforces heat treatment minimum batch charge of 2,500 RUB', () => {
		// 2 pieces with heat treatment: 2 * 350 = 700 RUB < min 2500 RUB
		const resultSmall = calculateCncQuote({
			operationId: 'lathe_turning',
			batchQuantity: 2,
			complexityId: 'simple',
			materialId: 'alloy_steel_40kh',
			isCustomerMaterial: true,
			blankLengthMm: 100,
			blankWidthMm: 50,
			blankHeightMm: 50,
			toleranceId: 'standard',
			cooperativeOpIds: ['heat_treatment'],
			urgencyId: 'standard'
		});

		const htBreakdown = resultSmall.cooperativeBreakdown.find((c) => c.id === 'heat_treatment');
		expect(htBreakdown?.cost).toBe(2500);
		expect(htBreakdown?.appliedMinCharge).toBe(true);

		// 10 pieces with heat treatment: 10 * 350 = 3500 RUB > min 2500 RUB
		const resultLarge = calculateCncQuote({
			operationId: 'lathe_turning',
			batchQuantity: 10,
			complexityId: 'simple',
			materialId: 'alloy_steel_40kh',
			isCustomerMaterial: true,
			blankLengthMm: 100,
			blankWidthMm: 50,
			blankHeightMm: 50,
			toleranceId: 'standard',
			cooperativeOpIds: ['heat_treatment'],
			urgencyId: 'standard'
		});

		const htLargeBreakdown = resultLarge.cooperativeBreakdown.find(
			(c) => c.id === 'heat_treatment'
		);
		expect(htLargeBreakdown?.cost).toBe(3500);
		expect(htLargeBreakdown?.appliedMinCharge).toBe(false);
	});

	it('applies express urgency multiplier (+50% surcharge)', () => {
		const standard = calculateCncQuote({
			operationId: 'milling_3axis',
			batchQuantity: 20,
			complexityId: 'medium',
			materialId: 'aluminum_d16t',
			isCustomerMaterial: false,
			blankLengthMm: 150,
			blankWidthMm: 100,
			blankHeightMm: 30,
			toleranceId: 'standard',
			urgencyId: 'standard'
		});

		const express = calculateCncQuote({
			operationId: 'milling_3axis',
			batchQuantity: 20,
			complexityId: 'medium',
			materialId: 'aluminum_d16t',
			isCustomerMaterial: false,
			blankLengthMm: 150,
			blankWidthMm: 100,
			blankHeightMm: 30,
			toleranceId: 'standard',
			urgencyId: 'express'
		});

		expect(express.urgencyMultiplier).toBe(1.5);
		expect(express.rawTotal).toBe(Math.round(standard.subtotalBeforeUrgency * 1.5));
		expect(express.urgencySurcharge).toBe(express.rawTotal - standard.subtotalBeforeUrgency);
	});

	it('correctly maps all 5 volume discount tiers', () => {
		expect(getBatchDiscountTier(1).discount).toBe(0.0);
		expect(getBatchDiscountTier(4).discount).toBe(0.0);
		expect(getBatchDiscountTier(5).discount).toBe(0.1);
		expect(getBatchDiscountTier(19).discount).toBe(0.1);
		expect(getBatchDiscountTier(20).discount).toBe(0.2);
		expect(getBatchDiscountTier(49).discount).toBe(0.2);
		expect(getBatchDiscountTier(50).discount).toBe(0.3);
		expect(getBatchDiscountTier(99).discount).toBe(0.3);
		expect(getBatchDiscountTier(100).discount).toBe(0.4);
		expect(getBatchDiscountTier(500).discount).toBe(0.4);
	});
});
