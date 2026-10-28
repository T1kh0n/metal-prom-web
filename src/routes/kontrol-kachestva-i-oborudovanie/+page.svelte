<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [
		{ name: 'ОТК и станочный парк', path: '/kontrol-kachestva-i-oborudovanie/' }
	];

	const machines = [
		{
			category: 'Токарная группа',
			model: 'Токарно-револьверный обрабатывающий центр ЧПУ',
			specs: 'Патрон ⌀210 мм, макс. диаметр точения 320 мм, длина до 750 мм, шпиндель 4 500 об/мин',
			precision: 'Позиционирование ±0.005 мм, квалитет IT7–IT8',
			features: '12-позиционная револьверная головка с жесткой фиксацией инструмента VDI/BMT'
		},
		{
			category: 'Фрезерная группа (3 оси)',
			model: 'Вертикальный обрабатывающий центр с ЧПУ',
			specs:
				'Рабочий стол 900 × 500 мм, перемещения 800 × 500 × 500 мм, шпиндель BT40 10 000 об/мин',
			precision: 'Позиционирование ±0.005 мм, повторяемость ±0.003 мм',
			features: 'Оптическая измерительная система Renishaw OMP40-2 для контроля деталей в станке'
		},
		{
			category: 'Фрезерная группа (4-я ось)',
			model: 'Прецизионный поворотный ЧПУ делительный стол',
			specs: 'Диаметр планшайбы ⌀200 мм, дискретность угла 0.001°',
			precision: 'Угловая погрешность не более 15 угловых секунд',
			features: 'Синхронная 4-осевая интерполяция для винтовых канавок и многогранных деталей'
		},
		{
			category: 'Шлифовальная группа',
			model: 'Круглошлифовальный станок высокой точности',
			specs: 'Диаметр шлифования до 200 мм, длина в центрах до 800 мм',
			precision: 'Достижимый квалитет IT6, шероховатость Ra 0.4 мкм',
			features: 'Прецизионный гидродинамический шпиндель для зеркальной доводки шеек валов'
		},
		{
			category: 'Плоскошлифовальная группа',
			model: 'Плоскошлифовальный станок с крестовым столом',
			specs: 'Зеркало электромагнитной плиты 800 × 320 мм, макс. нагрузка 350 кг',
			precision: 'Непараллельность поверхностей до 0.005 мм на 500 мм длины',
			features: 'Чистовое шлифование направляющих, плит кондукторов, промышленных ножей'
		},
		{
			category: 'Зуборезная группа',
			model: 'Зубофрезерный станок для цилиндрических колес',
			specs: 'Максимальный диаметр нарезаемого колеса 500 мм, модуль m1.0 – m8.0',
			precision: '7-я и 8-я степень точности по ГОСТ 1643-81',
			features: 'Нарезание прямозубых, косозубых колес и приводных цепных звездочек'
		},
		{
			category: 'Заготовительный участок',
			model: 'Полуавтоматический двухколонный ленточнопильный станок',
			specs: 'Гидравлический рез круглого проката до ⌀320 мм и профильных труб',
			precision: 'Перпендикулярность торца ±0.2 мм',
			features: 'Интенсивная подача СОЖ, минимальный припуск под последующую торцовку'
		}
	];

	const metrology = [
		{
			name: 'Микрометры гладкие цифровые Mitutoyo (Япония)',
			range: '0–25 мм, 25–50 мм, 50–75 мм, 75–100 мм',
			accuracy: 'Дискретность 0.001 мм, абсолютный энкодер Digimatic'
		},
		{
			name: 'Нутромеры индикаторные и 3-точечные Mitutoyo',
			range: '10–18 мм, 18–50 мм, 50–100 мм',
			accuracy: 'Погрешность не более ±0.002 мм при контроле посадок подшипников'
		},
		{
			name: 'Профилометр контактный Mitutoyo Surftest SJ-210',
			range: 'Измерение параметров шероховатости Ra, Rz, Rq, Rt',
			accuracy: 'Разрешение 0.001 мкм, распечатка графиков профиля поверхности'
		},
		{
			name: 'Твердомер динамический портативный ТКМ-459С',
			range: 'Шкалы Роквелла (HRC), Бринелля (HB), Виккерса (HV)',
			accuracy: 'Контроль твердости термообработанных слоев после закалки ТВЧ'
		},
		{
			name: 'Гранитная поверочная плита I класса точности',
			range: 'Габариты 1000 × 630 × 150 мм',
			accuracy: 'Отклонение от плоскостности не более 4 мкм по ГОСТ 10905-86'
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
				class="inline-flex items-center gap-2 rounded border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-semibold text-amber-400 uppercase"
			>
				<span>🛡️</span> Стандарты метрологии и ОТК
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
						class="inline-flex h-7 w-7 items-center justify-center rounded border border-amber-500/30 bg-amber-500/10 font-mono text-sm font-bold text-amber-400"
					>
						1
					</div>
					<h3 class="mt-3 font-mono text-sm font-bold text-white">Входной контроль сырья</h3>
					<p class="mt-2 text-zinc-400">
						100% заготовок проверяются на соответствие сертификатам заводов-изготовителей
						(Северсталь, НЛМК, Мечел). Проводится визуальный осмотр на отсутствие внутренних
						раковин, закатов и поверхностных трещин перед раскроем на ленточнопильном станке.
					</p>
				</div>
				<div class="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
					<div
						class="inline-flex h-7 w-7 items-center justify-center rounded border border-amber-500/30 bg-amber-500/10 font-mono text-sm font-bold text-amber-400"
					>
						2
					</div>
					<h3 class="mt-3 font-mono text-sm font-bold text-white">
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
						class="inline-flex h-7 w-7 items-center justify-center rounded border border-amber-500/30 bg-amber-500/10 font-mono text-sm font-bold text-amber-400"
					>
						3
					</div>
					<h3 class="mt-3 font-mono text-sm font-bold text-white">Выходной контроль и паспорт</h3>
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
				<table class="w-full text-left font-mono text-xs text-zinc-300">
					<thead class="border-b border-zinc-800 bg-zinc-900/80 text-zinc-400 uppercase">
						<tr>
							<th class="px-4 py-3">Наименование прибора</th>
							<th class="px-4 py-3">Диапазон измерений</th>
							<th class="px-4 py-3">Погрешность / Характеристики</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-800/60">
						{#each metrology as item}
							<tr>
								<td class="px-4 py-3 font-sans font-medium text-zinc-200">{item.name}</td>
								<td class="px-4 py-3 text-amber-400">{item.range}</td>
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
							<span class="font-mono text-xs font-bold text-amber-400 uppercase"
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
			<ul class="mt-3 grid grid-cols-1 gap-2 font-mono text-xs text-zinc-300 sm:grid-cols-2">
				<li class="flex items-center gap-2">
					<span class="text-emerald-400">✓</span> Договор поставки металлоизделий с фиксированной ценой
				</li>
				<li class="flex items-center gap-2">
					<span class="text-emerald-400">✓</span> Универсальный передаточный документ (УПД с НДС 20%)
				</li>
				<li class="flex items-center gap-2">
					<span class="text-emerald-400">✓</span> Паспорт изделия с фактическими замерами ОТК
				</li>
				<li class="flex items-center gap-2">
					<span class="text-emerald-400">✓</span> Копии заводских сертификатов на металл (ГОСТ)
				</li>
			</ul>
		</section>
	</div>
</main>
