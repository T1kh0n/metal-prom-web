<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';
	import { createServiceSchema, serializeSchema } from '#lib/seo/schema';

	const breadcrumbs = [{ name: 'Токарные работы с ЧПУ', path: '/tokarnye-raboty-chpu/' }];

	const serviceSchema = createServiceSchema({
		name: 'Токарные работы с ЧПУ в Калининграде',
		description:
			'Прецизионная токарная обработка тел вращения (валы, втулки, оси, фланцы) на станках с ЧПУ. Допуски IT7-IT8, партии от 5 шт., безналичный расчет с НДС 20%.',
		serviceType: 'Токарная обработка с ЧПУ',
		path: '/tokarnye-raboty-chpu/',
		offers: {
			price: 2500,
			minOrderPrice: 5000,
			unitText: 'нормо-час'
		}
	});
</script>

<svelte:head>
	<title>Токарные работы с ЧПУ в Калининграде | Валы, втулки, фланцы | {siteConfig.brandName}</title
	>
	<meta
		name="description"
		content="Прецизионная токарная ЧПУ обработка в Калининграде. Диаметр до 320 мм, длина до 750 мм, допуски IT7-IT8. Серии от 5 до 1000 шт. за 5-7 дней. НДС 20%, контроль ОТК."
	/>
	{@html serializeSchema(serviceSchema)}
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<!-- Header & Direct Summary -->
		<header class="max-w-4xl border-b border-zinc-800 pb-8">
			<div
				class="inline-flex items-center gap-2 rounded border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-semibold text-amber-400 uppercase"
			>
				<span>⚙️</span> Токарный участок ЧПУ
			</div>
			<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
				Токарные работы с ЧПУ в Калининграде: серийное изготовление валов, втулок и фланцев
			</h1>
			<p class="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
				Механический цех {siteConfig.brandName} выполняет прецизионную токарную обработку деталей вращения
				по чертежам и 3D-моделям заказчика. Изготавливаем серийные партии от 5 до 1 000 штук с соблюдением
				квалитетов точности <strong class="font-mono text-amber-400">IT7–IT8</strong> и контролем
				шероховатости поверхности. Базовая ставка —
				<strong class="font-mono text-white">2 500 ₽ / нормо-час</strong>, минимальный заказ для
				юридических лиц — <strong class="font-mono text-white">5 000 ₽</strong>.
			</p>
		</header>

		<!-- Direct Answer AEO Block -->
		<div
			class="my-8 rounded-lg border border-amber-500/30 bg-zinc-900/60 p-5 font-mono text-xs text-zinc-300"
		>
			<div class="font-bold tracking-wide text-amber-400 uppercase">
				Ключевые технологические лимиты токарного участка:
			</div>
			<div class="mt-2 grid grid-cols-2 gap-3 text-zinc-400 sm:grid-cols-4">
				<div>Макс. диаметр: <strong class="text-zinc-100">⌀ 320 мм</strong></div>
				<div>Макс. длина: <strong class="text-zinc-100">750 мм</strong></div>
				<div>Точность точения: <strong class="text-zinc-100">до ±0.012 мм (IT7)</strong></div>
				<div>Шероховатость: <strong class="text-zinc-100">Ra 1.6 – 3.2 мкм</strong></div>
			</div>
		</div>

		<!-- Technical Specifications Grid (Hallmark Data Density) -->
		<section class="mt-10" aria-labelledby="tech-params-heading">
			<h2 id="tech-params-heading" class="text-xl font-bold tracking-tight text-white sm:text-2xl">
				Технические возможности и технологические параметры оборудования
			</h2>
			<div class="mt-4 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950">
				<table class="w-full text-left font-mono text-xs text-zinc-300">
					<thead class="border-b border-zinc-800 bg-zinc-900/80 text-zinc-400 uppercase">
						<tr>
							<th class="px-4 py-3">Параметр обработки</th>
							<th class="px-4 py-3">Техническое значение</th>
							<th class="px-4 py-3">Стандарт / Примечание</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-800/60">
						<tr>
							<td class="px-4 py-3 font-sans font-medium text-zinc-200">
								Максимальный диаметр над станиной
							</td>
							<td class="px-4 py-3 text-amber-400">320 мм</td>
							<td class="px-4 py-3 text-zinc-500">Точение фланцев, дисков, крышек</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-sans font-medium text-zinc-200">
								Максимальный диаметр над суппортом
							</td>
							<td class="px-4 py-3 text-amber-400">210 мм</td>
							<td class="px-4 py-3 text-zinc-500">Проходная обработка длинномерных заготовок</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-sans font-medium text-zinc-200">
								Предельная длина обработки в центрах
							</td>
							<td class="px-4 py-3 text-amber-400">750 мм</td>
							<td class="px-4 py-3 text-zinc-500">С люнетом для жесткости валопроводов</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-sans font-medium text-zinc-200">Отверстие в шпинделе</td>
							<td class="px-4 py-3 text-amber-400">52 мм</td>
							<td class="px-4 py-3 text-zinc-500">Прутковая подача серийного металлопроката</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-sans font-medium text-zinc-200">Достижимый квалитет</td>
							<td class="px-4 py-3 text-emerald-400">IT7 – IT8</td>
							<td class="px-4 py-3 text-zinc-500">ГОСТ 25346-2015 (Единая система допусков)</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-sans font-medium text-zinc-200">
								Шероховатость после чистового резца
							</td>
							<td class="px-4 py-3 text-emerald-400">Ra 1.6 мкм</td>
							<td class="px-4 py-3 text-zinc-500">Пластины твердосплавные Sandvik / Korloy</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Processed Materials Section -->
		<section class="mt-12" aria-labelledby="materials-heading">
			<h2 id="materials-heading" class="text-xl font-bold tracking-tight text-white sm:text-2xl">
				Обрабатываемые металлы и сплавы
			</h2>
			<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<div class="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
					<h3 class="font-mono text-sm font-bold text-amber-400">Конструкционные стали</h3>
					<div class="mt-1 font-mono text-xs text-zinc-300">Ст45, Ст20, 40Х, 09Г2С</div>
					<p class="mt-2 text-xs leading-relaxed text-zinc-400">
						Пальцы гидроцилиндров, промежуточные и первичные валы, переходные фланцы и ступенчатые
						оси. Термоулучшение и нормализация заготовок.
					</p>
				</div>
				<div class="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
					<h3 class="font-mono text-sm font-bold text-amber-400">Нержавеющие стали</h3>
					<div class="mt-1 font-mono text-xs text-zinc-300">12Х18Н10Т, AISI 304, AISI 316L</div>
					<p class="mt-2 text-xs leading-relaxed text-zinc-400">
						Судовые штуцеры, элементы забортной арматуры, штоки клапанов и детали оборудования для
						пищевой промышленности Калининградской области.
					</p>
				</div>
				<div class="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
					<h3 class="font-mono text-sm font-bold text-amber-400">Бронза и цветные сплавы</h3>
					<div class="mt-1 font-mono text-xs text-zinc-300">БрАЖ9-4, БрОЦС5-5-5, ЛС59-1</div>
					<p class="mt-2 text-xs leading-relaxed text-zinc-400">
						Антифрикционные втулки скольжения, гайки ходовых винтов, уплотнительные кольца и
						вкладыши для портовых кранов и судовых механизмов.
					</p>
				</div>
			</div>
		</section>

		<!-- Regional Sector Focus (Kaliningrad Industrial Clusters) -->
		<section class="mt-12" aria-labelledby="regional-cases-heading">
			<h2
				id="regional-cases-heading"
				class="text-xl font-bold tracking-tight text-white sm:text-2xl"
			>
				Отраслевой опыт и региональная специфика в Калининградской области
			</h2>
			<div class="mt-4 space-y-4 text-sm leading-relaxed text-zinc-400">
				<p>
					Учитывая изолированное географическое положение Калининградской области, промышленные
					предприятия региона часто сталкиваются с задержками поставок запасных частей из «большой
					России» и ЕС. Цех {siteConfig.brandName} обеспечивает оперативное локальное импортозамещение
					тел вращения:
				</p>
				<ul class="list-inside list-disc space-y-2 text-zinc-300">
					<li>
						<strong>Судостроение и судоремонт (г. Светлый, г. Балтийск):</strong> Изготовление гребных
						и промежуточных валов, дейдвудных втулок, крепежных шпилек из высокопрочных легированных сталей
						с предоставлением сертификатов на металл.
					</li>
					<li>
						<strong>Сельское хозяйство и спецтехника (Гурьевский, Багратионовский районы):</strong>
						Точение осей прицепов, шлицевых муфт комбайнов, пальцев навесного оборудования экскаваторов
						и дорожных катков с термообработкой ТВЧ.
					</li>
					<li>
						<strong>Ремонт промышленного оборудования (г. Калининград):</strong> Расточка посадочных мест
						под подшипники, восстановление соосности шеек и изготовление нестандартных ремонтных втулок.
					</li>
				</ul>
			</div>
		</section>

		<!-- Contextual Internal Linking (Checklist Points 23, 24, 25) -->
		<section class="mt-12 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
			<h2 class="text-base font-bold text-white">Связанные производственные переделы цеха:</h2>
			<div class="mt-3 grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-3">
				<a
					href="/frezernye-raboty-chpu/"
					class="rounded border border-zinc-800 bg-zinc-950 p-3 text-zinc-300 transition-colors hover:border-amber-500 hover:text-white"
				>
					<span class="block font-bold text-amber-400">Фрезерная ЧПУ обработка</span>
					<span class="mt-1 block text-zinc-500"
						>Фрезерование пазов, лысок, шпоночных канавок на валах</span
					>
				</a>
				<a
					href="/zuboreznye-i-shlifovalnye-raboty/"
					class="rounded border border-zinc-800 bg-zinc-950 p-3 text-zinc-300 transition-colors hover:border-amber-500 hover:text-white"
				>
					<span class="block font-bold text-amber-400">Круглое шлифование</span>
					<span class="mt-1 block text-zinc-500">Доводка шеек валов до квалитета IT6 (Ra 0.4)</span>
				</a>
				<a
					href="/portfolio/"
					class="rounded border border-zinc-800 bg-zinc-950 p-3 text-zinc-300 transition-colors hover:border-amber-500 hover:text-white"
				>
					<span class="block font-bold text-amber-400">Портфолио валов и втулок</span>
					<span class="mt-1 block text-zinc-500">Фотографии и параметры выполненных партий</span>
				</a>
			</div>
		</section>

		<!-- Direct CTA Action -->
		<section class="mt-12 rounded-lg border border-amber-500/40 bg-zinc-900 p-6 text-center">
			<h2 class="text-lg font-bold text-white sm:text-xl">
				Рассчитайте себестоимость партии токарных деталей онлайн
			</h2>
			<p class="mt-2 text-xs text-zinc-400 sm:text-sm">
				Воспользуйтесь нашим интерактивным инженерным калькулятором или отправьте чертежи в форматах
				PDF, DXF, STEP на прямую электронную почту главного технолога.
			</p>
			<div class="mt-5 flex flex-wrap items-center justify-center gap-3">
				<a
					href="/kalkulyator-stoimosti-chpu/"
					class="rounded border border-amber-500 bg-amber-500 px-5 py-2.5 font-mono text-xs font-bold text-zinc-950 transition-colors hover:bg-amber-400"
				>
					⚡ Перейти в онлайн-калькулятор
				</a>
				<a
					href="mailto:{siteConfig.contactEmail}"
					class="rounded border border-zinc-700 bg-zinc-800 px-5 py-2.5 font-mono text-xs font-semibold text-zinc-200 transition-colors hover:border-zinc-600 hover:text-white"
				>
					✉️ Отправить чертежи на {siteConfig.contactEmail}
				</a>
			</div>
		</section>
	</div>
</main>
