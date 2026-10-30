<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [{ name: 'Портфолио деталей', path: '/portfolio/' }];

	const cases = [
		{
			title: 'Вал гребной промежуточный с фланцем',
			clientSector: 'Судостроение и судоремонт (г. Светлый)',
			material: 'Сталь 40Х с объемной термообработкой',
			dimensions: 'Длина 620 мм, диаметр шейки ⌀85 мм, фланец ⌀160 мм',
			tolerances: 'Квалитет IT7 по шейкам подшипников (допуск ±0.015 мм)',
			batch: 'Партия 12 шт.',
			leadTime: '5 рабочих дней',
			operations: [
				'Черновое и чистовое точение на токарном станке с ЧПУ',
				'Фрезерование двух шпоночных пазов по ГОСТ 23360-78',
				'Круглое шлифование шеек под сальниковые уплотнения (Ra 0.4 мкм)',
				'Контроль радиального биения в центрах (не более 0.008 мм)'
			],
			description:
				'Ответственный вал передачи вращающего момента для судового дизель-генератора. Заказ выполнен в рамках срочной дефектации судна в сухом доке г. Светлый.'
		},
		{
			title: 'Фланец гидрораспределителя высокого давления',
			clientSector: 'Тяжелое машиностроение (г. Калининград)',
			material: 'Конструкционная низколегированная сталь 09Г2С',
			dimensions: '240 × 180 × 45 мм',
			tolerances: 'Квалитет IT8, отклонение от плоскостности не более 0.01 мм',
			batch: 'Партия 25 шт.',
			leadTime: '6 рабочих дней',
			operations: [
				'Фрезерование контура и сопрягаемой плоскости на 3-осевом центре',
				'Сверление и развертывание 8 крепежных отверстий ⌀18H8',
				'Расточка центрального посадочного отверстия ⌀90H7',
				'Фрезерование кольцевой канавки под уплотнительное кольцо O-Ring'
			],
			description:
				'Плита гидравлического коллектора. Критическое требование — идеальная плоскостность сопрягаемой поверхности для исключения утечек масла при давлении до 320 бар.'
		},
		{
			title: 'Корпус прибора судовой автоматики с оребрением',
			clientSector: 'Приборостроение (г. Калининград)',
			material: 'Авиационный алюминиевый сплав Д16Т (дюралюминий)',
			dimensions: '160 × 120 × 65 мм',
			tolerances: 'Квалитет IT7, толщина стенки карманов 2.5 ± 0.1 мм',
			batch: 'Партия 40 шт.',
			leadTime: '7 рабочих дней',
			operations: [
				'3D фрезерование глубокого кармана с толщиной стенки 2.5 мм',
				'Резьбонарезание глухих отверстий М3 и М4',
				'Фрезерование паза под герметизирующий шнур IP67',
				'Анодирование сертифицированное (кооперация)'
			],
			description:
				'Легкосплавный корпус бортового прибора с ребрами охлаждения. Обработка выполнена монолитными фрезами (HSM) для исключения коробления тонких стенок.'
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
				'Срочное импортозамещение изношенного узла редуктора в период уборочной кампании. Изготовление произведено по предоставленному образцу (реверс-инжиниринг).'
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

		<header class="border-b border-[var(--color-rule)] pb-8">
			<h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">
				Портфолио серийных деталей с ЧПУ
			</h1>
			<p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
				Примеры изготовленных деталей по чертежам заказчиков: гребные валы, гидравлические фланцы,
				корпуса приборов и шестерни с контролем ОТК.
			</p>
		</header>

		<!-- Case Studies List -->
		<div class="mt-10 space-y-12">
			{#each cases as item}
				<article class="border-b border-[var(--color-rule)] pb-10">
					<div class="flex flex-wrap items-center justify-between gap-2">
						<span
							class="rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] px-2 py-0.5 text-xs text-[var(--color-muted)]"
						>
							{item.clientSector}
						</span>
						<span class="num text-xs text-[var(--color-muted)]">Срок: {item.leadTime}</span>
					</div>

					<h2 class="mt-4 text-xl text-[var(--color-ink)] sm:text-2xl">{item.title}</h2>
					<p class="mt-2 max-w-2xl text-xs leading-relaxed text-[var(--color-ink-2)] sm:text-sm">
						{item.description}
					</p>

					<!-- Technical Specs Sheet (Vantage Hairline Data Density) -->
					<div class="mt-6 grid grid-cols-1 gap-4 text-xs sm:grid-cols-2 lg:grid-cols-4">
						<div class="well">
							<div class="text-[var(--color-muted)]">Материал:</div>
							<div class="mt-1 font-normal text-[var(--color-ink)]">{item.material}</div>
						</div>
						<div class="well">
							<div class="text-[var(--color-muted)]">Габариты детали:</div>
							<div class="num mt-1 font-normal text-[var(--color-ink)]">{item.dimensions}</div>
						</div>
						<div class="well">
							<div class="text-[var(--color-muted)]">Точность / Квалитет:</div>
							<div class="num mt-1 font-normal text-[var(--color-ink)]">{item.tolerances}</div>
						</div>
						<div class="well">
							<div class="text-[var(--color-muted)]">Объем партии:</div>
							<div class="num mt-1 font-normal text-[var(--color-ink)]">{item.batch}</div>
						</div>
					</div>

					<!-- Operations Sequence -->
					<div class="mt-6 border-t border-[var(--color-rule)] pt-4">
						<div class="text-xs text-[var(--color-muted)]">Маршрут технологической обработки:</div>
						<div class="mt-2 flex flex-wrap gap-2">
							{#each item.operations as op}
								<span
									class="rounded-sm border border-[var(--color-rule)] bg-[var(--color-paper-2)] px-2.5 py-1 text-[11px] text-[var(--color-ink-2)]"
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
		<section class="mt-12 border-t border-[var(--color-rule)] pt-8">
			<h2 class="text-sm font-normal text-[var(--color-ink)]">Разделы услуг по видам обработки:</h2>
			<div class="mt-4 grid grid-cols-1 gap-4 text-xs sm:grid-cols-3">
				<a
					href="/tokarnye-raboty-chpu/"
					class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"
				>
					<span class="block font-normal text-[var(--color-ink)]">Токарная ЧПУ обработка</span>
					<span class="mt-1 block text-[var(--color-muted)]">Валы, оси, пальцы, штуцеры</span>
				</a>
				<a
					href="/frezernye-raboty-chpu/"
					class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"
				>
					<span class="block font-normal text-[var(--color-ink)]">Фрезерная ЧПУ обработка</span>
					<span class="mt-1 block text-[var(--color-muted)]">Корпуса, плиты, кронштейны</span>
				</a>
				<a
					href="/zuboreznye-i-shlifovalnye-raboty/"
					class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"
				>
					<span class="block font-normal text-[var(--color-ink)]">Зуборезка и шлифовка</span>
					<span class="mt-1 block text-[var(--color-muted)]">Шестерни, шлицы, чистовая доводка</span
					>
				</a>
			</div>
		</section>

		<!-- Bottom CTA -->
		<section class="mt-12 border-t border-[var(--color-rule)] pt-12 pb-6 text-center">
			<h2 class="text-lg text-[var(--color-ink)] sm:text-xl">
				Требуется изготовление аналогичных деталей?
			</h2>
			<p class="lead mx-auto mt-2 max-w-2xl text-xs sm:text-sm">
				Пришлите чертеж или эскиз на расчет. Главный технолог подготовит коммерческое предложение с
				разбивкой по этапам в течение 3 часов.
			</p>
			<div class="mt-6 flex flex-wrap items-center justify-center gap-4">
				<a href="/kalkulyator-stoimosti-chpu/" class="btn btn--sm">
					Рассчитать в онлайн-калькуляторе
				</a>
				<a href="mailto:{siteConfig.contactEmail}" class="btn btn--sm btn--line">
					Отправить чертежи на {siteConfig.contactEmail}
				</a>
			</div>
		</section>
	</div>
</main>
