<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [
		{ name: 'ОТК и оборудование', path: '/kontrol-kachestva-i-oborudovanie/' }
	];

	const metrology = [
		{
			name: 'Микрометры цифровые гладкие Mitutoyo QuantuMike (IP65)',
			range: '0–25 мм, 25–50 мм, 50–75 мм, 75–100 мм',
			accuracy: 'Погрешность ±0.001 мм, дискретность 0.001 мм'
		},
		{
			name: 'Штангенциркули прецизионные Mitutoyo Digimatic',
			range: '0–150 мм, 0–300 мм, 0–600 мм',
			accuracy: 'Погрешность ±0.02 мм, защита IP67 от СОЖ'
		},
		{
			name: 'Нутрометры индикаторные и микрометрические',
			range: 'Диаметр отверстий от 18 до 160 мм',
			accuracy: 'Цена деления 0.002 мм, поверка колец по ГОСТ'
		},
		{
			name: 'Профилометр портативный Mitutoyo Surftest SJ-210',
			range: 'Шероховатость Ra 0.05 – 16.0 мкм, Rz 0.1 – 100 мкм',
			accuracy: 'Алмазная игла 2 мкм, протокол измерений с графиком'
		},
		{
			name: 'Набор концевых мер длины (КМД) класс 1 (ГОСТ 9038)',
			range: '83 меры из легированной стали',
			accuracy: 'Эталон для калибровки цеховых микрометров'
		}
	];

	const machines = [
		{
			model: 'Токарный обрабатывающий центр с ЧПУ (Fanuc 0i-TF)',
			category: 'Токарная группа',
			specs: 'Патрон ⌀210 мм, макс. диаметр точения 320 мм, длина до 750 мм, шпиндель 4 500 об/мин',
			precision: 'Позиционирование ±0.005 мм, револьверная головка на 12 позиций (BMT45)',
			features: 'Жесткая чугунная наклонная станина (45°), автоматический стружкоуборочный конвейер'
		},
		{
			model: 'Токарно-винторезный станок повышенной точности (ЧПУ Балт-Систем)',
			category: 'Токарная группа',
			specs: 'Диаметр обработки над станиной 400 мм, длина заготовки в центрах до 1000 мм',
			precision: 'Квалитет точности IT7, нарезание любых типов резьб (метрическая, дюймовая, трапеция)',
			features: 'Оснащен механизированным люнетом для точения длинных гребных валов без биения'
		},
		{
			model: 'Вертикальный фрезерный обрабатывающий центр (Siemens 828D)',
			category: 'Фрезерная группа',
			specs: 'Рабочий стол 900 × 500 мм, перемещения по осям X/Y/Z: 800 × 500 × 500 мм',
			precision: 'Оптические линейки с дискретностью 0.001 мм, точность позиционирования ±0.005 мм',
			features: 'Шпиндель 10 000 об/мин (BT40) с прямой подачей СОЖ под давлением 20 бар через инструмент'
		},
		{
			model: 'Координатно-поворотный стол (4-я ось ЧПУ)',
			category: 'Фрезерная группа',
			specs: 'Диаметр планшайбы ⌀200 мм, дискретность угла 0.001°',
			precision: 'Интегрирован в ЧПУ стойку для непрерывной 4D фрезерной обработки',
			features: 'Обработка радиальных пазов, шпонок, шлицев и многогранных корпусов за один установ'
		},
		{
			model: 'Зубофрезерный станок для цилиндрических колес',
			category: 'Зуборезная группа',
			specs: 'Максимальный диаметр нарезаемого колеса 500 мм, модули зубьев от m1.0 до m8.0',
			precision: '7-я и 8-я степень точности зубчатых передач по ГОСТ 1643-81',
			features: 'Нарезание прямозубых, косозубых шестерен и венцов червячных передач'
		},
		{
			model: 'Круглошлифовальный полуавтомат высокой точности',
			category: 'Шлифовальная группа',
			specs: 'Максимальный диаметр шлифования 200 мм, длина заготовки до 800 мм',
			precision: 'Квалитет IT6, шероховатость поверхности шейки вала до Ra 0.2–0.4 мкм',
			features: 'Оснащен прибором активного контроля для автоматического выдерживания допуска'
		},
		{
			model: 'Плоскошлифовальный станок с прямоугольным столом',
			category: 'Шлифовальная группа',
			specs: 'Размер электромагнитной плиты 800 × 320 мм, высота шлифования до 400 мм',
			precision: 'Плоскостность и параллельность поверхностей не более 0.005 мм на длине 500 мм',
			features: 'Финишная доводка ножей гильотин, направляющих планок и сопрягаемых плит штампов'
		},
		{
			model: 'Автоматический двухколонный ленточнопильный станок',
			category: 'Заготовительный участок',
			specs: 'Гидравлический рез круглого проката до ⌀320 мм и профильных труб',
			precision: 'Перпендикулярность реза ±0.2 мм, минимальная ширина пропила 1.1 мм',
			features: 'Экономия расхода дорогостоящих легированных и нержавеющих сталей'
		}
	];
</script>

<svelte:head>
	<title>Контроль качества (ОТК) и станочный парк ЧПУ | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Лаборатория ОТК, приборы Mitutoyo, паспорт качества на каждую партию. Станочный парк ЧПУ цеха MetalProm39 в Калининграде: токарные, фрезерные 4-оси, шлифовальные станки."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<header class="max-w-4xl border-b border-zinc-800 pb-8">
			<div
				class="inline-flex items-center rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-1 font-mono text-xs font-medium text-zinc-300"
			>
				<span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
				Стандарты метрологии и ОТК
			</div>
			<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
				Контроль качества (ОТК), метрология и станочный парк ЧПУ в Калининграде
			</h1>
			<p class="mt-4 text-base leading-relaxed text-zinc-300">
				Многоступенчатая система контроля качества в цехе {siteConfig.brandName} исключает передачу брака
				заказчику. Каждая изготовленная серийная партия сопровождается паспортом изделия с фактическими
				замерами линейных размеров, биения и шероховатости.
			</p>
		</header>

		<!-- 3-Stage QC Protocol -->
		<section class="mt-10" aria-labelledby="qc-stages-heading">
			<h2 id="qc-stages-heading" class="text-xl font-bold tracking-tight text-white sm:text-2xl">
				Трехэтапный протокол входного, межоперационного и выходного контроля
			</h2>
			<div class="mt-6 grid grid-cols-1 gap-6 text-xs leading-relaxed md:grid-cols-3">
				<div class="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
					<div
						class="inline-flex h-7 w-7 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 font-mono text-sm font-bold text-zinc-100"
					>
						1
					</div>
					<h3 class="mt-3 font-semibold text-sm text-white">Входной контроль сырья</h3>
					<p class="mt-2 text-zinc-400">
						100% заготовок проверяются на соответствие сертификатам заводов-изготовителей
						(Северсталь, НЛМК, Мечел). Проводится визуальный осмотр на отсутствие внутренних
						раковин, закатов и поверхностных трещин перед раскроем на ленточнопильном станке.
					</p>
				</div>
				<div class="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
					<div
						class="inline-flex h-7 w-7 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 font-mono text-sm font-bold text-zinc-100"
					>
						2
					</div>
					<h3 class="mt-3 font-semibold text-sm text-white">
						First Article Inspection (FAI)
					</h3>
					<p class="mt-2 text-zinc-400">
						Перед запуском серийной партии станок останавливается после изготовления первой детали.
						Инженер ОТК проводит полный обмер всех критических параметров по чертежу. Только после
						подписи листа FAI оператор получает допуск к серийному циклу.
					</p>
				</div>
				<div class="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
					<div
						class="inline-flex h-7 w-7 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 font-mono text-sm font-bold text-zinc-100"
					>
						3
					</div>
					<h3 class="mt-3 font-semibold text-sm text-white">Выходной контроль и паспорт</h3>
					<p class="mt-2 text-zinc-400">
						Выборочный или 100% обмер готовых деталей с оформлением протокола измерений (паспорта
						ОТК). Консервация деталей в ингибированную бумагу с нанесением консервационной смазки от
						коррозии в условиях морского климата Калининграда.
					</p>
				</div>
			</div>
		</section>

		<!-- Metrology Lab Equipment Table -->
		<section class="mt-14" aria-labelledby="metrology-heading">
			<h2 id="metrology-heading" class="text-xl font-bold tracking-tight text-white sm:text-2xl">
				Лаборатория измерительного инструмента и метрологии
			</h2>
			<div class="mt-4 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950">
				<table class="w-full text-left text-xs text-zinc-300">
					<thead class="border-b border-zinc-800 bg-zinc-900/80 font-mono text-zinc-400 uppercase">
						<tr>
							<th class="px-4 py-3">Наименование прибора</th>
							<th class="px-4 py-3">Диапазон измерений</th>
							<th class="px-4 py-3">Погрешность / Характеристики</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-800/60">
						{#each metrology as item}
							<tr>
								<td class="px-4 py-3 font-medium text-zinc-200">{item.name}</td>
								<td class="px-4 py-3 font-mono text-zinc-100">{item.range}</td>
								<td class="px-4 py-3 text-zinc-400">{item.accuracy}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>

		<!-- Machine Park Table -->
		<section class="mt-14" aria-labelledby="machine-park-heading">
			<h2 id="machine-park-heading" class="text-xl font-bold tracking-tight text-white sm:text-2xl">
				Станочный парк производственного цеха
			</h2>
			<div class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
				{#each machines as machine}
					<div class="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
						<div class="flex items-center justify-between border-b border-zinc-900 pb-2">
							<span class="font-mono text-xs font-semibold text-zinc-300 uppercase"
								>{machine.category}</span
							>
							<span class="font-mono text-[11px] text-emerald-400">{machine.precision}</span>
						</div>
						<h3 class="mt-2 text-sm font-bold text-white">{machine.model}</h3>
						<p class="mt-2 font-mono text-xs text-zinc-400">{machine.specs}</p>
						<p class="mt-2 text-xs text-zinc-500">{machine.features}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- B2B Contract Guarantee Banner -->
		<section class="mt-14 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
			<h2 class="text-base font-bold text-white">Документальное сопровождение для юрлиц:</h2>
			<ul class="mt-3 grid grid-cols-1 gap-2 text-xs text-zinc-300 sm:grid-cols-2">
				<li class="flex items-center">
					<span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 shrink-0"></span> Договор поставки металлоизделий с фиксированной ценой
				</li>
				<li class="flex items-center">
					<span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 shrink-0"></span> Универсальный передаточный документ (УПД с НДС 20%)
				</li>
				<li class="flex items-center">
					<span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 shrink-0"></span> Паспорт изделия с фактическими замерами ОТК
				</li>
				<li class="flex items-center">
					<span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 shrink-0"></span> Копии заводских сертификатов на металл (ГОСТ)
				</li>
			</ul>
		</section>
	</div>
</main>
