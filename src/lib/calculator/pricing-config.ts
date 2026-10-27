/**
 * Empirical B2B CNC Pricing Configuration for Kaliningrad Oblast.
 * Grounded in empirical market research (../market_summary_and_recommendations.md, ../competitors_flat.csv).
 */

export interface OperationRate {
	id: string;
	nameRu: string;
	shortNameRu: string;
	ratePerHour: number;
	defaultCycleTimeHours: number;
}

export interface SetupComplexity {
	id: string;
	nameRu: string;
	descriptionRu: string;
	fee: number;
}

export interface MaterialConfig {
	id: string;
	nameRu: string;
	gradeRu: string;
	density: number; // g/cm³
	pricePerKg: number; // RUB/kg (regional Kaliningrad supplier benchmark)
	machinabilityK: number; // Machinability coefficient
	chipCategory: 'ferrous' | 'alloy' | 'stainless' | 'non_ferrous' | 'plastic';
}

export interface ToleranceConfig {
	id: string;
	nameRu: string;
	toleranceGrade: string;
	roughnessRa: string;
	multiplier: number;
	includesGrinding: boolean;
}

export interface CooperativeOpConfig {
	id: string;
	nameRu: string;
	descriptionRu: string;
	pricePerPiece: number;
	minBatchCharge: number;
}

export interface BatchDiscountTier {
	minQty: number;
	maxQty: number;
	discount: number; // fraction 0.0 to 1.0
	multiplier: number; // (1 - discount)
}

export interface UrgencyConfig {
	id: string;
	nameRu: string;
	leadTimeRu: string;
	multiplier: number;
}

export const MINIMUM_ORDER_VALUE = 5000; // Strictly 5,000 RUB for legal entities
export const SAWING_ALLOWANCE_FACTOR = 1.15; // 15% allowance for sawing, kerf, and facing cuts

export const OPERATIONS: Record<string, OperationRate> = {
	lathe_turning: {
		id: 'lathe_turning',
		nameRu: 'Токарная обработка на станках с ЧПУ',
		shortNameRu: 'Токарная ЧПУ',
		ratePerHour: 2500,
		defaultCycleTimeHours: 0.25 // 15 min default cycle
	},
	milling_3axis: {
		id: 'milling_3axis',
		nameRu: 'Фрезерная обработка на станках с ЧПУ (3 оси)',
		shortNameRu: 'Фрезерная 3-оси',
		ratePerHour: 3000,
		defaultCycleTimeHours: 0.35 // 21 min default cycle
	},
	milling_4axis: {
		id: 'milling_4axis',
		nameRu: 'Фрезерная обработка 4-осевая / 3D фасонная',
		shortNameRu: 'Фрезерная 4-оси / 3D',
		ratePerHour: 3500,
		defaultCycleTimeHours: 0.5 // 30 min default cycle
	},
	engineering: {
		id: 'engineering',
		nameRu: 'CAD/CAM программирование и реверс-инжиниринг',
		shortNameRu: 'Инжиниринг / УП',
		ratePerHour: 2000,
		defaultCycleTimeHours: 1.0
	}
};

export const OPERATIONS_LIST: OperationRate[] = Object.values(OPERATIONS);

export const SETUP_COMPLEXITIES: Record<string, SetupComplexity> = {
	simple: {
		id: 'simple',
		nameRu: 'Простая геометрия',
		descriptionRu: '1–2 установа, стандартный инструмент, цилиндрические или плоские контуры',
		fee: 3000
	},
	medium: {
		id: 'medium',
		nameRu: 'Средняя сложность',
		descriptionRu: '2–3 установа, фасонный инструмент, ступенчатые переходы, резьбы, пазы',
		fee: 4000
	},
	complex: {
		id: 'complex',
		nameRu: 'Высокая сложность',
		descriptionRu: 'Многоосевая обработка, тонкостенные элементы, специальные приспособления',
		fee: 5000
	}
};

export const SETUP_COMPLEXITIES_LIST: SetupComplexity[] = Object.values(SETUP_COMPLEXITIES);

export const MATERIALS: Record<string, MaterialConfig> = {
	steel_45: {
		id: 'steel_45',
		nameRu: 'Конструкционная сталь',
		gradeRu: 'Сталь 45 / Ст20',
		density: 7.85,
		pricePerKg: 140,
		machinabilityK: 1.0,
		chipCategory: 'ferrous'
	},
	alloy_steel_40kh: {
		id: 'alloy_steel_40kh',
		nameRu: 'Легированная сталь',
		gradeRu: 'Сталь 40Х / 09Г2С',
		density: 7.85,
		pricePerKg: 175,
		machinabilityK: 1.15,
		chipCategory: 'alloy'
	},
	stainless_steel_304: {
		id: 'stainless_steel_304',
		nameRu: 'Нержавеющая сталь',
		gradeRu: '12Х18Н10Т / AISI 304',
		density: 7.9,
		pricePerKg: 520,
		machinabilityK: 1.45,
		chipCategory: 'stainless'
	},
	aluminum_d16t: {
		id: 'aluminum_d16t',
		nameRu: 'Алюминиевые сплавы',
		gradeRu: 'Д16Т / АМг6',
		density: 2.78,
		pricePerKg: 680,
		machinabilityK: 0.85,
		chipCategory: 'non_ferrous'
	},
	brass_ls59: {
		id: 'brass_ls59',
		nameRu: 'Латунь',
		gradeRu: 'ЛС59-1',
		density: 8.5,
		pricePerKg: 950,
		machinabilityK: 0.8,
		chipCategory: 'non_ferrous'
	},
	bronze_brazh: {
		id: 'bronze_brazh',
		nameRu: 'Бронза',
		gradeRu: 'БрАЖ9-4 / БрОФ',
		density: 7.5,
		pricePerKg: 1150,
		machinabilityK: 1.1,
		chipCategory: 'non_ferrous'
	},
	plastic_caprolon_pom: {
		id: 'plastic_caprolon_pom',
		nameRu: 'Инженерные пластики',
		gradeRu: 'Капролон ПА6 / ПОМ-С (полиацеталь)',
		density: 1.3,
		pricePerKg: 550,
		machinabilityK: 0.75,
		chipCategory: 'plastic'
	}
};

export const MATERIALS_LIST: MaterialConfig[] = Object.values(MATERIALS);

export const TOLERANCES: Record<string, ToleranceConfig> = {
	standard: {
		id: 'standard',
		nameRu: 'Стандартная (IT10–IT12)',
		toleranceGrade: 'IT10–IT12',
		roughnessRa: 'Ra 3.2–6.3',
		multiplier: 1.0,
		includesGrinding: false
	},
	elevated: {
		id: 'elevated',
		nameRu: 'Повышенная (IT8–IT9)',
		toleranceGrade: 'IT8–IT9',
		roughnessRa: 'Ra 1.6',
		multiplier: 1.25,
		includesGrinding: false
	},
	high_precision_grinding: {
		id: 'high_precision_grinding',
		nameRu: 'Высокоточная со шлифовкой (IT6–IT7)',
		toleranceGrade: 'IT6–IT7',
		roughnessRa: 'Ra 0.4–0.8',
		multiplier: 1.5,
		includesGrinding: true
	}
};

export const TOLERANCES_LIST: ToleranceConfig[] = Object.values(TOLERANCES);

export const COOPERATIVE_OPERATIONS: Record<string, CooperativeOpConfig> = {
	heat_treatment: {
		id: 'heat_treatment',
		nameRu: 'Термообработка / Закалка ТВЧ',
		descriptionRu: 'Объемная закалка, нормализация или ТВЧ-закалка поверхностного слоя',
		pricePerPiece: 350,
		minBatchCharge: 2500
	},
	gear_cutting: {
		id: 'gear_cutting',
		nameRu: 'Зубонарезка / Нарезка шлицев',
		descriptionRu: 'Нарезка прямозубых/косозубых шестерен, шлицевых валов и шпоночных пазов',
		pricePerPiece: 600,
		minBatchCharge: 0
	},
	galvanic_coating: {
		id: 'galvanic_coating',
		nameRu: 'Гальваника / Анодирование / Воронение',
		descriptionRu:
			'Защитные и декоративные покрытия: цинкование, черное оксидирование, анодирование D16T',
		pricePerPiece: 200,
		minBatchCharge: 0
	}
};

export const COOPERATIVE_OPERATIONS_LIST: CooperativeOpConfig[] =
	Object.values(COOPERATIVE_OPERATIONS);

export const BATCH_DISCOUNT_TIERS: BatchDiscountTier[] = [
	{ minQty: 1, maxQty: 4, discount: 0.0, multiplier: 1.0 },
	{ minQty: 5, maxQty: 19, discount: 0.1, multiplier: 0.9 },
	{ minQty: 20, maxQty: 49, discount: 0.2, multiplier: 0.8 },
	{ minQty: 50, maxQty: 99, discount: 0.3, multiplier: 0.7 },
	{ minQty: 100, maxQty: Infinity, discount: 0.4, multiplier: 0.6 }
];

export const URGENCIES: Record<string, UrgencyConfig> = {
	standard: {
		id: 'standard',
		nameRu: 'Стандартный срок',
		leadTimeRu: '5–7 рабочих дней',
		multiplier: 1.0
	},
	express: {
		id: 'express',
		nameRu: 'Срочный аварийный заказ',
		leadTimeRu: '48–72 часа (+50%)',
		multiplier: 1.5
	}
};

export const URGENCIES_LIST: UrgencyConfig[] = Object.values(URGENCIES);

/**
 * Returns batch discount tier for a specified quantity.
 */
export function getBatchDiscountTier(quantity: number): BatchDiscountTier {
	const safeQty = Math.max(1, Math.floor(quantity));
	return (
		BATCH_DISCOUNT_TIERS.find((tier) => safeQty >= tier.minQty && safeQty <= tier.maxQty) ??
		BATCH_DISCOUNT_TIERS[0]
	);
}
