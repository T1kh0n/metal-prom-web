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

		<header class="mb-10 max-w-4xl">
			<div
				class="inline-flex items-center rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-1 font-mono text-xs font-medium text-zinc-300"
			>
				<span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
				Интерактивная смета
			</div>
			<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
				Инженерный онлайн-калькулятор стоимости механической обработки с ЧПУ в Калининграде
			</h1>
			<p class="mt-4 text-base leading-relaxed text-zinc-300">
				Мгновенный детерминированный расчет себестоимости изготовления деталей по нормо-часам и
				рыночным ценам металлопроката в Калининградской области. Загружайте 3D-модели (STL / STEP)
				для автоматического определения габаритов и объема заготовки.
			</p>
		</header>

		<!-- Interactive Cost Calculator -->
		<section aria-label="Интерактивный расчет ЧПУ">
			<CostCalculator showTitle={false} />
		</section>

		<!-- Methodological Explanation & Pricing Benchmarks (350+ words technical copy) -->
		<section class="mt-16 border-t border-zinc-800 pt-12" aria-labelledby="methodology-heading">
			<h2 id="methodology-heading" class="text-xl font-bold tracking-tight text-white sm:text-2xl">
				Методика ценообразования и экономика контрактного производства
			</h2>
			<div class="mt-6 grid grid-cols-1 gap-8 text-sm leading-relaxed text-zinc-400 lg:grid-cols-2">
				<div class="space-y-4">
					<h3 class="font-bold text-zinc-200">1. Базовые ставки нормо-часа оборудования</h3>
					<p>
						В отличие от гаражных мастеров, работающих по случайным субъективным расценкам, наш цех
						использует прозрачную систему нормо-часов, откалиброванную по региональному рынку
						Калининградской области:
					</p>
					<ul class="space-y-1.5 font-mono text-xs text-zinc-300">
						<li>
							• Токарная ЧПУ обработка:
							<strong class="text-zinc-100">2 500 ₽ / нормо-час</strong>
						</li>
						<li>
							• Фрезерная 3-осевая ЧПУ обработка:
							<strong class="text-zinc-100">3 000 ₽ / нормо-час</strong>
						</li>
						<li>
							• Фрезерная 4-осевая и 3D обработка:
							<strong class="text-zinc-100">3 500 ₽ / нормо-час</strong>
						</li>
						<li>
							• Инженерная подготовка и CAM-программирование:
							<strong class="text-zinc-100">2 000 ₽ / нормо-час</strong>
						</li>
					</ul>
					<p class="text-xs text-zinc-400">
						Все ставки включают работу оператора станка 5–6 разряда, амортизацию оборудования,
						смазочно-охлаждающие жидкости (СОЖ Blaser) и стандартный твердосплавный инструмент.
					</p>
				</div>

				<div class="space-y-4">
					<h3 class="font-bold text-zinc-200">
						2. Порог минимального заказа (5 000 ₽) и партионные скидки
					</h3>
					<p>
						Базовый порог заказа для юридических лиц в нашем цехе зафиксирован на уровне
						<strong class="font-mono text-white">5 000 ₽</strong>. Это обусловлено неизбежными
						постоянными издержками на запуск даже одной детали:
					</p>
					<ul class="list-inside list-disc space-y-1.5 text-xs text-zinc-300">
						<li>Разработка управляющей программы (УП) в CAM-системе;</li>
						<li>Установка и выкатка технологической оснастки (тиски, кулачки, нулевые точки);</li>
						<li>Привязка инструмента с помощью оптических щупов;</li>
						<li>
							Инструментальный контроль первой детали (First Article Inspection) в лаборатории ОТК.
						</li>
					</ul>
					<p class="text-xs text-zinc-400">
						При увеличении размера партии постоянные затраты на наладку распределяются на все
						изделия, а за счет оптимизации траекторий резания мы предоставляем прогрессивную
						серийную скидку:
						<strong class="font-mono text-emerald-400"
							>10% (от 5 шт.), 20% (от 20 шт.), 30% (от 50 шт.) и 40% (от 100 шт.)</strong
						>.
					</p>
				</div>
			</div>
		</section>

		<!-- Raw Material Options Section -->
		<section class="mt-12 rounded-lg border border-zinc-800 bg-zinc-900/40 p-6">
			<h2 class="text-base font-bold text-white">
				Сырьевые материалы: цеховой склад и давальческий металл
			</h2>
			<p class="mt-2 text-xs leading-relaxed text-zinc-400">
				Мы поддерживаем оперативный складской запас сертифицированного круглого и листового проката
				(Ст45, 40Х, Д16Т, 12Х18Н10Т, БрАЖ9-4, Капролон). Если ваше предприятие располагает
				собственным металлом со спецприемкой или сертификатами РМРС / Авиатехприемки, активируйте в
				калькуляторе опцию <strong class="text-zinc-200"
					>«Материал заказчика (давальческий)»</strong
				> — в этом случае стоимость металла исключается из сметы.
			</p>
		</section>

		<!-- Order Form Anchor Target -->
		<section
			id="order-form"
			class="mt-12 rounded-xl border border-zinc-800 bg-zinc-900/60 p-8 text-center"
		>
			<h2 class="text-xl font-bold text-white">Отправка чертежей и согласование спецификации</h2>
			<p class="mt-2 text-sm text-zinc-400">
				Для точного технологического согласования направьте чертежи и 3D-модели на нашу инженерную
				почту:
			</p>
			<div class="mt-5 flex flex-wrap items-center justify-center gap-3">
				<a
					href="mailto:{siteConfig.contactEmail}"
					class="rounded-md bg-zinc-100 px-4 py-2.5 text-xs font-medium text-zinc-950 shadow-sm transition-colors hover:bg-white"
				>
					{siteConfig.contactEmail}
				</a>
				<a
					href="tel:{siteConfig.contactPhone}"
					class="rounded-md border border-zinc-700 bg-zinc-900/60 px-4 py-2.5 font-mono text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-800"
				>
					{siteConfig.contactPhone}
				</a>
			</div>
		</section>
	</div>
</main>
