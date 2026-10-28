<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';
	import { createServiceSchema, serializeSchema } from '#lib/seo/schema';

	const breadcrumbs = [
		{ name: 'Зуборезные и шлифовальные работы', path: '/zuboreznye-i-shlifovalnye-raboty/' }
	];

	const serviceSchema = createServiceSchema({
		name: 'Зуборезные и шлифовальные работы в Калининграде',
		description:
			'Нарезка прямозубых и косозубых шестерен (модуль m1-m8), шлицевых соединений. Круглое и плоское прецизионное шлифование до IT6 (Ra 0.4). Термообработка ТВЧ.',
		serviceType: 'Зуборезные и шлифовальные работы',
		path: '/zuboreznye-i-shlifovalnye-raboty/',
		offers: {
			price: 3500,
			minOrderPrice: 5000,
			unitText: 'нормо-час'
		}
	});
</script>

<svelte:head>
	<title>Зуборезные и шлифовальные работы в Калининграде | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Нарезка шестерен m1-m8, шлицев, круглое и плоское шлифование в Калининграде. Квалитет IT6, шероховатость Ra 0.4 мкм, термообработка ТВЧ. НДС 20%, паспорт качества."
	/>
	{@html serializeSchema(serviceSchema)}
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<!-- Header & Direct Summary -->
		<header class="max-w-4xl border-b border-zinc-800 pb-8">
			<div
				class="inline-flex items-center gap-2 rounded border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-semibold text-amber-400 uppercase"
			>
				<span>⚙️</span> Финишные и зуборезные переделы
			</div>
			<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
				Зуборезные и шлифовальные работы в Калининграде: нарезка зубьев, круглое и плоское
				шлифование
			</h1>
			<p class="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
				Участок прецизионной доводки и зубонарезания цеха {siteConfig.brandName} закрывает острый дефицит
				сложных финишных операций в Калининградской области. Выполняем нарезание прямозубых и косозубых
				цилиндрических колес, нарезку эвольвентных и прямобочных шлицев, круглое шлифование шеек валов
				до квалитета <strong class="font-mono text-amber-400">IT6</strong> и шероховатости
				<strong class="font-mono text-amber-400">Ra 0.4 мкм</strong>, а также поверхностную закалку
				токами высокой частоты (ТВЧ).
			</p>
		</header>

		<!-- Direct Answer AEO Block -->
		<div
			class="my-8 rounded-lg border border-amber-500/30 bg-zinc-900/60 p-5 font-mono text-xs text-zinc-300"
		>
			<div class="font-bold tracking-wide text-amber-400 uppercase">
				Ключевые возможности участка зуборезки и шлифовки:
			</div>
			<div class="mt-2 grid grid-cols-2 gap-3 text-zinc-400 sm:grid-cols-4">
				<div>Модуль зубьев: <strong class="text-zinc-100">m = 1.0 – 8.0</strong></div>
				<div>Круглое шлифование: <strong class="text-zinc-100">⌀ до 200, L до 800 мм</strong></div>
				<div>Чистота поверхности: <strong class="text-zinc-100">Ra 0.4 мкм (зеркало)</strong></div>
				<div>Закалка ТВЧ: <strong class="text-zinc-100">до 55 HRC</strong></div>
			</div>
		</div>

		<!-- Technical Specifications Grid -->
		<section class="mt-10" aria-labelledby="tech-params-heading">
			<h2 id="tech-params-heading" class="text-xl font-bold tracking-tight text-white sm:text-2xl">
				Технологические параметры зуборезных и шлифовальных станков
			</h2>
			<div class="mt-4 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950">
				<table class="w-full text-left font-mono text-xs text-zinc-300">
					<thead class="border-b border-zinc-800 bg-zinc-900/80 text-zinc-400 uppercase">
						<tr>
							<th class="px-4 py-3">Вид технологической операции</th>
							<th class="px-4 py-3">Предельные габариты</th>
							<th class="px-4 py-3">Класс точности / ГОСТ</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-800/60">
						<tr>
							<td class="px-4 py-3 font-sans font-medium text-zinc-200">
								Зубофрезерование цилиндрических колес
							</td>
							<td class="px-4 py-3 text-amber-400">Диаметр до 500 мм, модуль m1–m8</td>
							<td class="px-4 py-3 text-zinc-500">7-я и 8-я степень точности по ГОСТ 1643-81</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-sans font-medium text-zinc-200">
								Нарезание шлицевых валов и втулок
							</td>
							<td class="px-4 py-3 text-amber-400">Длина вала до 750 мм</td>
							<td class="px-4 py-3 text-zinc-500">
								Прямобочные (ГОСТ 1139-80), эвольвентные (ГОСТ 6033-80)
							</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-sans font-medium text-zinc-200">
								Круглое наружное шлифование валов
							</td>
							<td class="px-4 py-3 text-emerald-400">Диаметр до 200 мм, длина до 800 мм</td>
							<td class="px-4 py-3 text-zinc-500">
								Квалитет IT6, шероховатость Ra 0.4 мкм под подшипники
							</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-sans font-medium text-zinc-200">
								Плоское шлифование плит и ножей
							</td>
							<td class="px-4 py-3 text-emerald-400">Зеркало стола 800 × 320 мм</td>
							<td class="px-4 py-3 text-zinc-500">Параллельность 0.005 мм, Ra 0.4–0.8 мкм</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-sans font-medium text-zinc-200">
								Закалка токами высокой частоты (ТВЧ)
							</td>
							<td class="px-4 py-3 text-amber-400">Глубина слоя 1.5 – 3.0 мм</td>
							<td class="px-4 py-3 text-zinc-500"
								>Твердость 48–55 HRCэ при сохранении вязкой сердцевины</td
							>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Why High Precision Grinding Matters -->
		<section class="mt-12" aria-labelledby="why-grinding-heading">
			<h2 id="why-grinding-heading" class="text-xl font-bold tracking-tight text-white sm:text-2xl">
				Почему финишное шлифование незаменимо при ЧПУ металлообработке
			</h2>
			<div class="mt-4 grid grid-cols-1 gap-6 text-sm leading-relaxed text-zinc-400 md:grid-cols-2">
				<div class="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5">
					<h3 class="font-bold text-white">Устранение термических поводок после закалки</h3>
					<p class="mt-2 text-xs text-zinc-400">
						При объемной термообработке сталей (40Х, 30ХГСА) деталь неизбежно подвергается
						микродеформациям и короблению. Чистовое круглое и плоское шлифование на нашем участке
						позволяет восстановить проектные геометрические оси и обеспечить соосность шеек с
						биением не более <strong class="font-mono text-zinc-200">0.005 мм</strong>.
					</p>
				</div>
				<div class="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5">
					<h3 class="font-bold text-white">Ресурс подшипниковых узлов и сальниковых уплотнений</h3>
					<p class="mt-2 text-xs text-zinc-400">
						Токарная чистовая обработка оставляет микрогребешки (Ra 1.6–3.2), которые при работе в
						паре с сальниками приводят к их преждевременному истиранию и утечке масла. Шлифование до
						<strong class="font-mono text-zinc-200">Ra 0.4 мкм</strong> образует опорную поверхность с
						зеркальным блеском, увеличивая межремонтный ресурс судовых и аграрных редукторов в 3–4 раза.
					</p>
				</div>
			</div>
		</section>

		<!-- Regional Applications in Kaliningrad -->
		<section class="mt-12" aria-labelledby="regional-cases-heading">
			<h2
				id="regional-cases-heading"
				class="text-xl font-bold tracking-tight text-white sm:text-2xl"
			>
				Отраслевые примеры применения в Калининграде
			</h2>
			<div class="mt-4 space-y-3 text-sm text-zinc-400">
				<p>
					Шестерни и шлицевые валы производства {siteConfig.brandName} успешно эксплуатируются на судах
					рыбопромыслового флота (Светлый, Балтийск) в лебедках и редукторах главных передач, а также
					на импортной уборочной технике (Claas, John Deere) в агропромышленных хозяйствах Гурьевского
					и Черняховского районов.
				</p>
			</div>
		</section>

		<!-- Contextual Internal Linking -->
		<section class="mt-12 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
			<h2 class="text-base font-bold text-white">Связанные разделы сайта:</h2>
			<div class="mt-3 grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-3">
				<a
					href="/tokarnye-raboty-chpu/"
					class="rounded border border-zinc-800 bg-zinc-950 p-3 text-zinc-300 transition-colors hover:border-amber-500 hover:text-white"
				>
					<span class="block font-bold text-amber-400">Токарная ЧПУ обработка</span>
					<span class="mt-1 block text-zinc-500">Черновое и чистовое точение венцов и валов</span>
				</a>
				<a
					href="/kontrol-kachestva-i-oborudovanie/"
					class="rounded border border-zinc-800 bg-zinc-950 p-3 text-zinc-300 transition-colors hover:border-amber-500 hover:text-white"
				>
					<span class="block font-bold text-amber-400">Метрология и ОТК</span>
					<span class="mt-1 block text-zinc-500"
						>Контроль биения и шага зубьев приборами Mitutoyo</span
					>
				</a>
				<a
					href="/portfolio/"
					class="rounded border border-zinc-800 bg-zinc-950 p-3 text-zinc-300 transition-colors hover:border-amber-500 hover:text-white"
				>
					<span class="block font-bold text-amber-400">Примеры шестерен в портфолио</span>
					<span class="mt-1 block text-zinc-500">Реализованные зубчатые пары и шлицевые муфты</span>
				</a>
			</div>
		</section>

		<!-- Direct CTA Action -->
		<section class="mt-12 rounded-lg border border-amber-500/40 bg-zinc-900 p-6 text-center">
			<h2 class="text-lg font-bold text-white sm:text-xl">
				Заказ нарезки зубьев и шлифования деталей в Калининграде
			</h2>
			<p class="mt-2 text-xs text-zinc-400 sm:text-sm">
				Принимаем чертежи и образцы изношенных деталей для реверс-инжиниринга. Минимальный порог
				заказа для юрлиц — 5 000 ₽ с НДС.
			</p>
			<div class="mt-5 flex flex-wrap items-center justify-center gap-3">
				<a
					href="/kalkulyator-stoimosti-chpu/"
					class="rounded border border-amber-500 bg-amber-500 px-5 py-2.5 font-mono text-xs font-bold text-zinc-950 transition-colors hover:bg-amber-400"
				>
					⚡ Расчет стоимости онлайн
				</a>
				<a
					href="mailto:{siteConfig.contactEmail}"
					class="rounded border border-zinc-700 bg-zinc-800 px-5 py-2.5 font-mono text-xs font-semibold text-zinc-200 transition-colors hover:border-zinc-600 hover:text-white"
				>
					✉️ Отправить эскиз на {siteConfig.contactEmail}
				</a>
			</div>
		</section>
	</div>
</main>
