<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [{ name: 'Портфолио', path: '/portfolio/' }];

	const cases = [
		{
			id: 'marine-shaft',
			title: 'Вал гребного привода вспомогательного судна с бронзовой втулкой',
			clientSector: 'Судоремонт и портовый флот (г. Светлый)',
			material: 'Легированная сталь 40Х + бронзовая гильза БрАЖ9-4',
			dimensions: '⌀65 мм × длина 680 мм',
			tolerances: 'Квалитет IT7 (шейки вала шлифованные до IT6, Ra 0.4 мкм)',
			batch: '4 шт. (мелкосерийная аварийная замена)',
			leadTime: '5 рабочих дней',
			operations: [
				'Черновое и чистовое ЧПУ точение',
				'Круглое шлифование шеек под подшипники',
				'Фрезерование шпоночных пазов',
				'Горячая запрессовка бронзовой втулки'
			],
			description:
				'Изготовление гребного валопровода взамен выработавшего ресурс оригинального узла иностранного производства. Проведен входной ультразвуковой контроль сплошности заготовки и инструментальная проверка радиального биения на призмах (не более 0.006 мм).'
		},
		{
			id: 'hydraulic-pin',
			title: 'Палец гидроцилиндра стрелы экскаватора с ТВЧ-закалкой',
			clientSector: 'Дорожно-строительная спецтехника (г. Гурьевск)',
			material: 'Конструкционная сталь 45 ГОСТ 1050-2013',
			dimensions: '⌀80 мм × длина 340 мм',
			tolerances: 'Квалитет IT7, посадка f7, твердость слоя 52–55 HRCэ',
			batch: '16 шт. (серийный ремонтный комплект)',
			leadTime: '4 рабочих дня',
			operations: [
				'Токарная ЧПУ обработка',
				'Глубокое сверление осевого и радиальных смазочных каналов',
				'Закалка токами высокой частоты (глубина 2.5 мм)',
				'Бесцентровое финишное шлифование'
			],
			description:
				'Серийный выпуск тяжелонагруженных пальцев для гидравлических экскаваторов. Поверхностный слой защищает от абразивного износа песком и грунтом, а вязкая незакаленная сердцевина предотвращает хрупкий излом при ударных нагрузках.'
		},
		{
			id: 'electronic-enclosure',
			title: 'Герметичный фрезерованный корпус судового навигационного контроллера',
			clientSector: 'Морское приборостроение (г. Калининград)',
			material: 'Авиационный алюминиевый сплав Д16Т ГОСТ 4784-97',
			dimensions: '220 × 160 × 65 мм (выборка внутреннего кармана 85%)',
			tolerances: 'IT8, плоскостность привалочной поверхности 0.015 мм',
			batch: '25 шт. (установочная серия)',
			leadTime: '6 рабочих дней',
			operations: [
				'3-осевое высокоскоростное фрезерование (HSM)',
				'Прецизионная выборка канавки под O-Ring уплотнение',
				'Сверление и нарезание глухой резьбы М3 и М4',
				'Дробеструйная матировка и химическое оксидирование'
			],
			description:
				'Фрезерование монолитных корпусов из цельной плиты Д16Т. Обеспечена 100% герметичность при погружении (стандарт IP67) за счет стабильного прижима крышки и отсутствия коробления тонких стенок (толщина перемычек 2.5 мм).'
		},
		{
			id: 'gearbox-gear',
			title: 'Косозубая цилиндрическая шестерня привода кормораздатчика',
			clientSector: 'Агропромышленный комплекс (г. Черняховск)',
			material: 'Сталь 40Х с объемным улучшением и ТВЧ венца',
			dimensions: 'Венец ⌀180 мм, ширина 45 мм, модуль m=4.0, число зубьев z=43',
			tolerances: '7-я степень точности по ГОСТ 1643-81, шлицевое отверстие 8×36×42',
			batch: '10 шт.',
			leadTime: '7 рабочих дней',
			operations: [
				'Токарная подготовка зубчатого колеса',
				'Зубофрезерование червячной модульной фрезой',
				'Долбление прямобочных шлицев',
				'Закалка зубьев ТВЧ и контроль пятна контакта'
			],
			description:
				'Импортозамещение зубчатой передачи европейского кормораздатчика. Реверс-инжиниринг выполнен технологами цеха по изношенному образцу с расчетом угла наклона зуба и геометрии эвольвенты.'
		}
	];
</script>

<svelte:head>
	<title>Портфолио деталей ЧПУ и примеры работ в Калининграде | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Примеры изготовленных деталей на ЧПУ станках в Калининграде: гребные валы, пальцы гидроцилиндров с ТВЧ, корпуса из Д16Т, шестерни редукторов. Реальные допуски и сроки."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<header class="max-w-4xl border-b border-zinc-800 pb-8">
			<div
				class="inline-flex items-center gap-2 rounded border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-semibold text-amber-400 uppercase"
			>
				<span>📁</span> Промышленные кейсы цеха
			</div>
			<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
				Портфолио деталей и реализованных проектов механообработки в Калининграде
			</h1>
			<p class="mt-4 text-base leading-relaxed text-zinc-300">
				Примеры выполненных заказов механического цеха {siteConfig.brandName}. Мы изготавливаем
				ответственные узлы и корпусные элементы по конструкторской документации (КД) заказчиков с
				предоставлением паспортов изделий и сертификатов соответствия на металл.
			</p>
		</header>

		<!-- Case Studies List -->
		<div class="mt-10 space-y-10">
			{#each cases as item}
				<article
					class="rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-zinc-700 md:p-8"
				>
					<div
						class="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-4"
					>
						<span
							class="rounded border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-amber-400"
						>
							{item.clientSector}
						</span>
						<span class="font-mono text-xs text-zinc-400">Срок: {item.leadTime}</span>
					</div>

					<h2 class="mt-4 text-xl font-bold text-white sm:text-2xl">{item.title}</h2>
					<p class="mt-3 text-sm leading-relaxed text-zinc-400">{item.description}</p>

					<!-- Technical Specs Sheet (Hallmark Data Density) -->
					<div class="mt-6 grid grid-cols-1 gap-4 font-mono text-xs sm:grid-cols-2 lg:grid-cols-4">
						<div class="rounded border border-zinc-900 bg-zinc-900/60 p-3">
							<div class="text-zinc-500">Материал:</div>
							<div class="mt-1 font-bold text-zinc-200">{item.material}</div>
						</div>
						<div class="rounded border border-zinc-900 bg-zinc-900/60 p-3">
							<div class="text-zinc-500">Габариты детали:</div>
							<div class="mt-1 font-bold text-amber-400">{item.dimensions}</div>
						</div>
						<div class="rounded border border-zinc-900 bg-zinc-900/60 p-3">
							<div class="text-zinc-500">Точность / Квалитет:</div>
							<div class="mt-1 font-bold text-emerald-400">{item.tolerances}</div>
						</div>
						<div class="rounded border border-zinc-900 bg-zinc-900/60 p-3">
							<div class="text-zinc-500">Объем партии:</div>
							<div class="mt-1 font-bold text-white">{item.batch}</div>
						</div>
					</div>

					<!-- Operations Sequence -->
					<div class="mt-5 border-t border-zinc-900 pt-4">
						<div class="font-mono text-xs text-zinc-400">Маршрут технологической обработки:</div>
						<div class="mt-2 flex flex-wrap gap-2">
							{#each item.operations as op}
								<span
									class="rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] text-zinc-300"
								>
									{op}
								</span>
							{/each}
						</div>
					</div>
				</article>
			{/each}
		</div>

		<!-- Cross-Links & Navigation -->
		<section class="mt-16 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
			<h2 class="text-base font-bold text-white">Разделы услуг по видам обработки:</h2>
			<div class="mt-4 grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-3">
				<a
					href="/tokarnye-raboty-chpu/"
					class="rounded border border-zinc-800 bg-zinc-950 p-3 text-zinc-300 transition-colors hover:border-amber-500 hover:text-white"
				>
					<span class="block font-bold text-amber-400">Токарная ЧПУ обработка</span>
					<span class="mt-1 block text-zinc-500">Валы, оси, пальцы, штуцеры</span>
				</a>
				<a
					href="/frezernye-raboty-chpu/"
					class="rounded border border-zinc-800 bg-zinc-950 p-3 text-zinc-300 transition-colors hover:border-amber-500 hover:text-white"
				>
					<span class="block font-bold text-amber-400">Фрезерная ЧПУ обработка</span>
					<span class="mt-1 block text-zinc-500">Корпуса, плиты, кронштейны</span>
				</a>
				<a
					href="/zuboreznye-i-shlifovalnye-raboty/"
					class="rounded border border-zinc-800 bg-zinc-950 p-3 text-zinc-300 transition-colors hover:border-amber-500 hover:text-white"
				>
					<span class="block font-bold text-amber-400">Зуборезка и шлифовка</span>
					<span class="mt-1 block text-zinc-500">Шестерни, шлицы, чистовая доводка</span>
				</a>
			</div>
		</section>

		<!-- Bottom CTA -->
		<section class="mt-12 rounded-xl border border-amber-500/40 bg-zinc-900 p-8 text-center">
			<h2 class="text-xl font-bold text-white">Требуется изготовление аналогичных деталей?</h2>
			<p class="mt-2 text-sm text-zinc-400">
				Пришлите чертеж или эскиз на расчет. Главный технолог подготовит коммерческое предложение с
				разбивкой по этапам в течение 3 часов.
			</p>
			<div class="mt-6 flex flex-wrap items-center justify-center gap-4">
				<a
					href="/kalkulyator-stoimosti-chpu/"
					class="rounded border border-amber-500 bg-amber-500 px-6 py-2.5 font-mono text-xs font-bold text-zinc-950 transition-colors hover:bg-amber-400"
				>
					⚡ Рассчитать в онлайн-калькуляторе
				</a>
				<a
					href="mailto:{siteConfig.contactEmail}"
					class="rounded border border-zinc-700 bg-zinc-800 px-6 py-2.5 font-mono text-xs font-semibold text-zinc-200 transition-colors hover:border-zinc-600 hover:text-white"
				>
					✉️ Отправить чертежи на {siteConfig.contactEmail}
				</a>
			</div>
		</section>
	</div>
</main>
