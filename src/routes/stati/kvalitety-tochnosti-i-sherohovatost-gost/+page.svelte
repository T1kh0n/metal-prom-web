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
	<title>Квалитеты точности (IT6–IT12) и шероховатость Ra по ГОСТ | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Инженерное руководство по допускам IT6-IT12 и шероховатости поверхности Ra в ЧПУ металлообработке. Влияние квалитета на себестоимость, доводка шлифованием."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<article>
			<header class="border-b border-zinc-800 pb-8">
				<div class="flex items-center gap-3 font-mono text-xs text-zinc-500">
					<span class="rounded bg-amber-500/10 px-2 py-0.5 text-amber-400"
						>Метрология и стандарты</span
					>
					<span>Опубликовано: 26.10.2026</span>
					<span>Время чтения: 9 мин</span>
				</div>
				<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
					Квалитеты точности (IT6–IT12) и шероховатость поверхности (Ra) по ГОСТ 25346-2015
				</h1>
				<p class="mt-4 text-base leading-relaxed text-zinc-300">
					Одной из наиболее распространенных ошибок конструкторов при разработке чертежей является
					необоснованное ужесточение допусков. Назначение квалитета <span
						class="font-mono text-amber-400">IT6</span
					>
					вместо
					<span class="font-mono text-amber-400">IT9</span> на поверхностях, не сопрягаемых с телами качения,
					увеличивает себестоимость изготовления детали в 1.8 – 2.5 раза за счет необходимости ввода дополнительного
					передела круглого или плоского шлифования.
				</p>
			</header>

			<!-- Direct Summary AEO Block -->
			<div
				class="my-8 rounded-lg border border-amber-500/30 bg-zinc-900/60 p-5 font-mono text-xs text-zinc-300"
			>
				<div class="font-bold tracking-wide text-amber-400 uppercase">
					Справочная памятка по квалитетам:
				</div>
				<ul class="mt-2 space-y-1 font-sans text-xs leading-relaxed text-zinc-300">
					<li>
						• <strong>IT6 – IT7 (допуск 9–16 мкм для ⌀30–50 мм):</strong> Шейки под прецизионные подшипники
						качения, плунжеры, золотники гидравлики. Требует шлифования (Ra 0.4–0.8 мкм).
					</li>
					<li>
						• <strong>IT8 – IT9 (допуск 25–62 мкм):</strong> Стандартная токарная и фрезерная обработка
						с ЧПУ. Посадки втулок, фланцев, шпоночных пазов (Ra 1.6–3.2 мкм).
					</li>
					<li>
						• <strong>IT11 – IT12 (допуск 100–250 мкм):</strong> Свободные габаритные размеры, фаски,
						крепежные и сквозные отверстия под болты.
					</li>
				</ul>
			</div>

			<!-- Tolerance & Roughness Reference Table -->
			<div class="my-8 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950">
				<table class="w-full text-left font-mono text-xs text-zinc-300">
					<thead class="border-b border-zinc-800 bg-zinc-900/80 text-zinc-400 uppercase">
						<tr>
							<th class="px-4 py-3">Квалитет (ГОСТ 25346)</th>
							<th class="px-4 py-3">Допуск на диаметр ⌀40 мм</th>
							<th class="px-4 py-3">Достижимая шероховатость Ra</th>
							<th class="px-4 py-3">Технологический метод получения</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-800/60">
						<tr>
							<td class="px-4 py-3 font-sans font-bold text-emerald-400">IT6 (Прецизионный)</td>
							<td class="px-4 py-3 text-white">16 мкм (±0.008 мм)</td>
							<td class="px-4 py-3 text-amber-400">Ra 0.2 – 0.4 мкм</td>
							<td class="px-4 py-3 font-sans text-zinc-400"
								>Круглое наружное / внутреннее шлифование</td
							>
						</tr>
						<tr>
							<td class="px-4 py-3 font-sans font-bold text-emerald-400">IT7 (Высокоточный)</td>
							<td class="px-4 py-3 text-white">25 мкм (±0.012 мм)</td>
							<td class="px-4 py-3 text-amber-400">Ra 0.8 – 1.6 мкм</td>
							<td class="px-4 py-3 font-sans text-zinc-400"
								>Тонкое ЧПУ точение, развертывание отверстий</td
							>
						</tr>
						<tr>
							<td class="px-4 py-3 font-sans font-bold text-zinc-300">IT8 (Повышенный)</td>
							<td class="px-4 py-3 text-white">39 мкм (±0.020 мм)</td>
							<td class="px-4 py-3 text-amber-400">Ra 1.6 – 3.2 мкм</td>
							<td class="px-4 py-3 font-sans text-zinc-400">Чистовое ЧПУ фрезерование и точение</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-sans font-bold text-zinc-300">IT9 – IT10 (Средний)</td>
							<td class="px-4 py-3 text-white">62 – 100 мкм</td>
							<td class="px-4 py-3 text-amber-400">Ra 3.2 – 6.3 мкм</td>
							<td class="px-4 py-3 font-sans text-zinc-400"
								>Получистовая обработка, сверление спиральными сверлами</td
							>
						</tr>
						<tr>
							<td class="px-4 py-3 font-sans font-bold text-zinc-400">IT11 – IT12 (Свободный)</td>
							<td class="px-4 py-3 text-white">160 – 250 мкм</td>
							<td class="px-4 py-3 text-amber-400">Ra 6.3 – 12.5 мкм</td>
							<td class="px-4 py-3 font-sans text-zinc-400"
								>Черновое обдирочное резание, ленточнопильный рез</td
							>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Technical Deep Dive -->
			<div class="space-y-6 text-sm leading-relaxed text-zinc-300">
				<h2 class="text-xl font-bold text-white">
					1. Почему невозможно получить IT6 обычным точением на серийном станке?
				</h2>
				<p>
					Даже самый современный токарный станок с ЧПУ имеет динамические микроколебания шпинделя,
					термическое удлинение станины при нагреве гидравлики (до 0.010–0.015 мм за смену) и
					постепенный износ режущей кромки пластины. Для удержания допуска в пределах 16 мкм в серии
					из 100 деталей оператор был бы вынужден подналаживать корректоры после каждой второй
					детали. Поэтому во всем мировом машиностроении квалитет IT6 получается исключительно на
					специализированных круглошлифовальных станках с калиброванными корундовыми кругами и
					обильным охлаждением.
				</p>

				<h2 class="text-xl font-bold text-white">2. Шероховатость Ra: микрогеометрия контакта</h2>
				<p>
					Шероховатость поверхности <span class="font-mono text-amber-400">Ra</span> (среднее арифметическое
					отклонение профиля) прямо определяет износ сопряженных узлов. Для неподвижных соединений (натяг
					под прессовую посадку) достаточно Ra 1.6–3.2 мкм. Однако для подвижных пар трения (вращение
					вала в бронзовой втулке или контакт штока с полиуретановой манжетой гидравлики) микронеровности
					более Ra 0.8 мкм действуют как микрорезцы, разрезая уплотнители за десятки часов работы.
				</p>

				<h2 class="text-xl font-bold text-white">
					3. Метрологический контроль в лаборатории MetalProm39
				</h2>
				<p>
					В нашем цехе соответствие квалитетам проверяется в термостатированном помещении (+20°C
					±1°C) приборами <strong class="text-white">Mitutoyo (Япония)</strong>: цифровыми
					микрометрами с дискретностью 1 мкм и контактным профилометром Surftest SJ-210. Данные
					измерений протоколируются и вносятся в паспорт качества изделия, выдаваемый вместе с
					отгрузочной партией.
				</p>
			</div>

			<!-- Contextual Cross Links -->
			<div class="mt-10 rounded-lg border border-zinc-800 bg-zinc-900/40 p-5">
				<h3 class="font-bold text-white">Связанные разделы сайта:</h3>
				<div class="mt-3 flex flex-wrap gap-4 font-mono text-xs">
					<a
						href="/kontrol-kachestva-i-oborudovanie/"
						class="text-amber-400 hover:text-amber-300 hover:underline"
					>
						→ Лаборатория ОТК и приборы Mitutoyo
					</a>
					<a
						href="/zuboreznye-i-shlifovalnye-raboty/"
						class="text-amber-400 hover:text-amber-300 hover:underline"
					>
						→ Круглое шлифование до IT6
					</a>
					<a
						href="/kalkulyator-stoimosti-chpu/"
						class="text-amber-400 hover:text-amber-300 hover:underline"
					>
						→ Расчет стоимости с надбавкой за точность
					</a>
				</div>
			</div>
		</article>
	</div>
</main>
