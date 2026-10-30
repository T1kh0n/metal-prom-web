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

	let blankLengthMm = $state(100);
	let blankWidthMm = $state(50);
	let blankHeightMm = $state(50);

	let toleranceId = $state('it8_it9_normal');
	let cooperativeOpIds = $state<string[]>([]);
	let urgencyId = $state('standard');
	let engineeringHours = $state(0);

	// CAD upload state
	let isParsingCad = $state(false);
	let cadParseError = $state<string | null>(null);
	let parsedCadInfo = $state<CadDimensions | null>(null);
	let cadFileName = $state<string | null>(null);

	// Convenience derived flags
	let isLathe = $derived(operationId === 'lathe_turning');

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

		cadParseError = null;
		parsedCadInfo = null;
		cadFileName = file.name;
		isParsingCad = true;

		try {
			const dims = await parseCadFile(file);
			parsedCadInfo = dims;
			applyCadDimensions(dims);
		} catch (err) {
			cadParseError =
				err instanceof Error
					? err.message
					: 'Не удалось проанализировать CAD-файл. Проверьте геометрию 3D-модели.';
		} finally {
			isParsingCad = false;
			// Reset file input value to allow uploading the same file again
			target.value = '';
		}
	}

	function clearCadModel() {
		parsedCadInfo = null;
		cadFileName = null;
		cadParseError = null;
	}

	function downloadQuoteEstimate() {
		const estimateData = {
			documentType: 'MetalProm39 CNC Commercial Estimate',
			createdAt: new Date().toISOString(),
			quoteParameters: {
				operation: OPERATIONS[operationId]?.nameRu,
				ratePerHour: OPERATIONS[operationId]?.ratePerHour,
				batchQuantity,
				complexity: SETUP_COMPLEXITIES[complexityId]?.nameRu,
				material: MATERIALS[materialId]?.nameRu,
				isCustomerMaterial,
				dimensionsMm: {
					length: blankLengthMm,
					width: blankWidthMm,
					height: blankHeightMm
				},
				tolerance: TOLERANCES[toleranceId]?.nameRu,
				roughnessRa: TOLERANCES[toleranceId]?.roughnessRa,
				cooperativeOperations: cooperativeOpIds.map((id) => COOPERATIVE_OPERATIONS[id]?.nameRu),
				urgency: URGENCIES[urgencyId]?.nameRu
			},
			calculatedCost: {
				totalMaterialCostRub: quote.totalMaterialCost,
				totalMachiningCostRub: quote.totalMachiningCost,
				totalSetupCostRub: quote.totalSetupCost,
				totalCooperativeCostRub: quote.totalCooperativeCost,
				urgencySurchargeRub: quote.urgencySurcharge,
				batchDiscountPercent: quote.batchDiscountPercent,
				isMinimumOrderApplied: quote.isMinimumOrderApplied,
				finalTotalRub: quote.finalTotal,
				finalUnitPriceRub: quote.finalUnitPrice
			},
			plantNotice: {
				validityDays: 14,
				vatIncludedPercent: 20,
				terms: 'Безналичный расчет с НДС 20% по договору поставки'
			}
		};

		const blob = new Blob([JSON.stringify(estimateData, null, 2)], {
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

<div
	class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper)] p-6 text-[var(--color-ink)] md:p-8"
>
	{#if showTitle}
		<div class="mb-8 border-b border-[var(--color-rule)] pb-6">
			<h2 class="text-2xl text-[var(--color-ink)] md:text-3xl">
				Инженерный калькулятор механической обработки с ЧПУ
			</h2>
			<p class="lead mt-2 text-sm md:text-base">
				Мгновенный расчет себестоимости по нормо-часам и рыночным ценам сырья в Калининградской
				области. Базовый порог заказа для юридических лиц — 5&thinsp;000&thinsp;₽.
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
					class="mb-2 block text-xs font-normal tracking-wide text-[var(--color-muted)]"
				>
					1. Вид технологической операции:
				</label>
				<div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
					{#each OPERATIONS_LIST as op}
						<button
							type="button"
							class="flex flex-col rounded-[var(--radius-card)] border p-3.5 text-left transition-all {operationId ===
							op.id
								? 'border-[var(--color-accent)] bg-[var(--color-paper-2)] text-[var(--color-ink)]'
								: 'border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink-2)] hover:border-[var(--color-rule-2)]'}"
							onclick={() => {
								operationId = op.id;
								if (parsedCadInfo) {
									applyCadDimensions(parsedCadInfo);
								}
							}}
						>
							<span class="text-xs font-normal text-[var(--color-ink)]">{op.shortNameRu}</span>
							<span class="num mt-1 text-xs text-[var(--color-muted)]">
								{op.ratePerHour.toLocaleString('ru-RU')}<span class="u">
									&thinsp;₽&thinsp;/&thinsp;нормо-час</span
								>
							</span>
						</button>
					{/each}
				</div>
			</div>

			<!-- 2. Quantity & Batch Discount -->
			<div>
				<div class="mb-2 flex items-center justify-between">
					<label for="batch-qty-slider" class="text-xs font-normal text-[var(--color-muted)]">
						2. Размер партии (шт.):
					</label>
					<div class="flex items-center gap-2">
						{#if quote.batchDiscountPercent > 0}
							<span class="num text-xs text-[var(--color-accent)]">
								Скидка за серию: -{quote.batchDiscountPercent}%
							</span>
						{/if}
						<input
							type="number"
							min="1"
							max="5000"
							bind:value={batchQuantity}
							class="num w-20 rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-2.5 py-1 text-right text-sm text-[var(--color-ink)] focus:border-[var(--color-focus)] focus:outline-none"
						/>
					</div>
				</div>
				<input
					id="batch-qty-slider"
					type="range"
					min="1"
					max="200"
					bind:value={batchQuantity}
					class="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[var(--color-paper-2)] accent-[var(--color-accent)]"
				/>
				<div class="mt-1 flex justify-between text-[11px] text-[var(--color-muted)]">
					<span class="num">1<span class="u">&thinsp;шт</span> (0%)</span>
					<span class="num">5<span class="u">&thinsp;шт</span> (-10%)</span>
					<span class="num">20<span class="u">&thinsp;шт</span> (-20%)</span>
					<span class="num">50<span class="u">&thinsp;шт</span> (-30%)</span>
					<span class="num">100+<span class="u">&thinsp;шт</span> (-40%)</span>
				</div>
			</div>

			<!-- 3. Setup Complexity -->
			<div>
				<label
					for="calc-complexity"
					class="mb-2 block text-xs font-normal text-[var(--color-muted)]"
				>
					3. Сложность наладки и оснастки:
				</label>
				<div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
					{#each SETUP_COMPLEXITIES_LIST as comp}
						<button
							type="button"
							class="rounded-[var(--radius-card)] border p-3 text-left transition-all {complexityId ===
							comp.id
								? 'border-[var(--color-accent)] bg-[var(--color-paper-2)] text-[var(--color-ink)]'
								: 'border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink-2)] hover:border-[var(--color-rule-2)]'}"
							onclick={() => (complexityId = comp.id)}
						>
							<div class="text-xs font-normal text-[var(--color-ink)]">{comp.nameRu}</div>
							<div class="num mt-1 text-xs text-[var(--color-muted)]">
								+{comp.fee.toLocaleString('ru-RU')}<span class="u">&thinsp;₽</span>
							</div>
							<div class="mt-1 line-clamp-2 text-[11px] text-[var(--color-muted)]">
								{comp.descriptionRu}
							</div>
						</button>
					{/each}
				</div>
			</div>

			<!-- 4. Material Selection & Own Material Toggle -->
			<div>
				<div class="mb-2 flex items-center justify-between">
					<label for="material-select" class="text-xs font-normal text-[var(--color-muted)]">
						4. Материал заготовки:
					</label>
					<label
						class="flex cursor-pointer items-center gap-2 text-xs font-normal text-[var(--color-ink-2)]"
					>
						<input
							type="checkbox"
							bind:checked={isCustomerMaterial}
							class="h-4 w-4 rounded-sm border-[var(--color-rule-2)] bg-[var(--color-paper-2)] accent-[var(--color-accent)]"
						/>
						<span>Материал заказчика (давальческий)</span>
					</label>
				</div>
				<select
					id="material-select"
					bind:value={materialId}
					class="w-full rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-3.5 py-2.5 text-xs text-[var(--color-ink)] focus:border-[var(--color-focus)] focus:outline-none"
				>
					{#each MATERIALS_LIST as mat}
						<option value={mat.id} class="bg-[var(--color-paper)] text-[var(--color-ink)]">
							{mat.nameRu} ({mat.gradeRu}) — {mat.pricePerKg} ₽/кг, K={mat.machinabilityK}
						</option>
					{/each}
				</select>
			</div>

			<!-- 5. Blank Dimensions & CAD Upload -->
			<div
				class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4"
			>
				<div class="mb-3 flex flex-wrap items-center justify-between gap-2">
					<span class="text-xs font-normal text-[var(--color-muted)]">
						5. Размеры заготовки (мм):
					</span>
					<!-- CAD Upload button -->
					<label
						class="btn btn--sm btn--line inline-flex cursor-pointer items-center gap-1.5 text-xs"
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
						class="mb-3 rounded-[var(--radius-card)] border border-[var(--color-error)]/40 bg-[var(--color-error)]/10 p-2.5 text-xs text-[var(--color-error)]"
					>
						<span class="font-normal">Ошибка CAD:</span>
						{cadParseError}
					</div>
				{/if}

				{#if parsedCadInfo}
					<div
						data-testid="cad-info-card"
						class="mb-3 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper)] p-3.5 text-xs"
					>
						<div class="flex items-center justify-between border-b border-[var(--color-rule)] pb-2">
							<div class="flex items-center gap-2">
								<span
									class="rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-ink)]"
								>
									{parsedCadInfo.fileType.replace('_', ' ').toUpperCase()}
								</span>
								<span class="truncate text-xs font-normal text-[var(--color-ink)]"
									>{cadFileName}</span
								>
							</div>
							<button
								type="button"
								data-testid="cad-clear-btn"
								class="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
								onclick={clearCadModel}
								title="Удалить привязку к CAD"
							>
								✕
							</button>
						</div>
						<div class="mt-2 grid grid-cols-2 gap-2 text-[var(--color-muted)] sm:grid-cols-3">
							<div>
								Габариты:
								<strong class="num block font-normal text-[var(--color-ink)]">
									{parsedCadInfo.boundingBox.dx.toFixed(1)} × {parsedCadInfo.boundingBox.dy.toFixed(
										1
									)} × {parsedCadInfo.boundingBox.dz.toFixed(1)}<span class="u">&thinsp;мм</span>
								</strong>
							</div>
							<div>
								Объем:
								<strong class="num block font-normal text-[var(--color-ink)]">
									{parsedCadInfo.volumeCm3.toFixed(2)}<span class="u">&thinsp;см³</span>
								</strong>
							</div>
							<div>
								Сетка:
								<strong class="num block font-normal text-[var(--color-ink)]">
									{parsedCadInfo.triangleCount.toLocaleString('ru-RU')}<span class="u"
										>&thinsp;тр.</span
									>
								</strong>
							</div>
						</div>
						{#if parsedCadInfo.isRotationalSymmetric}
							<div class="mt-2 border-t border-[var(--color-rule)] pt-2 text-[var(--color-muted)]">
								<span>Распознано тело вращения: </span>
								<strong class="num font-normal text-[var(--color-ink)]">
									⌀{parsedCadInfo.suggestedDiameterMm} × L{parsedCadInfo.suggestedLengthMm}<span
										class="u">&thinsp;мм</span
									>
								</strong>
							</div>
						{/if}
					</div>
				{/if}

				<div class="grid grid-cols-3 gap-3">
					<div>
						<label for="dim-length" class="block text-[11px] text-[var(--color-muted)]">
							Длина L (мм):
						</label>
						<input
							id="dim-length"
							type="number"
							min="5"
							max="3000"
							bind:value={blankLengthMm}
							class="num mt-1 w-full rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-2.5 py-1.5 text-xs text-[var(--color-ink)] focus:border-[var(--color-focus)] focus:outline-none"
						/>
					</div>
					<div>
						<label for="dim-width" class="block text-[11px] text-[var(--color-muted)]">
							{isLathe ? 'Диаметр ⌀ (мм):' : 'Ширина W (мм):'}
						</label>
						<input
							id="dim-width"
							type="number"
							min="5"
							max="1000"
							bind:value={blankWidthMm}
							class="num mt-1 w-full rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-2.5 py-1.5 text-xs text-[var(--color-ink)] focus:border-[var(--color-focus)] focus:outline-none"
						/>
					</div>
					<div>
						<label for="dim-height" class="block text-[11px] text-[var(--color-muted)]">
							{isLathe ? 'Толщ. стенки / H (мм):' : 'Высота H (мм):'}
						</label>
						<input
							id="dim-height"
							type="number"
							min="5"
							max="1000"
							bind:value={blankHeightMm}
							disabled={isLathe}
							class="num mt-1 w-full rounded-[var(--radius-card)] border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-2.5 py-1.5 text-xs text-[var(--color-ink)] focus:border-[var(--color-focus)] focus:outline-none disabled:opacity-40"
						/>
					</div>
				</div>

				<div class="mt-2.5 flex items-center justify-between text-xs text-[var(--color-muted)]">
					<span>
						Масса заготовки:
						<strong class="num font-normal text-[var(--color-ink)]"
							>{quote.blankMassKg}<span class="u">&thinsp;кг</span></strong
						>/шт
					</span>
					<span>
						Объем:
						<strong class="num font-normal text-[var(--color-ink)]"
							>{quote.blankVolumeCm3}<span class="u">&thinsp;см³</span></strong
						>
					</span>
				</div>
			</div>

			<!-- 6. Tolerance & Grinding -->
			<div>
				<label
					for="tolerance-select"
					class="mb-2 block text-xs font-normal text-[var(--color-muted)]"
				>
					6. Квалитет точности и шероховатость поверхности:
				</label>
				<div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
					{#each TOLERANCES_LIST as tol}
						<button
							type="button"
							class="rounded-[var(--radius-card)] border p-3 text-left transition-all {toleranceId ===
							tol.id
								? 'border-[var(--color-accent)] bg-[var(--color-paper-2)] text-[var(--color-ink)]'
								: 'border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink-2)] hover:border-[var(--color-rule-2)]'}"
							onclick={() => (toleranceId = tol.id)}
						>
							<div class="text-xs font-normal text-[var(--color-ink)]">{tol.nameRu}</div>
							<div class="num mt-1 text-xs text-[var(--color-muted)]">{tol.roughnessRa}</div>
							{#if tol.includesGrinding}
								<div
									class="mt-1 inline-block rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-1.5 py-0.5 text-[10px] text-[var(--color-ink)]"
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
				<span class="mb-2 block text-xs font-normal text-[var(--color-muted)]">
					7. Дополнительные кооперационные операции:
				</span>
				<div class="space-y-2">
					{#each COOPERATIVE_OPERATIONS_LIST as coop}
						<label
							class="flex cursor-pointer items-start gap-3 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-3 transition-colors hover:border-[var(--color-rule-2)]"
						>
							<input
								type="checkbox"
								checked={cooperativeOpIds.includes(coop.id)}
								onchange={() => toggleCooperativeOp(coop.id)}
								class="mt-0.5 h-4 w-4 rounded-sm border-[var(--color-rule-2)] bg-[var(--color-paper)] accent-[var(--color-accent)]"
							/>
							<div class="flex-1">
								<div class="flex items-center justify-between">
									<span class="text-xs font-normal text-[var(--color-ink)]">{coop.nameRu}</span>
									<span class="num text-xs text-[var(--color-muted)]"
										>+{coop.pricePerPiece}<span class="u">&thinsp;₽/шт</span></span
									>
								</div>
								<p class="mt-0.5 text-[11px] text-[var(--color-muted)]">{coop.descriptionRu}</p>
							</div>
						</label>
					{/each}
				</div>
			</div>

			<!-- 8. Urgency -->
			<div>
				<label
					for="urgency-select"
					class="mb-2 block text-xs font-normal text-[var(--color-muted)]"
				>
					8. Срочность выполнения:
				</label>
				<div class="grid grid-cols-2 gap-3">
					{#each URGENCIES_LIST as urg}
						<button
							type="button"
							class="rounded-[var(--radius-card)] border p-3 text-left transition-all {urgencyId ===
							urg.id
								? 'border-[var(--color-accent)] bg-[var(--color-paper-2)] text-[var(--color-ink)]'
								: 'border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink-2)] hover:border-[var(--color-rule-2)]'}"
							onclick={() => (urgencyId = urg.id)}
						>
							<div class="text-xs font-normal text-[var(--color-ink)]">{urg.nameRu}</div>
							<div class="mt-1 text-xs text-[var(--color-muted)]">{urg.leadTimeRu}</div>
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Right / Live Quotation Summary Panel -->
		<div class="lg:col-span-5">
			<div
				class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 lg:sticky lg:top-24"
			>
				<div class="flex items-center justify-between border-b border-[var(--color-rule)] pb-4">
					<span class="text-xs font-normal text-[var(--color-muted)]">
						Итоговая оценка партии
					</span>
					<span
						class="rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-2.5 py-0.5 text-xs text-[var(--color-muted)]"
					>
						Ориентировочная смета
					</span>
				</div>

				<!-- Total Price Big Display -->
				<div class="my-5">
					<div class="flex items-baseline justify-between">
						<span class="text-xs text-[var(--color-muted)]">Общая сумма:</span>
						<div class="num text-3xl font-light tracking-tight text-[var(--color-ink)] md:text-4xl">
							{quote.finalTotal.toLocaleString('ru-RU')}<span class="u">&thinsp;₽</span>
						</div>
					</div>
					<div class="mt-1 flex items-baseline justify-between text-xs">
						<span class="text-[var(--color-muted)]">Цена за деталь:</span>
						<span class="num text-sm font-normal text-[var(--color-ink)]">
							{quote.finalUnitPrice.toLocaleString('ru-RU')}<span class="u">&thinsp;₽ / шт</span>
						</span>
					</div>
				</div>

				<!-- Minimum Order Value Alert -->
				{#if quote.isMinimumOrderApplied}
					<div
						data-testid="mov-alert"
						class="mb-5 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper)] p-3.5 text-xs text-[var(--color-ink-2)]"
					>
						<div class="flex items-center gap-2 font-normal text-[var(--color-ink)]">
							<span class="live-dot"></span>
							<span>Минимальный заказ для юрлиц — 5&thinsp;000&thinsp;₽</span>
						</div>
						<p class="mt-1 text-[var(--color-muted)]">
							Включает переналадку станка ЧПУ, написание управляющей программы и инструментальный
							контроль ОТК.
						</p>
						{#if quote.recommendedBatchForMov > quote.totalBatchQuantity}
							<div
								class="mt-2.5 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-2.5 text-[var(--color-muted)]"
							>
								<span>Рекомендуем увеличить партию до </span>
								<strong class="num font-normal text-[var(--color-ink)]"
									>{quote.recommendedBatchForMov}<span class="u">&thinsp;шт.</span></strong
								>,
								<span> чтобы снизить себестоимость до </span>
								<strong class="num font-normal text-[var(--color-accent)]">
									{quote.recommendedBatchUnitCost.toLocaleString('ru-RU')}<span class="u"
										>&thinsp;₽/шт</span
									>
								</strong>.
								<button
									type="button"
									class="btn btn--sm btn--line mt-2 block w-full text-center text-xs"
									onclick={applyRecommendedBatch}
								>
									Пересчитать на {quote.recommendedBatchForMov} шт.
								</button>
							</div>
						{/if}
					</div>
				{/if}

				<!-- Cost Components Breakdown -->
				<div class="space-y-2 border-t border-[var(--color-rule)] pt-4 text-xs">
					<div class="flex justify-between text-[var(--color-muted)]">
						<span>Металл / Заготовка:</span>
						<span class="num text-[var(--color-ink)]">
							{isCustomerMaterial
								? 'Давальческий (0 ₽)'
								: `${quote.totalMaterialCost.toLocaleString('ru-RU')} ₽`}
						</span>
					</div>
					<div class="flex justify-between text-[var(--color-muted)]">
						<span>Механообработка ЧПУ:</span>
						<span class="num text-[var(--color-ink)]">
							{quote.totalMachiningCost.toLocaleString('ru-RU')} ₽
							{#if quote.batchDiscountPercent > 0}
								<span class="text-[var(--color-accent)]">(-{quote.batchDiscountPercent}%)</span>
							{/if}
						</span>
					</div>
					<div class="flex justify-between text-[var(--color-muted)]">
						<span>Наладка, оснастка и УП:</span>
						<span class="num text-[var(--color-ink)]">
							{(quote.totalSetupCost + quote.totalEngineeringCost).toLocaleString('ru-RU')} ₽
						</span>
					</div>
					{#if quote.totalCooperativeCost > 0}
						<div class="flex justify-between text-[var(--color-muted)]">
							<span>Кооперация (термо/зуб/покрытие):</span>
							<span class="num text-[var(--color-ink)]">
								{quote.totalCooperativeCost.toLocaleString('ru-RU')} ₽
							</span>
						</div>
					{/if}
					{#if quote.urgencySurcharge > 0}
						<div class="flex justify-between text-[var(--color-muted)]">
							<span>Надбавка за срочность (48-72ч):</span>
							<span class="num text-[var(--color-ink)]">
								+{quote.urgencySurcharge.toLocaleString('ru-RU')} ₽
							</span>
						</div>
					{/if}
				</div>

				<!-- Action Buttons -->
				<div class="mt-6 space-y-2">
					<a href="#order-form" class="btn btn--wide">
						<span>Отправить чертеж на расчет</span>
					</a>
					<button type="button" class="btn btn--wide btn--line" onclick={downloadQuoteEstimate}>
						<span>Скачать смету (JSON)</span>
					</button>
				</div>

				<!-- B2B Trust Guarantee Callout -->
				<div
					class="mt-5 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper)] p-3 text-[11px] text-[var(--color-muted)]"
				>
					<div class="font-normal text-[var(--color-ink)]">Гарантии цеха MetalProm39:</div>
					<ul class="mt-1 list-inside list-disc space-y-1 text-[var(--color-muted)]">
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
