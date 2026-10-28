<script lang="ts">
	import {
		OPERATIONS,
		OPERATIONS_LIST,
		SETUP_COMPLEXITIES,
		SETUP_COMPLEXITIES_LIST,
		MATERIALS,
		MATERIALS_LIST,
		TOLERANCES,
		TOLERANCES_LIST,
		COOPERATIVE_OPERATIONS,
		COOPERATIVE_OPERATIONS_LIST,
		URGENCIES,
		URGENCIES_LIST,
		MINIMUM_ORDER_VALUE
	} from '#lib/calculator/pricing-config';
	import {
		calculateCncQuote,
		type CalculationResult,
		type CooperativeItemBreakdown
	} from '#lib/calculator/engine';
	import { parseCadFile, type CadDimensions } from '#lib/workers/cad-parser';

	// Component Props
	interface Props {
		initialOperation?: string;
		showTitle?: boolean;
		onQuoteCalculated?: (result: CalculationResult) => void;
	}

	let { initialOperation = 'lathe_turning', showTitle = true, onQuoteCalculated }: Props = $props();

	// Reactive State
	let operationId = $state('lathe_turning');
	$effect(() => {
		if (initialOperation) {
			operationId = initialOperation;
		}
	});

	let batchQuantity = $state(10);
	let complexityId = $state('simple');
	let materialId = $state('steel_45');
	let isCustomerMaterial = $state(false);
	let blankLengthMm = $state(120);
	let blankWidthMm = $state(45);
	let blankHeightMm = $state(45);
	let toleranceId = $state('standard');
	let cooperativeOpIds = $state<string[]>([]);
	let urgencyId = $state('standard');
	let engineeringHours = $state(0);

	// CAD file upload status & metadata
	let isParsingCad = $state(false);
	let cadFileName = $state<string | null>(null);
	let cadParseError = $state<string | null>(null);
	let parsedCadInfo = $state<CadDimensions | null>(null);

	const isLathe = $derived(operationId === 'lathe_turning');

	// Reactive calculation result
	let quote = $derived(
		calculateCncQuote({
			operationId,
			batchQuantity,
			complexityId,
			materialId,
			isCustomerMaterial,
			blankLengthMm,
			blankWidthMm,
			blankHeightMm,
			toleranceId,
			cooperativeOpIds,
			urgencyId,
			engineeringHours
		})
	);

	$effect(() => {
		if (onQuoteCalculated) {
			onQuoteCalculated(quote);
		}
	});

	function toggleCooperativeOp(opId: string) {
		if (cooperativeOpIds.includes(opId)) {
			cooperativeOpIds = cooperativeOpIds.filter((id) => id !== opId);
		} else {
			cooperativeOpIds = [...cooperativeOpIds, opId];
		}
	}

	function applyRecommendedBatch() {
		if (quote.recommendedBatchForMov > batchQuantity) {
			batchQuantity = quote.recommendedBatchForMov;
		}
	}

	function applyCadDimensions(dims: CadDimensions) {
		if (
			isLathe &&
			dims.isRotationalSymmetric &&
			dims.suggestedDiameterMm &&
			dims.suggestedLengthMm
		) {
			blankLengthMm = Math.max(5, Math.round(dims.suggestedLengthMm));
			blankWidthMm = Math.max(5, Math.round(dims.suggestedDiameterMm));
			blankHeightMm = blankWidthMm;
		} else {
			blankLengthMm = Math.max(5, Math.round(dims.lengthMm));
			blankWidthMm = Math.max(5, Math.round(dims.widthMm));
			blankHeightMm = Math.max(5, Math.round(dims.heightMm));
		}
	}

	async function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		isParsingCad = true;
		cadParseError = null;
		cadFileName = file.name;

		try {
			const dims: CadDimensions = await parseCadFile(file);
			parsedCadInfo = dims;
			applyCadDimensions(dims);
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : 'Ошибка при обработке файла';
			cadParseError = msg;
			parsedCadInfo = null;
		} finally {
			isParsingCad = false;
			target.value = '';
		}
	}

	function clearCadModel() {
		cadFileName = null;
		parsedCadInfo = null;
		cadParseError = null;
	}

	function downloadQuoteEstimate() {
		const summary = {
			timestamp: new Date().toISOString(),
			quoteBreakdown: {
				operation: quote.selectedOperationName,
				quantity: quote.totalBatchQuantity,
				material: quote.selectedMaterialName,
				ownMaterial: isCustomerMaterial,
				dimensionsMm: {
					length: blankLengthMm,
					width: blankWidthMm,
					height: blankHeightMm
				},
				tolerance: quote.selectedToleranceName,
				cooperativeOperations: quote.cooperativeBreakdown.map((c: CooperativeItemBreakdown) => ({
					name: c.nameRu,
					cost: c.cost
				})),
				urgency: quote.selectedUrgencyName,
				costs: {
					totalMaterialCost: quote.totalMaterialCost,
					totalMachiningCost: quote.totalMachiningCost,
					totalSetupCost: quote.totalSetupCost,
					totalEngineeringCost: quote.totalEngineeringCost,
					totalCooperativeCost: quote.totalCooperativeCost,
					urgencySurcharge: quote.urgencySurcharge,
					finalTotalRub: quote.finalTotal,
					finalUnitPriceRub: quote.finalUnitPrice
				},
				minimumOrderValueApplied: quote.isMinimumOrderApplied
			}
		};

		const blob = new Blob([JSON.stringify(summary, null, 2)], {
			type: 'application/json'
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `MetalProm39-CNC-Estimate-${Date.now()}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}
</script>

<div class="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 md:p-8">
	{#if showTitle}
		<div class="mb-8 border-b border-zinc-800 pb-6">
			<h2 class="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
				Инженерный калькулятор механической обработки с ЧПУ
			</h2>
			<p class="mt-2 text-sm text-zinc-400 md:text-base">
				Мгновенный расчет себестоимости по нормо-часам и рыночным ценам сырья в Калининградской
				области. Базовый порог заказа для юридических лиц — 5 000 ₽.
			</p>
		</div>
	{/if}

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
		<!-- Left / Configuration Column -->
		<div class="space-y-6 lg:col-span-7">
			<!-- 1. Operation Selection -->
			<div>
				<label
					for="calc-operation"
					class="mb-2 block text-sm font-semibold tracking-wide text-zinc-300"
				>
					1. Вид технологической операции:
				</label>
				<div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
					{#each OPERATIONS_LIST as op}
						<button
							type="button"
							class="flex flex-col rounded-lg border p-3.5 text-left transition-all {operationId ===
							op.id
								? 'border-zinc-300 bg-zinc-800/90 text-white shadow-xs'
								: 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'}"
							onclick={() => {
								operationId = op.id;
								if (parsedCadInfo) {
									applyCadDimensions(parsedCadInfo);
								}
							}}
						>
							<span class="text-sm font-semibold text-zinc-100">{op.shortNameRu}</span>
							<span class="mt-1 font-mono text-xs text-zinc-300"
								>{op.ratePerHour.toLocaleString('ru-RU')} ₽ / нормо-час</span
							>
						</button>
					{/each}
				</div>
			</div>

			<!-- 2. Quantity & Batch Discount -->
			<div>
				<div class="mb-2 flex items-center justify-between">
					<label for="batch-qty-slider" class="text-sm font-semibold text-zinc-300">
						2. Размер партии (шт.):
					</label>
					<div class="flex items-center gap-2">
						{#if quote.batchDiscountPercent > 0}
							<span
								class="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-400"
							>
								Скидка за серию: -{quote.batchDiscountPercent}%
							</span>
						{/if}
						<input
							type="number"
							min="1"
							max="5000"
							bind:value={batchQuantity}
							class="w-20 rounded border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-right font-mono text-sm font-bold text-white focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
						/>
					</div>
				</div>
				<input
					id="batch-qty-slider"
					type="range"
					min="1"
					max="200"
					bind:value={batchQuantity}
					class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-zinc-100"
				/>
				<div class="mt-1 flex justify-between font-mono text-[11px] text-zinc-500">
					<span>1 шт (0%)</span>
					<span>5 шт (-10%)</span>
					<span>20 шт (-20%)</span>
					<span>50 шт (-30%)</span>
					<span>100+ шт (-40%)</span>
				</div>
			</div>

			<!-- 3. Setup Complexity -->
			<div>
				<label for="calc-complexity" class="mb-2 block text-sm font-semibold text-zinc-300">
					3. Сложность наладки и оснастки:
				</label>
				<div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
					{#each SETUP_COMPLEXITIES_LIST as comp}
						<button
							type="button"
							class="rounded-lg border p-3 text-left transition-all {complexityId === comp.id
								? 'border-zinc-300 bg-zinc-800/90 text-white shadow-xs'
								: 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'}"
							onclick={() => (complexityId = comp.id)}
						>
							<div class="text-xs font-semibold text-zinc-200">{comp.nameRu}</div>
							<div class="mt-1 font-mono text-xs text-zinc-300">
								+{comp.fee.toLocaleString('ru-RU')} ₽
							</div>
							<div class="mt-1 line-clamp-2 text-[11px] text-zinc-500">{comp.descriptionRu}</div>
						</button>
					{/each}
				</div>
			</div>

			<!-- 4. Material Selection & Own Material Toggle -->
			<div>
				<div class="mb-2 flex items-center justify-between">
					<label for="material-select" class="text-sm font-semibold text-zinc-300">
						4. Материал заготовки:
					</label>
					<label class="flex cursor-pointer items-center gap-2 text-xs font-medium text-zinc-300">
						<input
							type="checkbox"
							bind:checked={isCustomerMaterial}
							class="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-zinc-100 focus:ring-zinc-400 accent-zinc-100"
						/>
						<span>Материал заказчика (давальческий)</span>
					</label>
				</div>
				<select
					id="material-select"
					bind:value={materialId}
					class="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm font-medium text-zinc-100 focus:border-zinc-400 focus:outline-none"
				>
					{#each MATERIALS_LIST as mat}
						<option value={mat.id}>
							{mat.nameRu} ({mat.gradeRu}) — {mat.pricePerKg} ₽/кг, K={mat.machinabilityK}
						</option>
					{/each}
				</select>
			</div>

			<!-- 5. Blank Dimensions & CAD Upload -->
			<div class="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
				<div class="mb-3 flex flex-wrap items-center justify-between gap-2">
					<span class="text-sm font-semibold text-zinc-300"> 5. Размеры заготовки (мм): </span>
					<!-- CAD Upload button -->
					<label
						class="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800/90 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white"
					>
						<span>{isParsingCad ? 'Анализ CAD...' : 'Загрузить STL / STEP'}</span>
						<input
							type="file"
							accept=".stl,.step,.stp"
							data-testid="cad-file-input"
							class="hidden"
							onchange={handleFileUpload}
							disabled={isParsingCad}
						/>
					</label>
				</div>

				{#if cadParseError}
					<div
						data-testid="cad-error-alert"
						class="mb-3 rounded border border-red-500/30 bg-red-500/10 p-2.5 text-xs text-red-400"
					>
						<span class="font-bold">Ошибка CAD:</span>
						{cadParseError}
					</div>
				{/if}

				{#if parsedCadInfo}
					<div
						data-testid="cad-info-card"
						class="mb-3 rounded-lg border border-zinc-700 bg-zinc-900/90 p-3.5 text-xs"
					>
						<div class="flex items-center justify-between border-b border-zinc-800 pb-2">
							<div class="flex items-center gap-2">
								<span
									class="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] font-bold text-zinc-200"
								>
									{parsedCadInfo.fileType.replace('_', ' ').toUpperCase()}
								</span>
								<span class="truncate font-semibold text-zinc-200">{cadFileName}</span>
							</div>
							<button
								type="button"
								data-testid="cad-clear-btn"
								class="text-zinc-400 hover:text-white"
								onclick={clearCadModel}
								title="Удалить привязку к CAD"
							>
								✕
							</button>
						</div>
						<div class="mt-2 grid grid-cols-2 gap-2 text-zinc-400 sm:grid-cols-3">
							<div>
								Габариты:
								<strong class="block font-mono text-zinc-200">
									{parsedCadInfo.boundingBox.dx.toFixed(1)} × {parsedCadInfo.boundingBox.dy.toFixed(
										1
									)} × {parsedCadInfo.boundingBox.dz.toFixed(1)} мм
								</strong>
							</div>
							<div>
								Объем:
								<strong class="block font-mono text-zinc-200">
									{parsedCadInfo.volumeCm3.toFixed(2)} см³
								</strong>
							</div>
							<div>
								Сетка:
								<strong class="block font-mono text-zinc-200">
									{parsedCadInfo.triangleCount.toLocaleString('ru-RU')} тр.
								</strong>
							</div>
						</div>
						{#if parsedCadInfo.isRotationalSymmetric}
							<div class="mt-2 border-t border-zinc-800/60 pt-2 text-zinc-300">
								<span class="text-zinc-400">Распознано тело вращения: </span>
								<strong class="font-mono text-zinc-100"
									>⌀{parsedCadInfo.suggestedDiameterMm} × L{parsedCadInfo.suggestedLengthMm} мм</strong
								>
							</div>
						{/if}
					</div>
				{/if}

				<div class="grid grid-cols-3 gap-3">
					<div>
						<label for="dim-length" class="block text-[11px] font-medium text-zinc-400">
							Длина L (мм):
						</label>
						<input
							id="dim-length"
							type="number"
							min="5"
							max="3000"
							bind:value={blankLengthMm}
							class="mt-1 w-full rounded border border-zinc-700 bg-zinc-950 px-2.5 py-1.5 font-mono text-sm font-bold text-white focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
						/>
					</div>
					<div>
						<label for="dim-width" class="block text-[11px] font-medium text-zinc-400">
							{isLathe ? 'Диаметр ⌀ (мм):' : 'Ширина W (мм):'}
						</label>
						<input
							id="dim-width"
							type="number"
							min="5"
							max="1000"
							bind:value={blankWidthMm}
							class="mt-1 w-full rounded border border-zinc-700 bg-zinc-950 px-2.5 py-1.5 font-mono text-sm font-bold text-white focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
						/>
					</div>
					<div>
						<label for="dim-height" class="block text-[11px] font-medium text-zinc-400">
							{isLathe ? 'Толщ. стенки / H (мм):' : 'Высота H (мм):'}
						</label>
						<input
							id="dim-height"
							type="number"
							min="5"
							max="1000"
							bind:value={blankHeightMm}
							disabled={isLathe}
							class="mt-1 w-full rounded border border-zinc-700 bg-zinc-950 px-2.5 py-1.5 font-mono text-sm font-bold text-white focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 disabled:opacity-50"
						/>
					</div>
				</div>
				<div class="mt-2.5 flex items-center justify-between text-xs text-zinc-400">
					<span>
						Масса заготовки:
						<strong class="font-mono text-zinc-200">{quote.blankMassKg} кг</strong>/шт
					</span>
					<span>
						Объем:
						<strong class="font-mono text-zinc-200">{quote.blankVolumeCm3} см³</strong>
					</span>
				</div>
			</div>

			<!-- 6. Tolerance & Grinding -->
			<div>
				<label for="tolerance-select" class="mb-2 block text-sm font-semibold text-zinc-300">
					6. Квалитет точности и шероховатость поверхности:
				</label>
				<div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
					{#each TOLERANCES_LIST as tol}
						<button
							type="button"
							class="rounded-lg border p-3 text-left transition-all {toleranceId === tol.id
								? 'border-zinc-300 bg-zinc-800/90 text-white shadow-xs'
								: 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'}"
							onclick={() => (toleranceId = tol.id)}
						>
							<div class="text-xs font-semibold text-zinc-200">{tol.nameRu}</div>
							<div class="mt-1 font-mono text-xs text-zinc-300">{tol.roughnessRa}</div>
							{#if tol.includesGrinding}
								<div
									class="mt-1 inline-block rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-zinc-200"
								>
									+Шлифовка
								</div>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<!-- 7. Cooperative Operations -->
			<div>
				<span class="mb-2 block text-sm font-semibold text-zinc-300">
					7. Дополнительные кооперационные операции:
				</span>
				<div class="space-y-2">
					{#each COOPERATIVE_OPERATIONS_LIST as coop}
						<label
							class="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 transition-colors hover:border-zinc-700"
						>
							<input
								type="checkbox"
								checked={cooperativeOpIds.includes(coop.id)}
								onchange={() => toggleCooperativeOp(coop.id)}
								class="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-950 text-zinc-100 focus:ring-zinc-400 accent-zinc-100"
							/>
							<div class="flex-1">
								<div class="flex items-center justify-between">
									<span class="text-xs font-semibold text-zinc-200">{coop.nameRu}</span>
									<span class="font-mono text-xs text-zinc-300">+{coop.pricePerPiece} ₽/шт</span>
								</div>
								<p class="mt-0.5 text-[11px] text-zinc-500">{coop.descriptionRu}</p>
							</div>
						</label>
					{/each}
				</div>
			</div>

			<!-- 8. Urgency -->
			<div>
				<label for="urgency-select" class="mb-2 block text-sm font-semibold text-zinc-300">
					8. Срочность выполнения:
				</label>
				<div class="grid grid-cols-2 gap-3">
					{#each URGENCIES_LIST as urg}
						<button
							type="button"
							class="rounded-lg border p-3 text-left transition-all {urgencyId === urg.id
								? 'border-zinc-300 bg-zinc-800/90 text-white shadow-xs'
								: 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'}"
							onclick={() => (urgencyId = urg.id)}
						>
							<div class="text-xs font-semibold text-zinc-200">{urg.nameRu}</div>
							<div class="mt-1 font-mono text-xs text-zinc-300">{urg.leadTimeRu}</div>
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Right / Live Quotation Summary Panel -->
		<div class="lg:col-span-5">
			<div class="sticky top-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
				<div class="flex items-center justify-between border-b border-zinc-800 pb-4">
					<span class="text-xs font-semibold text-zinc-300">
						Итоговая оценка партии
					</span>
					<span
						class="rounded border border-zinc-700 bg-zinc-800/80 px-2.5 py-0.5 font-mono text-xs font-semibold text-zinc-300"
					>
						Ориентировочная смета
					</span>
				</div>

				<!-- Total Price Big Display -->
				<div class="my-5">
					<div class="flex items-baseline justify-between">
						<span class="text-xs font-medium text-zinc-400">Общая сумма:</span>
						<div class="font-mono text-3xl font-extrabold tracking-tight text-white md:text-4xl">
							{quote.finalTotal.toLocaleString('ru-RU')}
							<span class="text-2xl font-normal text-zinc-400">₽</span>
						</div>
					</div>
					<div class="mt-1 flex items-baseline justify-between text-sm">
						<span class="text-zinc-400">Цена за деталь:</span>
						<span class="font-mono font-bold text-zinc-100">
							{quote.finalUnitPrice.toLocaleString('ru-RU')} ₽ / шт
						</span>
					</div>
				</div>

				<!-- Minimum Order Value Alert -->
				{#if quote.isMinimumOrderApplied}
					<div
						data-testid="mov-alert"
						class="mb-5 rounded-lg border border-zinc-700 bg-zinc-900/90 p-3.5 text-xs text-zinc-300"
					>
						<div class="flex items-center font-semibold text-zinc-100">
							<span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
							Минимальный заказ для юрлиц — 5 000 ₽
						</div>
						<p class="mt-1 text-zinc-400">
							Включает переналадку станка ЧПУ, написание управляющей программы и инструментальный
							контроль ОТК.
						</p>
						{#if quote.recommendedBatchForMov > quote.totalBatchQuantity}
							<div class="mt-2.5 rounded-md border border-zinc-800 bg-zinc-950 p-2.5 text-zinc-300">
								<span>Рекомендуем увеличить партию до </span>
								<strong class="font-mono text-white">{quote.recommendedBatchForMov} шт.</strong>,
								<span> чтобы снизить себестоимость до </span>
								<strong class="font-mono text-emerald-400"
									>{quote.recommendedBatchUnitCost.toLocaleString('ru-RU')} ₽/шт</strong
								>.
								<button
									type="button"
									class="mt-2 block w-full rounded-md border border-zinc-700 bg-zinc-900/80 px-3 py-1.5 text-center text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-800"
									onclick={applyRecommendedBatch}
								>
									Пересчитать на {quote.recommendedBatchForMov} шт.
								</button>
							</div>
						{/if}
					</div>
				{/if}

				<!-- Cost Components Breakdown -->
				<div class="space-y-2.5 border-t border-zinc-800 pt-4 text-xs">
					<div class="flex justify-between text-zinc-400">
						<span>Металл / Заготовка:</span>
						<span class="font-mono text-zinc-200">
							{isCustomerMaterial
								? 'Давальческий (0 ₽)'
								: `${quote.totalMaterialCost.toLocaleString('ru-RU')} ₽`}
						</span>
					</div>
					<div class="flex justify-between text-zinc-400">
						<span>Механообработка ЧПУ:</span>
						<span class="font-mono text-zinc-200">
							{quote.totalMachiningCost.toLocaleString('ru-RU')} ₽
							{#if quote.batchDiscountPercent > 0}
								<span class="text-emerald-400">(-{quote.batchDiscountPercent}%)</span>
							{/if}
						</span>
					</div>
					<div class="flex justify-between text-zinc-400">
						<span>Наладка, оснастка и УП:</span>
						<span class="font-mono text-zinc-200">
							{(quote.totalSetupCost + quote.totalEngineeringCost).toLocaleString('ru-RU')} ₽
						</span>
					</div>
					{#if quote.totalCooperativeCost > 0}
						<div class="flex justify-between text-zinc-400">
							<span>Кооперация (термо/зуб/покрытие):</span>
							<span class="font-mono text-zinc-200"
								>{quote.totalCooperativeCost.toLocaleString('ru-RU')} ₽</span
							>
						</div>
					{/if}
					{#if quote.urgencySurcharge > 0}
						<div class="flex justify-between text-zinc-400">
							<span>Надбавка за срочность (48-72ч):</span>
							<span class="font-mono text-zinc-300"
								>+{quote.urgencySurcharge.toLocaleString('ru-RU')} ₽</span
							>
						</div>
					{/if}
				</div>

				<!-- Action Buttons -->
				<div class="mt-6 space-y-2.5">
					<a
						href="#order-form"
						class="flex w-full items-center justify-center rounded-md bg-zinc-100 px-4 py-2.5 text-center text-sm font-medium text-zinc-950 shadow-sm transition-colors hover:bg-white"
					>
						<span>Отправить чертеж на точный расчет</span>
					</a>
					<button
						type="button"
						class="flex w-full items-center justify-center rounded-md border border-zinc-700 bg-zinc-900/60 px-4 py-2.5 text-center text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-800"
						onclick={downloadQuoteEstimate}
					>
						<span>Скачать смету (JSON)</span>
					</button>
				</div>

				<!-- B2B Trust Guarantee Callout -->
				<div
					class="mt-5 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-[11px] text-zinc-400"
				>
					<div class="font-semibold text-zinc-300">Гарантии цеха MetalProm39:</div>
					<ul class="mt-1 list-inside list-disc space-y-1 text-zinc-400">
						<li>Безналичный расчет с НДС 20% / УСН</li>
						<li>Паспорт качества ОТК (поверка Mitutoyo)</li>
						<li>Сертификаты на металлопрокат по ГОСТ</li>
						<li>Бесплатный DFM-аудит 3D-моделей</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
