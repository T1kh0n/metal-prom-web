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
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<article>
			<header class="border-b border-[var(--color-rule)] pb-8">
				<div class="flex items-center gap-3 text-xs text-[var(--color-muted)]">
					<span
						class="rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-2 py-0.5 text-[var(--color-ink-2)]"
					>
						Материаловедение
					</span>
					<span>Опубликовано: 25.10.2026</span>
					<span>7 мин чтения</span>
				</div>
				<h1 class="mt-4 text-2xl text-[var(--color-ink)] sm:text-3xl lg:text-4xl">
					Выбор сталей и сплавов для обработки с ЧПУ
				</h1>
				<p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
					Сравнительный анализ обрабатываемости Ст45, 40Х, 12Х18Н10Т и Д16Т. Влияние коэффициента
					Kmat на машинное время, режимы резания и себестоимость детали.
				</p>
			</header>

			<!-- 12-Column Content Layout -->
			<div class="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
				<div class="space-y-6 text-xs leading-relaxed text-[var(--color-muted)] lg:col-span-8">
					<!-- Direct Summary Block (AEO / LLM Citations) -->
					<div class="well text-xs text-[var(--color-ink-2)]">
						<div class="font-normal text-[var(--color-ink)]">
							Краткая сводка технолога (Direct Answer):
						</div>
						<p class="mt-2 max-w-2xl text-xs leading-relaxed text-[var(--color-muted)]">
							Для слабонагруженных деталей вращения оптимальна сталь Ст45 (K<sub>mat</sub>=1.00).
							При требовании закалки зубьев применяется 40Х (K<sub>mat</sub>=1.15). Для
							коррозионно-стойких деталей — 12Х18Н10Т (K<sub>mat</sub>=1.45, требует жесткого
							оборудования и СОЖ высокого давления). Для облегченных приборных корпусов — Д16Т (K<sub
								>mat</sub
							>=0.85).
						</p>
					</div>

					<!-- Technical Comparison Table -->
					<div class="overflow-x-auto">
						<table class="v-table">
							<thead>
								<tr>
									<th>Марка сплава</th>
									<th>Плотность (г/см³)</th>
									<th>K<sub>mat</sub></th>
									<th>Скорость Vc (м/мин)</th>
									<th>Типовое применение</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="font-normal text-[var(--color-ink)]">Сталь 45 (ГОСТ 1050)</td>
									<td class="num text-[var(--color-muted)]">7.85</td>
									<td class="num text-[var(--color-ink)]">1.00 (база)</td>
									<td class="num text-[var(--color-ink-2)]">180 – 240</td>
									<td class="text-[var(--color-muted)]">Валы, ступицы, фланцы, оси</td>
								</tr>
								<tr>
									<td class="font-normal text-[var(--color-ink)]">40Х легированная (ГОСТ 4543)</td>
									<td class="num text-[var(--color-muted)]">7.85</td>
									<td class="num text-[var(--color-ink)]">1.15</td>
									<td class="num text-[var(--color-ink-2)]">140 – 190</td>
									<td class="text-[var(--color-muted)]">Шестерни, шлицевые валы, штоки</td>
								</tr>
								<tr>
									<td class="font-normal text-[var(--color-ink)]">12Х18Н10Т нержавеющая</td>
									<td class="num text-[var(--color-muted)]">7.90</td>
									<td class="num text-[var(--color-ink)]">1.45</td>
									<td class="num text-[var(--color-ink-2)]">80 – 130</td>
									<td class="text-[var(--color-muted)]">Судовая арматура, штуцеры, пищепром</td>
								</tr>
								<tr>
									<td class="font-normal text-[var(--color-ink)]">Д16Т дюралюминий (ГОСТ 4784)</td>
									<td class="num text-[var(--color-muted)]">2.78</td>
									<td class="num text-[var(--color-ink)]">0.85</td>
									<td class="num text-[var(--color-ink-2)]">350 – 700</td>
									<td class="text-[var(--color-muted)]">Приборные корпуса, кронштейны, платы</td>
								</tr>
							</tbody>
						</table>
					</div>

					<!-- Article Body Copy -->
					<div class="space-y-6 pt-4">
						<div>
							<h2 class="text-base text-[var(--color-ink)]">
								1. Особенности обработки конструкционной углеродистой стали 45
							</h2>
							<p class="mt-2 max-w-2xl">
								Сталь 45 является базовым эталоном обрабатываемости резанием (коэффициент 1.00). При
								правильном подборе пластин твердого сплава (группа ISO P20–P30) процесс точения и
								фрезерования протекает стабильно со сливной или суставчатой стружкой. Металл отлично
								поддается поверхностной закалке ТВЧ до 50–54 HRCэ, что делает его оптимальным для
								направляющих пальцев, проушин и осей строительной спецтехники в Калининградской
								области.
							</p>
						</div>

						<div>
							<h2 class="text-base text-[var(--color-ink)]">
								2. Хромистая легированная сталь 40Х: термоулучшение и зубонарезание
							</h2>
							<p class="mt-2 max-w-2xl">
								Сталь 40Х требует обязательного учета исходного состояния поставки: горячекатаный
								пруток без отжига обладает твердостью до 217 HB и повышенной абразивностью. Для
								изготовления ответственных валов и зубчатых колес редукторов мы рекомендуем
								предварительную термообработку (нормализацию или улучшение). При нарезании зубьев
								шестерен модульными фрезами сталь 40Х дает чистую поверхность зуба без задиров.
							</p>
						</div>

						<div>
							<h2 class="text-base text-[var(--color-ink)]">
								3. Аустенитная нержавеющая сталь 12Х18Н10Т: борьба с наклепом
							</h2>
							<p class="mt-2 max-w-2xl">
								Обработка нержавеющих сталей группы ISO M — один из самых трудоемких переделов.
								Главная проблема — быстрое наклепывание поверхностного слоя при малых подачах. Если
								инструмент хотя бы раз «протрет» металл без снятия стружки, последующий проход будет
								резать слой с твердостью до 40 HRC. В цехе {siteConfig.brandName} обработка 12Х18Н10Т
								ведется исключительно с непрерывной подачей СОЖ под давлением не менее 15 бар и положительными
								передними углами пластин.
							</p>
						</div>

						<div>
							<h2 class="text-base text-[var(--color-ink)]">
								4. Авиационный деформируемый алюминий Д16Т: высокоскоростное фрезерование (HSM)
							</h2>
							<p class="mt-2 max-w-2xl">
								Дюралюминий Д16Т в закаленном и естественно состаренном состоянии идеален для
								фрезерных обрабатывающих центров с оборотами шпинделя 8 000 – 12 000 об/мин. При
								использовании однозубых и двухзубых полированных концевых фрез достигается скорость
								съема материала (MRR) до 500 см³/мин при нулевом риске налипания алюминия на режущую
								кромку.
							</p>
						</div>
					</div>
				</div>

				<!-- Sidebar / Contextual Information (lg:col-span-4) -->
				<aside class="space-y-6 lg:col-span-4">
					<div class="well">
						<h3 class="text-sm font-normal text-[var(--color-ink)]">Практическая рекомендация:</h3>
						<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
							При проектировании деталей выбирайте наименее легированную марку из удовлетворяющих
							условиям нагружения. Переход со стали 40Х на сталь 45 снижает затраты на режущий
							инструмент на 15–20%.
						</p>
					</div>

					<div class="well">
						<h3 class="text-xs font-normal text-[var(--color-ink)]">Связанные разделы цеха:</h3>
						<div class="mt-3 flex flex-col space-y-2 text-xs">
							<a
								href="/tokarnye-raboty-chpu/"
								class="text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:underline"
							>
								Токарная обработка сталей на ЧПУ &rarr;
							</a>
							<a
								href="/frezernye-raboty-chpu/"
								class="text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:underline"
							>
								Фрезерование корпусов из Д16Т &rarr;
							</a>
							<a
								href="/kalkulyator-stoimosti-chpu/"
								class="text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:underline"
							>
								Расчет стоимости с выбором материала &rarr;
							</a>
						</div>
					</div>
				</aside>
			</div>
		</article>
	</div>
</main>
