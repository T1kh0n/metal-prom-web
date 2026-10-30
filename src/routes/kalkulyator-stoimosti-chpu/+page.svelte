<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import CostCalculator from '#lib/components/CostCalculator.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [{ name: 'Калькулятор стоимости ЧПУ', path: '/kalkulyator-stoimosti-chpu/' }];
</script>

<svelte:head>
	<title>Инженерный калькулятор стоимости ЧПУ онлайн | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Мгновенный расчет себестоимости токарной и фрезерной ЧПУ обработки в Калининграде. Загрузка 3D-моделей STL/STEP, выбор сталей и цветмета, расчет партий от 5 шт. НДС 20%."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<header class="mb-10 border-b border-[var(--color-rule)] pb-8">
			<h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">
				Инженерный калькулятор стоимости ЧПУ
			</h1>
			<p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
				Расчет себестоимости токарных и фрезерных деталей по нормо-часам. Загружайте 3D-модели STL и
				STEP для мгновенной оценки стоимости партии.
			</p>
		</header>

		<!-- Interactive Cost Calculator -->
		<section aria-label="Интерактивный расчет ЧПУ">
			<CostCalculator showTitle={false} />
		</section>

		<!-- Methodological Explanation & Pricing Benchmarks -->
		<section
			class="mt-16 border-t border-[var(--color-rule)] pt-12"
			aria-labelledby="methodology-heading"
		>
			<h2 id="methodology-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">
				Методика ценообразования и экономика производства
			</h2>
			<div
				class="mt-6 grid grid-cols-1 gap-8 text-xs leading-relaxed text-[var(--color-muted)] lg:grid-cols-2"
			>
				<div class="space-y-4">
					<h3 class="text-sm font-normal text-[var(--color-ink)]">
						1. Базовые ставки нормо-часа оборудования
					</h3>
					<p class="max-w-2xl">
						В отличие от случайных расценок, наш цех использует прозрачную систему нормо-часов,
						откалиброванную по региональному рынку Калининградской области:
					</p>
					<ul class="space-y-2 border-t border-[var(--color-rule)] pt-3 text-[var(--color-ink-2)]">
						<li class="flex justify-between">
							<span>Токарная ЧПУ обработка:</span>
							<strong class="num font-normal text-[var(--color-ink)]"
								>2&thinsp;500<span class="u">&thinsp;₽/ч</span></strong
							>
						</li>
						<li class="flex justify-between">
							<span>Фрезерная 3-осевая ЧПУ обработка:</span>
							<strong class="num font-normal text-[var(--color-ink)]"
								>3&thinsp;000<span class="u">&thinsp;₽/ч</span></strong
							>
						</li>
						<li class="flex justify-between">
							<span>Фрезерная 4-осевая и 3D обработка:</span>
							<strong class="num font-normal text-[var(--color-ink)]"
								>3&thinsp;500<span class="u">&thinsp;₽/ч</span></strong
							>
						</li>
						<li class="flex justify-between">
							<span>Инженерная подготовка и CAM-программирование:</span>
							<strong class="num font-normal text-[var(--color-ink)]"
								>2&thinsp;000<span class="u">&thinsp;₽/ч</span></strong
							>
						</li>
					</ul>
					<p class="text-[11px] text-[var(--color-muted)]">
						Все ставки включают работу оператора станка 5–6 разряда, амортизацию оборудования, СОЖ
						Blaser и стандартный инструмент.
					</p>
				</div>

				<div class="space-y-4">
					<h3 class="text-sm font-normal text-[var(--color-ink)]">
						2. Порог минимального заказа (5 000 ₽) и скидки
					</h3>
					<p class="max-w-2xl">
						Базовый порог заказа для юридических лиц зафиксирован на уровне
						<span class="num font-normal text-[var(--color-ink)]"
							>5&thinsp;000<span class="u">&thinsp;₽</span></span
						>. Это обусловлено издержками на запуск даже одной детали:
					</p>
					<ul class="list-inside list-disc space-y-1.5 text-[var(--color-ink-2)]">
						<li>Разработка управляющей программы (УП) в CAM-системе;</li>
						<li>Установка и выкатка технологической оснастки;</li>
						<li>Привязка инструмента с помощью оптических щупов;</li>
						<li>Контроль первой детали (First Article Inspection) в лаборатории ОТК.</li>
					</ul>
					<p class="text-[11px] text-[var(--color-muted)]">
						При увеличении размера партии постоянные затраты на наладку распределяются на все
						изделия: скидки от 10% (от 5 шт.) до 40% (от 100 шт.).
					</p>
				</div>
			</div>
		</section>

		<!-- Raw Material Options Section -->
		<section class="well mt-12">
			<h2 class="text-sm font-normal text-[var(--color-ink)]">
				Сырьевые материалы: цеховой склад и давальческий металл
			</h2>
			<p class="mt-2 max-w-3xl text-xs leading-relaxed text-[var(--color-muted)]">
				Мы поддерживаем оперативный складской запас сертифицированного сортового проката (Ст45, 40Х,
				Д16Т, 12Х18Н10Т, БрАЖ9-4, Капролон). Если ваше предприятие располагает собственным металлом,
				выберите опцию «Материал заказчика (давальческий)» — стоимость металла исключается из сметы.
			</p>
		</section>

		<!-- Order Form Anchor Target -->
		<section
			id="order-form"
			class="mt-12 border-t border-[var(--color-rule)] pt-12 pb-6 text-center"
		>
			<h2 class="text-lg text-[var(--color-ink)] sm:text-xl">
				Отправка чертежей и согласование спецификации
			</h2>
			<p class="lead mx-auto mt-2 max-w-2xl text-xs sm:text-sm">
				Для точного технологического согласования направьте чертежи и 3D-модели на нашу инженерную
				почту:
			</p>
			<div class="mt-6 flex flex-wrap items-center justify-center gap-3">
				<a href="mailto:{siteConfig.contactEmail}" class="btn btn--sm btn--line">
					{siteConfig.contactEmail}
				</a>
				<a href="tel:{siteConfig.contactPhone}" class="btn btn--sm btn--line num">
					{siteConfig.contactPhone}
				</a>
			</div>
		</section>
	</div>
</main>
