<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [
		{ name: 'База знаний', path: '/stati/' },
		{ name: 'Выбор сталей для ЧПУ', path: '/stati/vybor-stali-dlya-chpu-obrabotki/' }
	];
</script>

<svelte:head>
	<title>Выбор сталей и сплавов для ЧПУ обработки в Калининграде | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Сравнение обрабатываемости сталей Ст45, 40Х, 09Г2С, 12Х18Н10Т и алюминия Д16Т на станках с ЧПУ. Коэффициенты обрабатываемости, режимы резания и выбор сплава."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<article>
			<header class="border-b border-zinc-800 pb-8">
				<div class="flex items-center gap-3 font-mono text-xs text-zinc-500">
					<span class="rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-zinc-300">
						Материаловедение
					</span>
					<span>Опубликовано: 25.10.2026</span>
					<span>Время чтения: 7 мин</span>
				</div>
				<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
					Выбор сталей и сплавов для ЧПУ обработки: сравнительный анализ Ст45, 40Х, 12Х18Н10Т и Д16Т
				</h1>
				<p class="mt-4 text-base leading-relaxed text-zinc-300">
					В практике машиностроительного производства правильный подбор марки сплава определяет не
					только эксплуатационный ресурс механизма, но и себестоимость детали. Разница в
					коэффициенте обрабатываемости (<span class="font-mono text-zinc-100"
						>K<sub>mat</sub></span
					>) между алюминием Д16Т и нержавеющей сталью 12Х18Н10Т приводит к трехкратному различию в
					скорости резания и стойкости инструмента.
				</p>
			</header>

			<!-- Direct Summary Block (AEO / LLM Citations) -->
			<div
				class="my-8 rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 text-xs text-zinc-300"
			>
				<div class="font-semibold text-zinc-200">
					Краткая сводка технолога (Direct Answer):
				</div>
				<p class="mt-2 text-xs leading-relaxed text-zinc-300">
					Для слабонагруженных деталей вращения оптимальна сталь Ст45 (K<sub>mat</sub>=1.00). При
					требовании повышенной усталостной прочности и закалки зубьев применяется 40Х (K<sub
						>mat</sub
					>=1.15). Для коррозионно-стойких и судовых деталей используется 12Х18Н10Т (K<sub>mat</sub
					>=1.45, требует жесткого оборудования и СОЖ высокого давления). Для облегченных приборных
					корпусов безальтернативен Д16Т (K<sub>mat</sub>=0.85).
				</p>
			</div>

			<!-- Technical Comparison Table -->
			<div class="my-8 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950">
				<table class="w-full text-left text-xs text-zinc-300">
					<thead class="border-b border-zinc-800 bg-zinc-900/80 font-mono text-zinc-400 uppercase">
						<tr>
							<th class="px-4 py-3">Марка сплава</th>
							<th class="px-4 py-3">Плотность (г/см³)</th>
							<th class="px-4 py-3">K<sub>mat</sub></th>
							<th class="px-4 py-3">Скорость резания Vc (м/мин)</th>
							<th class="px-4 py-3">Типовое применение</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-800/60">
						<tr>
							<td class="px-4 py-3 font-medium text-white">Сталь 45 (ГОСТ 1050)</td>
							<td class="px-4 py-3 font-mono text-zinc-400">7.85</td>
							<td class="px-4 py-3 font-mono text-zinc-100">1.00 (база)</td>
							<td class="px-4 py-3 font-mono text-zinc-200">180 – 240</td>
							<td class="px-4 py-3 text-zinc-400">Валы, ступицы, фланцы, оси</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-medium text-white">40Х легированная (ГОСТ 4543)</td>
							<td class="px-4 py-3 font-mono text-zinc-400">7.85</td>
							<td class="px-4 py-3 font-mono text-zinc-100">1.15</td>
							<td class="px-4 py-3 font-mono text-zinc-200">140 – 190</td>
							<td class="px-4 py-3 text-zinc-400">Шестерни, шлицевые валы, штоки</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-medium text-white">12Х18Н10Т нержавеющая</td>
							<td class="px-4 py-3 font-mono text-zinc-400">7.90</td>
							<td class="px-4 py-3 font-mono text-zinc-100">1.45</td>
							<td class="px-4 py-3 font-mono text-zinc-200">80 – 130</td>
							<td class="px-4 py-3 text-zinc-400">Судовая арматура, штуцеры, пищепром</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-medium text-white">Д16Т дюралюминий (ГОСТ 4784)</td>
							<td class="px-4 py-3 font-mono text-zinc-400">2.78</td>
							<td class="px-4 py-3 font-mono text-emerald-400">0.85</td>
							<td class="px-4 py-3 font-mono text-zinc-200">350 – 700</td>
							<td class="px-4 py-3 text-zinc-400">Приборные корпуса, кронштейны, платы</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Article Body Copy -->
			<div class="space-y-6 text-sm leading-relaxed text-zinc-300">
				<h2 class="text-xl font-bold text-white">
					1. Особенности обработки конструкционной углеродистой стали 45
				</h2>
				<p>
					Сталь 45 является базовым эталоном обрабатываемости резанием (коэффициент 1.00). При
					правильном подборе пластин твердого сплава (группа ISO P20–P30) процесс точения и
					фрезерования протекает стабильно со сливной или суставчатой стружкой. Металл отлично
					поддается поверхностной закалке ТВЧ до 50–54 HRCэ, что делает его оптимальным для
					направляющих пальцев, проушин и осей строительной спецтехники в Калининградской области.
				</p>

				<h2 class="text-xl font-bold text-white">
					2. Хромистая легированная сталь 40Х: термоулучшение и зубонарезание
				</h2>
				<p>
					Сталь 40Х требует обязательного учета исходного состояния поставки: горячекатаный пруток
					без отжига обладает твердостью до 217 HB и повышенной абразивностью. Для изготовления
					ответственных валов и зубчатых колес редукторов мы рекомендуем предварительную
					термообработку (нормализацию или улучшение). При нарезании зубьев шестерен модульными
					фрезами сталь 40Х дает чистую поверхность зуба без задиров.
				</p>

				<h2 class="text-xl font-bold text-white">
					3. Аустенитная нержавеющая сталь 12Х18Н10Т: борьба с наклепом и наростообразованием
				</h2>
				<p>
					Обработка нержавеющих сталей группы ISO M — один из самых трудоемких переделов. Главная
					проблема — быстрое наклепывание поверхностного слоя при малых подачах. Если инструмент
					хотя бы раз «протрет» металл без снятия стружки, последующий проход будет резать слой с
					твердостью до 40 HRC. В цехе {siteConfig.brandName} обработка 12Х18Н10Т ведется исключительно
					с непрерывной подачей СОЖ под давлением не менее 15 бар и положительными передними углами пластин.
				</p>

				<h2 class="text-xl font-bold text-white">
					4. Авиационный деформируемый алюминий Д16Т: высокоскоростное фрезерование (HSM)
				</h2>
				<p>
					Дюралюминий Д16Т в закаленном и естественно состаренном состоянии идеален для фрезерных
					обрабатывающих центров с оборотами шпинделя 8 000 – 12 000 об/мин. При использовании
					однозубых и двухзубых полированных концевых фрез достигается скорость съема материала
					(MRR) до 500 см³/мин при нулевом риске налипания алюминия на режущую кромку.
				</p>
			</div>

			<!-- Contextual Cross Links -->
			<div class="mt-10 rounded-lg border border-zinc-800 bg-zinc-900/40 p-5">
				<h3 class="font-bold text-white">Связанные разделы цеха:</h3>
				<div class="mt-3 flex flex-wrap gap-4 text-xs">
					<a
						href="/tokarnye-raboty-chpu/"
						class="text-zinc-300 hover:text-white hover:underline"
					>
						Токарная обработка сталей на ЧПУ
					</a>
					<a
						href="/frezernye-raboty-chpu/"
						class="text-zinc-300 hover:text-white hover:underline"
					>
						Фрезерование корпусов из Д16Т
					</a>
					<a
						href="/kalkulyator-stoimosti-chpu/"
						class="text-zinc-300 hover:text-white hover:underline"
					>
						Расчет стоимости с выбором материала
					</a>
				</div>
			</div>
		</article>
	</div>
</main>
