<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [{ name: 'Портфолио', path: '/portfolio/' }];

	const cases = [
		{
			title: 'Вал гребного винта вспомогательного катера',
			clientSector: 'Судостроение и судоремонт (г. Светлый)',
			material: 'Сталь 40Х с объемной термообработкой',
			dimensions: '⌀65 мм × длина 680 мм',
			tolerances: 'Квалитет IT7 (шейки под подшипники Ra 0.8)',
			batch: 'Серия 12 шт.',
			leadTime: '6 рабочих дней',
			operations: [
				'Токарная черновая обработка',
				'Термоулучшение (закалка + высокий отпуск)',
				'Чистовое точение шеек и конуса',
				'Фрезерование шпоночных пазов',
				'Контроль биения в центрах ОТК'
			],
			description:
				'Изготовление валопровода по чертежу заказчика с контролем радиального биения конусной посадки винта до 0.015 мм. Продукция сдана с паспортом изделия и протоколом ультразвукового контроля заготовок.'
		},
		{
			title: 'Фланец гидрозамка автокрана КС-55713',
			clientSector: 'Спецтехника и гидравлика (г. Калининград)',
			material: 'Конструкционная сталь 09Г2С',
			dimensions: '⌀160 мм × толщина 38 мм',
			tolerances: 'Посадочный поясок IT7, плоскостность 0.02 мм',
			batch: 'Партия 40 шт.',
			leadTime: '5 рабочих дней',
			operations: [
				'Токарная обработка наружного контура и канавки O-Ring',
				'Фрезерная координатная сверловка 8 отверстий М14',
				'Нарезание метрической резьбы на ЧПУ',
				'Входной и выходной контроль ОТК'
			],
			description:
				'Ответственный элемент гидросистемы высокого давления (до 32 МПа). Высокие требования к чистоте канавки под резиновое уплотнительное кольцо (Ra 1.6) для предотвращения разгерметизации рабочей жидкости.'
		},
		{
			title: 'Приборный корпус навигационного контроллера',
			clientSector: 'Приборостроение и морская электроника (г. Калининград)',
			material: 'Алюминиевый деформируемый сплав Д16Т',
			dimensions: '220 × 140 × 65 мм (глубина кармана 52 мм)',
			tolerances: 'Межосевые расстояния ±0.01 мм, допуск кармана IT8',
			batch: 'Серия 25 шт.',
			leadTime: '7 рабочих дней',
			operations: [
				'3D фрезерование глубокого кармана с толщиной стенки 2.5 мм',
				'Резьбонарезание глухих отверстий М3 и М4',
				'Фрезерование паза под герметизирующий шнур IP67',
				'Анодирование сертифицированное (кооперация)'
			],
			description:
				'Легкосплавный корпус бортового прибора с интегрированными ребрами охлаждения. Обработка выполнена монолитными твердосплавными фрезами с применением высокоскоростного фрезерования (HSM) для исключения коробления тонких стенок.'
		},
		{
			title: 'Шестерня привода зерноуборочного комбайна',
			clientSector: 'Агропромышленный комплекс (Гурьевский район)',
			material: 'Легированная цементуемая сталь 18ХГТ',
			dimensions: 'Венец ⌀180 мм, ширина 45 мм, модуль m=4.0, число зубьев z=43',
			tolerances: 'Степень точности 7-В по ГОСТ 1643-81',
			batch: 'Партия 16 шт.',
			leadTime: '8 рабочих дней',
			operations: [
				'Токарная проточка заготовки венца под нарезку',
				'Зубофрезерование червячной модульной фрезой',
				'Закалка ТВЧ рабочей поверхности зубьев (52–56 HRC)',
				'Круглое шлифование посадочного отверстия под подшипник'
			],
			description:
				'Срочное импортозамещение изношенного узла редуктора в период уборочной кампании. Изготовление произведено по предоставленному образцу (реверс-инжиниринг с замером профиля зуба и твердости металла).'
		}
	];
</script>

<svelte:head>
	<title>Портфолио деталей и кейсы механообработки в Калининграде | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Примеры изготовленных деталей с ЧПУ в Калининграде: гребные валы, гидравлические фланцы, алюминиевые корпуса, шестерни. Фотографии, допуски, сроки."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<header class="max-w-4xl border-b border-zinc-800 pb-8">
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
							class="rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-xs font-medium text-zinc-300"
						>
							{item.clientSector}
						</span>
						<span class="font-mono text-xs text-zinc-400">Срок: {item.leadTime}</span>
					</div>

					<h2 class="mt-4 text-xl font-bold text-white sm:text-2xl">{item.title}</h2>
					<p class="mt-3 text-sm leading-relaxed text-zinc-400">{item.description}</p>

					<!-- Technical Specs Sheet (Hallmark Data Density) -->
					<div class="mt-6 grid grid-cols-1 gap-4 font-mono text-xs sm:grid-cols-2 lg:grid-cols-4">
						<div class="rounded border border-zinc-800 bg-zinc-900/60 p-3">
							<div class="text-zinc-500">Материал:</div>
							<div class="mt-1 font-bold text-zinc-200">{item.material}</div>
						</div>
						<div class="rounded border border-zinc-800 bg-zinc-900/60 p-3">
							<div class="text-zinc-500">Габариты детали:</div>
							<div class="mt-1 font-bold text-zinc-100">{item.dimensions}</div>
						</div>
						<div class="rounded border border-zinc-800 bg-zinc-900/60 p-3">
							<div class="text-zinc-500">Точность / Квалитет:</div>
							<div class="mt-1 font-bold text-emerald-400">{item.tolerances}</div>
						</div>
						<div class="rounded border border-zinc-800 bg-zinc-900/60 p-3">
							<div class="text-zinc-500">Объем партии:</div>
							<div class="mt-1 font-bold text-white">{item.batch}</div>
						</div>
					</div>

					<!-- Operations Sequence -->
					<div class="mt-5 border-t border-zinc-900 pt-4">
						<div class="text-xs font-medium text-zinc-400">Маршрут технологической обработки:</div>
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
			<div class="mt-4 grid grid-cols-1 gap-3 text-xs sm:grid-cols-3">
				<a
					href="/tokarnye-raboty-chpu/"
					class="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
				>
					<span class="block font-medium text-zinc-200">Токарная ЧПУ обработка</span>
					<span class="mt-1 block text-zinc-400">Валы, оси, пальцы, штуцеры</span>
				</a>
				<a
					href="/frezernye-raboty-chpu/"
					class="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
				>
					<span class="block font-medium text-zinc-200">Фрезерная ЧПУ обработка</span>
					<span class="mt-1 block text-zinc-400">Корпуса, плиты, кронштейны</span>
				</a>
				<a
					href="/zuboreznye-i-shlifovalnye-raboty/"
					class="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
				>
					<span class="block font-medium text-zinc-200">Зуборезка и шлифовка</span>
					<span class="mt-1 block text-zinc-400">Шестерни, шлицы, чистовая доводка</span>
				</a>
			</div>
		</section>

		<!-- Bottom CTA -->
		<section class="mt-12 rounded-xl border border-zinc-800 bg-zinc-900/60 p-8 text-center">
			<h2 class="text-xl font-bold text-white">Требуется изготовление аналогичных деталей?</h2>
			<p class="mt-2 text-sm text-zinc-400">
				Пришлите чертеж или эскиз на расчет. Главный технолог подготовит коммерческое предложение с
				разбивкой по этапам в течение 3 часов.
			</p>
			<div class="mt-6 flex flex-wrap items-center justify-center gap-4">
				<a
					href="/kalkulyator-stoimosti-chpu/"
					class="rounded-md bg-zinc-100 px-4 py-2.5 text-xs font-medium text-zinc-950 shadow-sm transition-colors hover:bg-white"
				>
					Рассчитать в онлайн-калькуляторе
				</a>
				<a
					href="mailto:{siteConfig.contactEmail}"
					class="rounded-md border border-zinc-700 bg-zinc-900/60 px-4 py-2.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-800"
				>
					Отправить чертежи на {siteConfig.contactEmail}
				</a>
			</div>
		</section>
	</div>
</main>
