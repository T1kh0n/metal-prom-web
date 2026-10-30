<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';
	import { createServiceSchema, serializeSchema } from '#lib/seo/schema';

	const breadcrumbs = [{ name: 'Токарные работы с ЧПУ', path: '/tokarnye-raboty-chpu/' }];

	const serviceSchema = createServiceSchema({
		name: 'Токарные работы с ЧПУ в Калининграде',
		description:
			'Прецизионная токарная обработка деталей вращения на станках с ЧПУ по чертежам заказчика. Диаметр до 320 мм, длина до 750 мм, допуски IT7-IT8, партии от 5 шт.',
		serviceType: 'Токарная обработка металлов с ЧПУ',
		path: '/tokarnye-raboty-chpu/',
		offers: {
			price: 2500,
			minOrderPrice: 5000,
			unitText: 'нормо-час'
		}
	});
</script>

<svelte:head>
	<title
		>Токарные работы с ЧПУ в Калининграде: изготовление валов и втулок | {siteConfig.brandName}</title
	>
	<meta
		name="description"
		content="Высокоточная токарная обработка на станках ЧПУ в Калининграде. Диаметр до ⌀320 мм, длина до 750 мм, партии от 5 шт. за 5-7 дней. Контроль ОТК, НДС 20%."
	/>
	{@html serializeSchema(serviceSchema)}
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<!-- Header & Direct Summary: Vantage 12-Column Asymmetric Hero -->
		<div
			class="mt-4 grid grid-cols-1 items-start gap-8 border-b border-[var(--color-rule)] pb-8 lg:grid-cols-12"
		>
			<div class="lg:col-span-7">
				<h1 class="text-3xl text-[var(--color-ink)] sm:text-4xl">
					Токарные работы с ЧПУ в Калининграде
				</h1>
				<p class="lead mt-4 text-sm leading-relaxed sm:text-base">
					Серийное точение валов, втулок и фланцев по чертежам заказчика. Партии от 5 штук,
					квалитеты <span class="num text-[var(--color-ink)]">IT7–IT8</span>, ставка от
					<span class="num text-[var(--color-ink)]"
						>2&thinsp;500<span class="u">&thinsp;₽/ч</span></span
					> с НДС 20%.
				</p>
			</div>
			<div class="well text-xs text-[var(--color-ink-2)] lg:col-span-5">
				<div class="font-normal text-[var(--color-ink)]">Ключевые лимиты токарного участка:</div>
				<div class="mt-3 grid grid-cols-2 gap-3 text-[var(--color-muted)]">
					<div>
						Макс. диаметр:
						<strong class="num block font-normal text-[var(--color-ink)]"
							>⌀ 320<span class="u">&thinsp;мм</span></strong
						>
					</div>
					<div>
						Макс. длина:
						<strong class="num block font-normal text-[var(--color-ink)]"
							>750<span class="u">&thinsp;мм</span></strong
						>
					</div>
					<div>
						Точность точения:
						<strong class="num block font-normal text-[var(--color-ink)]"
							>±0.012<span class="u">&thinsp;мм</span> (IT7)</strong
						>
					</div>
					<div>
						Шероховатость:
						<strong class="num block font-normal text-[var(--color-ink)]"
							>Ra 1.6 – 3.2<span class="u">&thinsp;мкм</span></strong
						>
					</div>
				</div>
			</div>
		</div>

		<!-- Technical Specifications Grid (Hallmark Data Density) -->
		<section class="mt-10" aria-labelledby="tech-params-heading">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
				<div class="lg:col-span-4">
					<h2 id="tech-params-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">
						Параметры оборудования
					</h2>
					<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
						Паспортные технологические характеристики токарно-револьверных центров с ЧПУ и
						применяемый режущий инструмент.
					</p>
				</div>
				<div class="overflow-x-auto lg:col-span-8">
					<table class="v-table">
						<thead>
							<tr>
								<th>Параметр обработки</th>
								<th>Техническое значение</th>
								<th>Стандарт / Примечание</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">
									Максимальный диаметр над станиной
								</td>
								<td class="num text-[var(--color-ink)]">320<span class="u">&thinsp;мм</span></td>
								<td class="text-[var(--color-muted)]">Точение фланцев, дисков, крышек</td>
							</tr>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">
									Максимальный диаметр над суппортом
								</td>
								<td class="num text-[var(--color-ink)]">210<span class="u">&thinsp;мм</span></td>
								<td class="text-[var(--color-muted)]">Проходная обработка длинномерных заготовок</td
								>
							</tr>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">
									Предельная длина обработки в центрах
								</td>
								<td class="num text-[var(--color-ink)]">750<span class="u">&thinsp;мм</span></td>
								<td class="text-[var(--color-muted)]">С люнетом для жесткости валопроводов</td>
							</tr>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">Отверстие в шпинделе</td>
								<td class="num text-[var(--color-ink)]">52<span class="u">&thinsp;мм</span></td>
								<td class="text-[var(--color-muted)]">Прутковая подача серийного металлопроката</td>
							</tr>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">Достижимый квалитет</td>
								<td class="num text-[var(--color-ink)]">IT7 – IT8</td>
								<td class="text-[var(--color-muted)]">ГОСТ 25346-2015 (Единая система допусков)</td>
							</tr>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">
									Шероховатость после чистового резца
								</td>
								<td class="num text-[var(--color-ink)]">Ra 1.6<span class="u">&thinsp;мкм</span></td
								>
								<td class="text-[var(--color-muted)]">Пластины твердосплавные Sandvik / Korloy</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>

		<!-- Processed Materials Section -->
		<section class="mt-14" aria-labelledby="materials-heading">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
				<div class="lg:col-span-4">
					<h2 id="materials-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">
						Обрабатываемые металлы
					</h2>
					<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
						Складской запас сертифицированного сортового проката и опыт работы с давальческим сырьем
						заказчиков.
					</p>
				</div>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-8">
					<div class="well">
						<h3 class="text-sm font-normal text-[var(--color-ink)]">Конструкционные стали</h3>
						<div class="num mt-1 text-xs text-[var(--color-muted)]">Ст45, Ст20, 40Х, 09Г2С</div>
						<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
							Пальцы гидроцилиндров, промежуточные и первичные валы, переходные фланцы и ступенчатые
							оси.
						</p>
					</div>
					<div class="well">
						<h3 class="text-sm font-normal text-[var(--color-ink)]">Нержавеющие стали</h3>
						<div class="num mt-1 text-xs text-[var(--color-muted)]">
							12Х18Н10Т, AISI 304, AISI 316L
						</div>
						<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
							Судовые штуцеры, элементы забортной арматуры, штоки клапанов и детали оборудования
							пищепрома.
						</p>
					</div>
					<div class="well">
						<h3 class="text-sm font-normal text-[var(--color-ink)]">Бронза и сплавы</h3>
						<div class="num mt-1 text-xs text-[var(--color-muted)]">
							БрАЖ9-4, БрОЦС5-5-5, ЛС59-1
						</div>
						<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
							Антифрикционные втулки скольжения, гайки ходовых винтов, уплотнительные кольца и
							вкладыши.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Regional Sector Focus (Kaliningrad Industrial Clusters) -->
		<section class="mt-14" aria-labelledby="regional-cases-heading">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
				<div class="lg:col-span-4">
					<h2 id="regional-cases-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">
						Отраслевой опыт
					</h2>
					<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
						Локальное импортозамещение тел вращения для предприятий Калининградского эксклава.
					</p>
				</div>
				<div class="space-y-4 text-xs leading-relaxed text-[var(--color-muted)] lg:col-span-8">
					<p class="max-w-2xl">
						Цех {siteConfig.brandName} обеспечивает оперативное изготовление тел вращения без задержек
						поставок из ЕС и большой России:
					</p>
					<ul class="max-w-2xl list-inside list-disc space-y-2 text-[var(--color-ink-2)]">
						<li>
							<strong class="font-normal text-[var(--color-ink)]"
								>Судостроение и судоремонт (г. Светлый, г. Балтийск):</strong
							> Валы, дейдвудные втулки, шпильки из высокопрочных легированных сталей с сертификатами.
						</li>
						<li>
							<strong class="font-normal text-[var(--color-ink)]"
								>Сельское хозяйство и спецтехника (Гурьевск, Багратионовск):</strong
							>
							Оси прицепов, шлицевые муфты комбайнов, пальцы навесного оборудования с термообработкой
							ТВЧ.
						</li>
						<li>
							<strong class="font-normal text-[var(--color-ink)]"
								>Ремонт промышленного оборудования (г. Калининград):</strong
							> Расточка посадочных мест под подшипники, восстановление соосности шеек и ремонтные втулки.
						</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Contextual Internal Linking -->
		<section class="mt-14 border-t border-[var(--color-rule)] pt-8">
			<h2 class="text-sm font-normal text-[var(--color-ink)]">
				Связанные производственные переделы цеха:
			</h2>
			<div class="mt-4 grid grid-cols-1 gap-4 text-xs sm:grid-cols-3">
				<a
					href="/frezernye-raboty-chpu/"
					class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"
				>
					<span class="block font-normal text-[var(--color-ink)]">Фрезерная ЧПУ обработка</span>
					<span class="mt-1 block text-[var(--color-muted)]"
						>Фрезерование пазов, лысок, шпоночных канавок на валах</span
					>
				</a>
				<a
					href="/zuboreznye-i-shlifovalnye-raboty/"
					class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"
				>
					<span class="block font-normal text-[var(--color-ink)]">Круглое шлифование</span>
					<span class="mt-1 block text-[var(--color-muted)]"
						>Доводка шеек валов до квалитета IT6 (Ra 0.4)</span
					>
				</a>
				<a
					href="/portfolio/"
					class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"
				>
					<span class="block font-normal text-[var(--color-ink)]">Портфолио валов и втулок</span>
					<span class="mt-1 block text-[var(--color-muted)]"
						>Фотографии и параметры выполненных партий</span
					>
				</a>
			</div>
		</section>

		<!-- Direct CTA Action -->
		<section class="mt-14 border-t border-[var(--color-rule)] pt-12 pb-6 text-center">
			<h2 class="text-lg text-[var(--color-ink)] sm:text-xl">
				Рассчитайте себестоимость партии токарных деталей онлайн
			</h2>
			<p class="lead mx-auto mt-2 max-w-2xl text-xs sm:text-sm">
				Воспользуйтесь инженерным калькулятором или направьте чертежи на прямую почту главного
				технолога.
			</p>
			<div class="mt-6 flex flex-wrap items-center justify-center gap-3">
				<a href="/kalkulyator-stoimosti-chpu/" class="btn btn--sm">
					Перейти в онлайн-калькулятор
				</a>
				<a href="mailto:{siteConfig.contactEmail}" class="btn btn--sm btn--line">
					Отправить чертежи на {siteConfig.contactEmail}
				</a>
			</div>
		</section>
	</div>
</main>
