<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [
		{ name: 'Контроль качества и оборудование', path: '/kontrol-kachestva-i-oborudovanie/' }
	];

	const metrology = [
		{
			name: 'Цифровой микрометр Mitutoyo QuantuMike (Япония)',
			range: '0 – 25 мм / 25 – 50 мм',
			accuracy: 'Дискретность 0.001 мм, погрешность ±1 мкм'
		},
		{
			name: 'Индикатор часового типа Mitutoyo с магнитной стойкой',
			range: '0 – 10 мм',
			accuracy: 'Цена деления 0.001 мм, контроль радиального биения'
		},
		{
			name: 'Портативный профилометр шероховатости Surftest SJ-210',
			range: 'Ra 0.05 – 40 мкм, Rz 0.1 – 160 мкм',
			accuracy: 'Алмазный щуп 2 мкм, стандарт ISO 1997 / ГОСТ 2789-73'
		},
		{
			name: 'Электронный нутромер Mitutoyo Holtest (трехточечный)',
			range: '⌀12 – 100 мм',
			accuracy: 'Погрешность ±0.002 мм, замер глубоких глухих отверстий'
		},
		{
			name: 'Калибры гладкие проходные/непроходные (ПР-НЕ)',
			range: 'Ряды квалитетов H7, H8, h6, f7',
			accuracy: 'Поверка ВНИИМС, калибровка 2026 г.'
		},
		{
			name: 'Калибры резьбовые метрические и трубные (М, G)',
			range: 'М3 – М48, шаг 0.5 – 3.0 мм, резьбы G1/8" – G2"',
			accuracy: 'Класс точности 6g / 6H по ГОСТ 16093-2004'
		}
	];

	const machines = [
		{
			model: 'Токарно-револьверный обрабатывающий центр с ЧПУ (Fanuc 0i-TF)',
			category: 'Токарная группа',
			specs: 'Макс. диаметр ⌀320 мм, длина точения в центрах 750 мм, патрон ⌀210 мм',
			precision: 'Повторяемость позиционирования ±0.003 мм, гидропатрон Kitagawa',
			features:
				'12-позиционная револьверная головка BMT с быстрым временем смены инструмента (0.2 с)'
		},
		{
			model: 'Вертикальный фрезерный обрабатывающий центр (Siemens 828D)',
			category: 'Фрезерная группа',
			specs: 'Рабочий стол 900 × 500 мм, перемещения по осям X/Y/Z: 800 × 500 × 500 мм',
			precision: 'Оптические линейки с дискретностью 0.001 мм, точность позиционирования ±0.005 мм',
			features:
				'Шпиндель 10 000 об/мин (BT40) с прямой подачей СОЖ под давлением 20 бар через инструмент'
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

		<header class="border-b border-[var(--color-rule)] pb-8">
			<h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">
				Лаборатория ОТК и станочный парк цеха
			</h1>
			<p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
				Многоступенчатый контроль качества: входная проверка сырья, протокол FAI и паспорт ОТК с
				замерами приборами Mitutoyo на каждую партию.
			</p>
		</header>

		<!-- 3-Stage QC Protocol -->
		<section class="mt-10" aria-labelledby="qc-stages-heading">
			<h2 id="qc-stages-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">
				Трехэтапный протокол входного, межоперационного и выходного контроля
			</h2>
			<div class="mt-6 grid grid-cols-1 gap-6 text-xs leading-relaxed md:grid-cols-3">
				<div class="well">
					<div
						class="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] font-mono text-xs text-[var(--color-ink)]"
					>
						1
					</div>
					<h3 class="mt-3 text-sm font-normal text-[var(--color-ink)]">Входной контроль сырья</h3>
					<p class="mt-2 text-[var(--color-muted)]">
						100% заготовок проверяются на соответствие сертификатам заводов-изготовителей
						(Северсталь, НЛМК, Мечел). Визуальный осмотр на отсутствие внутренних раковин и трещин.
					</p>
				</div>
				<div class="well">
					<div
						class="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] font-mono text-xs text-[var(--color-ink)]"
					>
						2
					</div>
					<h3 class="mt-3 text-sm font-normal text-[var(--color-ink)]">
						First Article Inspection (FAI)
					</h3>
					<p class="mt-2 text-[var(--color-muted)]">
						Перед запуском серийной партии станок останавливается после изготовления первой детали.
						Инженер ОТК проводит полный обмер по чертежу и подписывает лист FAI.
					</p>
				</div>
				<div class="well">
					<div
						class="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] font-mono text-xs text-[var(--color-ink)]"
					>
						3
					</div>
					<h3 class="mt-3 text-sm font-normal text-[var(--color-ink)]">
						Выходной контроль и паспорт
					</h3>
					<p class="mt-2 text-[var(--color-muted)]">
						Выборочный или 100% обмер готовых деталей с оформлением протокола измерений (паспорта
						ОТК). Консервация деталей в ингибированную бумагу от морского климата.
					</p>
				</div>
			</div>
		</section>

		<!-- Metrology Lab Equipment Table -->
		<section class="mt-14" aria-labelledby="metrology-heading">
			<h2 id="metrology-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">
				Лаборатория измерительного инструмента и метрологии
			</h2>
			<div class="mt-4 overflow-x-auto">
				<table class="v-table">
					<thead>
						<tr>
							<th>Наименование прибора</th>
							<th>Диапазон измерений</th>
							<th>Погрешность / Характеристики</th>
						</tr>
					</thead>
					<tbody>
						{#each metrology as item}
							<tr>
								<td class="font-normal text-[var(--color-ink)]">{item.name}</td>
								<td class="num text-[var(--color-ink)]">{item.range}</td>
								<td class="text-[var(--color-muted)]">{item.accuracy}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>

		<!-- Machine Park Table -->
		<section class="mt-14" aria-labelledby="machine-park-heading">
			<h2 id="machine-park-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">
				Станочный парк производственного цеха
			</h2>
			<div class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
				{#each machines as machine}
					<div class="well">
						<div class="flex items-center justify-between border-b border-[var(--color-rule)] pb-2">
							<span class="text-xs text-[var(--color-muted)]">{machine.category}</span>
							<span class="num text-[11px] text-[var(--color-muted)]">{machine.precision}</span>
						</div>
						<h3 class="mt-2 text-sm font-normal text-[var(--color-ink)]">{machine.model}</h3>
						<p class="num mt-2 text-xs text-[var(--color-ink-2)]">{machine.specs}</p>
						<p class="mt-1 text-xs text-[var(--color-muted)]">{machine.features}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- B2B Contract Guarantee Banner -->
		<section class="well mt-14">
			<h2 class="text-sm font-normal text-[var(--color-ink)]">
				Документальное сопровождение для юрлиц:
			</h2>
			<ul class="mt-3 grid grid-cols-1 gap-2 text-xs text-[var(--color-muted)] sm:grid-cols-2">
				<li class="flex items-center gap-2">
					<span class="live-dot" aria-hidden="true"></span>
					<span>Договор поставки металлоизделий с фиксированной ценой</span>
				</li>
				<li class="flex items-center gap-2">
					<span class="live-dot" aria-hidden="true"></span>
					<span>Универсальный передаточный документ (УПД с НДС 20%)</span>
				</li>
				<li class="flex items-center gap-2">
					<span class="live-dot" aria-hidden="true"></span>
					<span>Паспорт изделия с фактическими замерами ОТК</span>
				</li>
				<li class="flex items-center gap-2">
					<span class="live-dot" aria-hidden="true"></span>
					<span>Копии заводских сертификатов на металл (ГОСТ)</span>
				</li>
			</ul>
		</section>
	</div>
</main>
