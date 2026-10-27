/**
 * High-performance, energy-efficient O(1) CNC Machining Cost Estimation Engine.
 * Formulated from empirical Kaliningrad B2B industrial market benchmarks.
 */

import {
	OPERATIONS,
	SETUP_COMPLEXITIES,
	MATERIALS,
	TOLERANCES,
	COOPERATIVE_OPERATIONS,
	URGENCIES,
	MINIMUM_ORDER_VALUE,
	SAWING_ALLOWANCE_FACTOR,
	getBatchDiscountTier
} from './pricing-config';

export interface CalculationInput {
	operationId: string;
	batchQuantity: number;
	complexityId: string;
	materialId: string;
	isCustomerMaterial: boolean;
	blankLengthMm: number;
	blankWidthMm: number;
	blankHeightMm: number;
	partType?: 'round' | 'prismatic';
	toleranceId: string;
	cooperativeOpIds?: string[];
	urgencyId: string;
	customCycleTimeMinutes?: number;
	engineeringHours?: number;
}

export interface CooperativeItemBreakdown {
	id: string;
	nameRu: string;
	cost: number;
	appliedMinCharge: boolean;
}

export interface CalculationResult {
	// Unit economics
	blankVolumeCm3: number;
	blankMassKg: number;
	unitMaterialCost: number;
	unitMachiningCycleMinutes: number;
	unitMachiningCost: number;
	unitSetupCostAmortized: number;
	unitEngineeringCostAmortized: number;
	unitCooperativeCostAmortized: number;
	unitPriceWithoutUrgency: number;
	finalUnitPrice: number;

	// Batch totals
	totalBatchQuantity: number;
	totalMaterialCost: number;
	totalMachiningCost: number;
	totalSetupCost: number;
	totalEngineeringCost: number;
	totalCooperativeCost: number;
	cooperativeBreakdown: CooperativeItemBreakdown[];
	subtotalBeforeUrgency: number;
	urgencyMultiplier: number;
	urgencySurcharge: number;
	rawTotal: number;
	finalTotal: number;

	// B2B & MOV thresholds
	isMinimumOrderApplied: boolean;
	minimumOrderThreshold: number;
	recommendedBatchForMov: number;
	recommendedBatchUnitCost: number;
	batchDiscountPercent: number;

	// Labels for display & quote generation
	selectedOperationName: string;
	selectedMaterialName: string;
	selectedToleranceName: string;
	selectedUrgencyName: string;
}

/**
 * Pure, side-effect-free, deterministic O(1) quote calculation.
 */
export function calculateCncQuote(input: CalculationInput): CalculationResult {
	const quantity = Math.max(1, Math.floor(input.batchQuantity || 1));
	const length = Math.max(1, input.blankLengthMm || 10);
	const width = Math.max(1, input.blankWidthMm || 10);
	const height = Math.max(1, input.blankHeightMm || 10);

	const operation = OPERATIONS[input.operationId] ?? OPERATIONS.lathe_turning;
	const complexity = SETUP_COMPLEXITIES[input.complexityId] ?? SETUP_COMPLEXITIES.simple;
	const material = MATERIALS[input.materialId] ?? MATERIALS.steel_45;
	const tolerance = TOLERANCES[input.toleranceId] ?? TOLERANCES.standard;
	const urgency = URGENCIES[input.urgencyId] ?? URGENCIES.standard;

	// 1. Calculate blank volume in cm³
	const isRound = input.partType === 'round' || operation.id === 'lathe_turning';

	let blankVolumeCm3: number;
	if (isRound) {
		const diameter = Math.max(width, height);
		const radius = diameter / 2;
		blankVolumeCm3 = (Math.PI * radius * radius * length) / 1000;
	} else {
		blankVolumeCm3 = (length * width * height) / 1000;
	}

	// 2. Blank mass in kg with cutting/facing allowance factor (1.15)
	const blankMassKg = (blankVolumeCm3 * material.density * SAWING_ALLOWANCE_FACTOR) / 1000;

	// 3. Raw material cost per piece
	const unitMaterialCost = input.isCustomerMaterial
		? 0
		: Math.round(blankMassKg * material.pricePerKg);
	const totalMaterialCost = unitMaterialCost * quantity;

	// 4. Machining cycle time & batch discount
	const cycleTimeHours =
		input.customCycleTimeMinutes && input.customCycleTimeMinutes > 0
			? input.customCycleTimeMinutes / 60
			: operation.defaultCycleTimeHours;

	const discountTier = getBatchDiscountTier(quantity);
	const batchDiscountPercent = Math.round(discountTier.discount * 100);

	// Unit machining cost = T_cycle * R_op * K_mat * K_tol * D_batch
	const unitMachiningCost = Math.round(
		cycleTimeHours *
			operation.ratePerHour *
			material.machinabilityK *
			tolerance.multiplier *
			discountTier.multiplier
	);
	const totalMachiningCost = unitMachiningCost * quantity;

	// 5. Setup fee & Engineering
	const totalSetupCost = complexity.fee;
	const engineeringHours = Math.max(0, input.engineeringHours || 0);
	const totalEngineeringCost = engineeringHours * OPERATIONS.engineering.ratePerHour;

	// 6. Cooperative operations
	const selectedCoopIds = input.cooperativeOpIds || [];
	const cooperativeBreakdown: CooperativeItemBreakdown[] = [];
	let totalCooperativeCost = 0;

	for (const opId of selectedCoopIds) {
		const coop = COOPERATIVE_OPERATIONS[opId];
		if (!coop) continue;
		const perPieceCost = coop.pricePerPiece * quantity;
		const finalOpCost = Math.max(coop.minBatchCharge, perPieceCost);
		const appliedMinCharge = coop.minBatchCharge > perPieceCost;

		cooperativeBreakdown.push({
			id: coop.id,
			nameRu: coop.nameRu,
			cost: finalOpCost,
			appliedMinCharge
		});
		totalCooperativeCost += finalOpCost;
	}

	// 7. Subtotal before urgency
	const subtotalBeforeUrgency =
		totalMaterialCost +
		totalMachiningCost +
		totalSetupCost +
		totalEngineeringCost +
		totalCooperativeCost;

	// 8. Urgency multiplier
	const urgencyMultiplier = urgency.multiplier;
	const rawTotal = Math.round(subtotalBeforeUrgency * urgencyMultiplier);
	const urgencySurcharge = rawTotal - subtotalBeforeUrgency;

	// 9. Minimum Order Value (MOV) enforcement (5,000 RUB floor)
	const isMinimumOrderApplied = rawTotal < MINIMUM_ORDER_VALUE;
	const finalTotal = isMinimumOrderApplied ? MINIMUM_ORDER_VALUE : Math.round(rawTotal / 10) * 10;

	// 10. Unit amortizations
	const unitSetupCostAmortized = Math.round((totalSetupCost / quantity) * 10) / 10;
	const unitEngineeringCostAmortized = Math.round((totalEngineeringCost / quantity) * 10) / 10;
	const unitCooperativeCostAmortized = Math.round((totalCooperativeCost / quantity) * 10) / 10;
	const unitPriceWithoutUrgency = Math.round((subtotalBeforeUrgency / quantity) * 10) / 10;
	const finalUnitPrice = Math.round((finalTotal / quantity) * 10) / 10;

	// 11. MOV recommendation calculation (if rawTotal < 5,000)
	let recommendedBatchForMov = quantity;
	let recommendedBatchUnitCost = finalUnitPrice;

	if (isMinimumOrderApplied) {
		// Find lowest batch quantity N >= quantity where rawTotal exceeds 5,000 RUB
		for (let testQty = quantity + 1; testQty <= 200; testQty++) {
			const testResult = calculateCncQuote({
				...input,
				batchQuantity: testQty
			});
			if (!testResult.isMinimumOrderApplied) {
				recommendedBatchForMov = testQty;
				recommendedBatchUnitCost = testResult.finalUnitPrice;
				break;
			}
		}
	}

	return {
		blankVolumeCm3: Math.round(blankVolumeCm3 * 100) / 100,
		blankMassKg: Math.round(blankMassKg * 1000) / 1000,
		unitMaterialCost,
		unitMachiningCycleMinutes: Math.round(cycleTimeHours * 60),
		unitMachiningCost,
		unitSetupCostAmortized,
		unitEngineeringCostAmortized,
		unitCooperativeCostAmortized,
		unitPriceWithoutUrgency,
		finalUnitPrice,
		totalBatchQuantity: quantity,
		totalMaterialCost,
		totalMachiningCost,
		totalSetupCost,
		totalEngineeringCost,
		totalCooperativeCost,
		cooperativeBreakdown,
		subtotalBeforeUrgency,
		urgencyMultiplier,
		urgencySurcharge,
		rawTotal,
		finalTotal,
		isMinimumOrderApplied,
		minimumOrderThreshold: MINIMUM_ORDER_VALUE,
		recommendedBatchForMov,
		recommendedBatchUnitCost,
		batchDiscountPercent,
		selectedOperationName: operation.nameRu,
		selectedMaterialName: `${material.nameRu} (${material.gradeRu})`,
		selectedToleranceName: `${tolerance.nameRu} [${tolerance.roughnessRa}]`,
		selectedUrgencyName: urgency.nameRu
	};
}
