<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [
		{ name: 'База знаний', path: '/stati/' },
		{
			name: 'Квалитеты точности и шероховатость',
			path: '/stati/kvalitety-tochnosti-i-sherohovatost-gost/'
		}
	];
</script>

<svelte:head>
	<title
		>Квалитеты точности IT6–IT12 и шероховатость Ra по ГОСТ: таблица допусков | {siteConfig.brandName}</title
	>
	<meta
		name="description"
		content="Таблица допусков по квалитетам IT6, IT7, IT8, IT9, IT11 по ГОСТ 25346. Взаимосвязь шероховатости поверхности Ra и точности, когда требуется шлифование валов."
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
						Метрология и стандарты
					</span>
					<span>Опубликовано: 26.10.2026</span>
					<span>8 мин чтения</span>
				</div>
				<h1 class="mt-4 text-2xl text-[var(--color-ink)] sm:text-3xl lg:text-4xl">
					Квалитеты точности IT6–IT12 и шероховатость Ra
				</h1>
				<p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
					Руководство по допускам ГОСТ 25346-2015. Анализ классов шероховатости Ra и причин, почему
					завышение требований до IT6 увеличивает себестоимость партии в 2–3 раза.
				</p>
			</header>

			<!-- 12-Column Content Layout -->
			<div class="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
				<div class="space-y-6 text-xs leading-relaxed text-[var(--color-muted)] lg:col-span-8">
					<!-- Direct Summary AEO Block -->
					<div class="well text-xs text-[var(--color-ink-2)]">
						<div class="font-normal text-[var(--color-ink)]">Справочная памятка по квалитетам:</div>
						<ul
							class="mt-2 max-w-2xl space-y-1.5 text-xs leading-relaxed text-[var(--color-muted)]"
						>
							<li>
								<strong class="font-normal text-[var(--color-ink)]"
									>IT6 – IT7 (допуск 9–16 мкм для ⌀30–50 мм):</strong
								> Шейки под прецизионные подшипники качения, плунжеры, золотники. Требует шлифования (Ra
								0.4–0.8 мкм).
							</li>
							<li>
								<strong class="font-normal text-[var(--color-ink)]"
									>IT8 – IT9 (допуск 25–62 мкм):</strong
								> Стандартная токарная и фрезерная обработка с ЧПУ. Посадки втулок, фланцев, шпоночных
								пазов (Ra 1.6–3.2 мкм).
							</li>
							<li>
								<strong class="font-normal text-[var(--color-ink)]"
									>IT11 – IT12 (допуск 100–250 мкм):</strong
								> Свободные габаритные размеры, фаски, крепежные и сквозные отверстия под болты.
							</li>
						</ul>
					</div>

					<!-- Tolerance & Roughness Reference Table -->
					<div class="overflow-x-auto">
						<table class="v-table">
							<thead>
								<tr>
									<th>Квалитет (ГОСТ 25346)</th>
									<th>Допуск на диаметр ⌀40 мм</th>
									<th>Шероховатость Ra</th>
									<th>Метод получения</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="font-normal text-[var(--color-ink)]">IT6 (Прецизионный)</td>
									<td class="num text-[var(--color-ink)]"
										>16<span class="u">&thinsp;мкм (±0.008 мм)</span></td
									>
									<td class="num text-[var(--color-ink)]"
										>Ra 0.2 – 0.4<span class="u">&thinsp;мкм</span></td
									>
									<td class="text-[var(--color-muted)]">Круглое наружное / внутреннее шлифование</td
									>
								</tr>
								<tr>
									<td class="font-normal text-[var(--color-ink)]">IT7 (Высокоточный)</td>
									<td class="num text-[var(--color-ink)]"
										>25<span class="u">&thinsp;мкм (±0.012 мм)</span></td
									>
									<td class="num text-[var(--color-ink)]"
										>Ra 0.8 – 1.6<span class="u">&thinsp;мкм</span></td
									>
									<td class="text-[var(--color-muted)]"
										>Тонкое ЧПУ точение, развертывание отверстий</td
									>
								</tr>
								<tr>
									<td class="font-normal text-[var(--color-ink-2)]">IT8 (Повышенный)</td>
									<td class="num text-[var(--color-ink)]"
										>39<span class="u">&thinsp;мкм (±0.020 мм)</span></td
									>
									<td class="num text-[var(--color-ink)]"
										>Ra 1.6 – 3.2<span class="u">&thinsp;мкм</span></td
									>
									<td class="text-[var(--color-muted)]">Чистовое ЧПУ фрезерование и точение</td>
								</tr>
								<tr>
									<td class="font-normal text-[var(--color-ink-2)]">IT9 – IT10 (Средний)</td>
									<td class="num text-[var(--color-ink)]"
										>62 – 100<span class="u">&thinsp;мкм</span></td
									>
									<td class="num text-[var(--color-ink)]"
										>Ra 3.2 – 6.3<span class="u">&thinsp;мкм</span></td
									>
									<td class="text-[var(--color-muted)]">
										Получистовая обработка, сверление спиральными сверлами
									</td>
								</tr>
								<tr>
									<td class="font-normal text-[var(--color-muted)]">IT11 – IT12 (Свободный)</td>
									<td class="num text-[var(--color-ink)]"
										>160 – 250<span class="u">&thinsp;мкм</span></td
									>
									<td class="num text-[var(--color-ink)]"
										>Ra 6.3 – 12.5<span class="u">&thinsp;мкм</span></td
									>
									<td class="text-[var(--color-muted)]">
										Черновое обдирочное резание, ленточнопильный рез
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<!-- Technical Deep Dive -->
					<div class="space-y-6 pt-4">
						<div>
							<h2 class="text-base text-[var(--color-ink)]">
								1. Почему невозможно получить IT6 обычным точением?
							</h2>
							<p class="mt-2 max-w-2xl">
								Токарный станок с ЧПУ имеет микроколебания шпинделя, термическое удлинение станины
								при нагреве (до 0.010–0.015 мм за смену) и износ пластины. Для удержания допуска 16
								мкм в серии из 100 деталей оператор подналаживал бы корректоры каждые 2 детали.
								Поэтому IT6 получается на круглошлифовальных станках с обильным охлаждением.
							</p>
						</div>

						<div>
							<h2 class="text-base text-[var(--color-ink)]">
								2. Шероховатость Ra: микрогеометрия контакта
							</h2>
							<p class="mt-2 max-w-2xl">
								Шероховатость поверхности <span class="num text-[var(--color-ink)]">Ra</span> прямо определяет
								ресурс сопряженных узлов. Для неподвижных посадок достаточно Ra 1.6–3.2 мкм. Для подвижных
								пар трения (вращение вала во втулке или контакт штока с манжетой) шероховатость более
								Ra 0.8 мкм действует как абразив, разрушая уплотнения.
							</p>
						</div>

						<div>
							<h2 class="text-base text-[var(--color-ink)]">
								3. Метрологический контроль в лаборатории
							</h2>
							<p class="mt-2 max-w-2xl">
								В нашем цехе соответствие квалитетам проверяется в термостатированном помещении
								(+20°C ±1°C) приборами <strong class="font-normal text-[var(--color-ink)]"
									>Mitutoyo (Япония)</strong
								>: цифровыми микрометрами с дискретностью 1 мкм и контактным профилометром Surftest
								SJ-210. Данные измерений вносятся в паспорт изделия.
							</p>
						</div>
					</div>
				</div>

				<!-- Sidebar (lg:col-span-4) -->
				<aside class="space-y-6 lg:col-span-4">
					<div class="well">
						<h3 class="text-sm font-normal text-[var(--color-ink)]">Инженерное правило:</h3>
						<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
							Назначайте IT6 только для шеек под подшипники качения и плунжеров. Для большинства
							посадочных мест достаточно IT7–IT8, что исключает операцию шлифования.
						</p>
					</div>

					<div class="well">
						<h3 class="text-xs font-normal text-[var(--color-ink)]">Связанные разделы сайта:</h3>
						<div class="mt-3 flex flex-col space-y-2 text-xs">
							<a
								href="/kontrol-kachestva-i-oborudovanie/"
								class="text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:underline"
							>
								Лаборатория ОТК и приборы Mitutoyo &rarr;
							</a>
							<a
								href="/zuboreznye-i-shlifovalnye-raboty/"
								class="text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:underline"
							>
								Круглое шлифование до IT6 &rarr;
							</a>
							<a
								href="/kalkulyator-stoimosti-chpu/"
								class="text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:underline"
							>
								Расчет стоимости с надбавкой за точность &rarr;
							</a>
						</div>
					</div>
				</aside>
			</div>
		</article>
	</div>
</main>
