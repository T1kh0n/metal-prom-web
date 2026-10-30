<script lang="ts">
	import { base } from '$lib/paths';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';
	import { createServiceSchema, serializeSchema } from '#lib/seo/schema';

	const breadcrumbs = [
		{ name: 'Зуборезка и шлифовка', path: '/zuboreznye-i-shlifovalnye-raboty/' }
	];

	const serviceSchema = createServiceSchema({
		name: 'Зуборезные и шлифовальные работы в Калининграде',
		description:
			'Нарезание прямозубых и косозубых шестерен m1-m8, нарезка шлицев. Круглое шлифование до ⌀200х800 мм, плоское шлифование плит, закалка ТВЧ до 55 HRC.',
		serviceType: 'Зуборезные и шлифовальные работы по металлу',
		path: '/zuboreznye-i-shlifovalnye-raboty/',
		offers: {
			price: 3200,
			minOrderPrice: 5000,
			unitText: 'нормо-час'
		}
	});
</script>

<svelte:head>
	<title
		>Зуборезные и шлифовальные работы в Калининграде: шестерни и валы | {siteConfig.brandName}</title
	>
	<meta
		name="description"
		content="Нарезка шестерен m1–m8, шлицевых соединений, шлифование валов до Ra 0.4 мкм и термообработка ТВЧ в Калининграде. Закалка 55 HRC, точность ГОСТ 1643-81."
	/>
	{@html serializeSchema(serviceSchema)}
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<!-- Header & Direct Summary: 12-Column Asymmetric Hero -->
		<div
			class="mt-4 grid grid-cols-1 items-start gap-8 border-b border-[var(--color-rule)] pb-8 lg:grid-cols-12"
		>
			<div class="lg:col-span-7">
				<h1 class="text-3xl text-[var(--color-ink)] sm:text-4xl">
					Зуборезные работы и прецизионная шлифовка
				</h1>
				<p class="lead mt-4 text-sm leading-relaxed sm:text-base">
					Нарезка шестерен m1–m8, шлицевых валов и чистовое шлифование до
					<span class="num text-[var(--color-ink)]">Ra 0.4<span class="u">&thinsp;мкм</span></span>.
					Закалка ТВЧ до 55 HRC, допуски по ГОСТ 1643-81, партии от 5 штук.
				</p>
			</div>
			<div class="well text-xs text-[var(--color-ink-2)] lg:col-span-5">
				<div class="font-normal text-[var(--color-ink)]">Лимиты участка зуборезки и шлифовки:</div>
				<div class="mt-3 grid grid-cols-2 gap-3 text-[var(--color-muted)]">
					<div>
						Модуль зубьев:
						<strong class="num block font-normal text-[var(--color-ink)]">m = 1.0 – 8.0</strong>
					</div>
					<div>
						Круглая шлифовка:
						<strong class="num block font-normal text-[var(--color-ink)]"
							>⌀ до 200, L до 800<span class="u">&thinsp;мм</span></strong
						>
					</div>
					<div>
						Шероховатость:
						<strong class="num block font-normal text-[var(--color-ink)]"
							>Ra 0.4<span class="u">&thinsp;мкм</span></strong
						>
					</div>
					<div>
						Закалка ТВЧ:
						<strong class="num block font-normal text-[var(--color-ink)]">до 55 HRC</strong>
					</div>
				</div>
			</div>
		</div>

		<!-- Technical Specifications Grid -->
		<section class="mt-10" aria-labelledby="tech-params-heading">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
				<div class="lg:col-span-4">
					<h2 id="tech-params-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">
						Параметры станков
					</h2>
					<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
						Зубофрезерные и шлифовальные станки высокой точности с приборами активного контроля.
					</p>
				</div>
				<div class="overflow-x-auto lg:col-span-8">
					<table class="v-table">
						<thead>
							<tr>
								<th>Вид технологической операции</th>
								<th>Предельные габариты</th>
								<th>Класс точности / ГОСТ</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">
									Зубофрезерование цилиндрических колес
								</td>
								<td class="num text-[var(--color-ink)]"
									>Диаметр до 500<span class="u">&thinsp;мм</span>, модуль m1–m8</td
								>
								<td class="text-[var(--color-muted)]">7-я и 8-я степень точности по ГОСТ 1643-81</td
								>
							</tr>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">
									Нарезание шлицевых валов и втулок
								</td>
								<td class="num text-[var(--color-ink)]"
									>Длина вала до 750<span class="u">&thinsp;мм</span></td
								>
								<td class="text-[var(--color-muted)]">
									Прямобочные (ГОСТ 1139-80), эвольвентные (ГОСТ 6033-80)
								</td>
							</tr>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">
									Круглое наружное шлифование валов
								</td>
								<td class="num text-[var(--color-ink)]">
									Диаметр до 200<span class="u">&thinsp;мм</span>, длина до 800<span class="u"
										>&thinsp;мм</span
									>
								</td>
								<td class="text-[var(--color-muted)]">
									Квалитет IT6, шероховатость Ra 0.4 мкм под подшипники
								</td>
							</tr>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">Плоское шлифование плит и ножей</td>
								<td class="num text-[var(--color-ink)]"
									>Зеркало стола 800 × 320<span class="u">&thinsp;мм</span></td
								>
								<td class="text-[var(--color-muted)]">Параллельность 0.005 мм, Ra 0.4–0.8 мкм</td>
							</tr>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">
									Закалка токами высокой частоты (ТВЧ)
								</td>
								<td class="num text-[var(--color-ink)]"
									>Глубина слоя 1.5 – 3.0<span class="u">&thinsp;мм</span></td
								>
								<td class="text-[var(--color-muted)]">
									Твердость 48–55 HRCэ при сохранении вязкой сердцевины
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>

		<!-- Why High Precision Grinding Matters -->
		<section class="mt-14" aria-labelledby="why-grinding-heading">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
				<div class="lg:col-span-4">
					<h2 id="why-grinding-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">
						Значение шлифования
					</h2>
					<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
						Устранение поводок после термообработки и формирование опорных шеек под подшипники.
					</p>
				</div>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
					<div class="well">
						<h3 class="font-normal text-[var(--color-ink)]">Устранение термических поводок</h3>
						<p class="mt-2 text-xs text-[var(--color-muted)]">
							При объемной термообработке сталей (40Х, 30ХГСА) деталь неизбежно коробится. Чистовое
							круглое шлифование восстанавливает оси с биением не более
							<strong class="num font-normal text-[var(--color-ink)]"
								>0.005<span class="u">&thinsp;мм</span></strong
							>.
						</p>
					</div>
					<div class="well">
						<h3 class="font-normal text-[var(--color-ink)]">Ресурс подшипников и сальников</h3>
						<p class="mt-2 text-xs text-[var(--color-muted)]">
							Токарная чистовая обработка оставляет микрогребешки (Ra 1.6–3.2). Шлифование до
							<strong class="num font-normal text-[var(--color-ink)]"
								>Ra 0.4<span class="u">&thinsp;мкм</span></strong
							> образует зеркальную поверхность, увеличивая ресурс редукторов в 3–4 раза.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Regional Applications in Kaliningrad -->
		<section class="mt-14" aria-labelledby="regional-cases-heading">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
				<div class="lg:col-span-4">
					<h2 id="regional-cases-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">
						Отраслевой опыт
					</h2>
					<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
						Применение в судовых редукторах и сельхозтехнике в Калининградской области.
					</p>
				</div>
				<div class="space-y-3 text-xs leading-relaxed text-[var(--color-muted)] lg:col-span-8">
					<p class="max-w-2xl">
						Шестерни и шлицевые валы производства {siteConfig.brandName} эксплуатируются на рыбопромысловых
						судах (Светлый, Балтийск) в лебедках и редукторах, а также на комбайнах и тракторах (Claas,
						John Deere) в Гурьевском и Черняховском районах.
					</p>
				</div>
			</div>
		</section>

		<!-- Contextual Internal Linking -->
		<section class="mt-14 border-t border-[var(--color-rule)] pt-8">
			<h2 class="text-sm font-normal text-[var(--color-ink)]">Связанные разделы сайта:</h2>
			<div class="mt-4 grid grid-cols-1 gap-4 text-xs sm:grid-cols-3">
				<a
					href="{base}/tokarnye-raboty-chpu/"
					class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"
				>
					<span class="block font-normal text-[var(--color-ink)]">Токарная ЧПУ обработка</span>
					<span class="mt-1 block text-[var(--color-muted)]"
						>Черновое и чистовое точение венцов и валов</span
					>
				</a>
				<a
					href="{base}/kontrol-kachestva-i-oborudovanie/"
					class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"
				>
					<span class="block font-normal text-[var(--color-ink)]">Метрология и ОТК</span>
					<span class="mt-1 block text-[var(--color-muted)]"
						>Контроль биения и шага зубьев приборами Mitutoyo</span
					>
				</a>
				<a
					href="{base}/portfolio/"
					class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"
				>
					<span class="block font-normal text-[var(--color-ink)]">Примеры шестерен в портфолио</span
					>
					<span class="mt-1 block text-[var(--color-muted)]"
						>Реализованные зубчатые пары и шлицевые муфты</span
					>
				</a>
			</div>
		</section>

		<!-- Direct CTA Action -->
		<section class="mt-14 border-t border-[var(--color-rule)] pt-12 pb-6 text-center">
			<h2 class="text-lg text-[var(--color-ink)] sm:text-xl">
				Заказ нарезки зубьев и шлифования деталей в Калининграде
			</h2>
			<p class="lead mx-auto mt-2 max-w-2xl text-xs sm:text-sm">
				Принимаем чертежи и образцы изношенных деталей для реверс-инжиниринга. Минимальный заказ —
				5&thinsp;000&thinsp;₽ с НДС.
			</p>
			<div class="mt-6 flex flex-wrap items-center justify-center gap-3">
				<a href="{base}/kalkulyator-stoimosti-chpu/" class="btn btn--sm"> Расчет стоимости онлайн </a>
				<a href="mailto:{siteConfig.contactEmail}" class="btn btn--sm btn--line">
					Отправить эскиз на {siteConfig.contactEmail}
				</a>
			</div>
		</section>
	</div>
</main>
