<script lang="ts">
	import { base } from '$lib/paths';
	import CostCalculator from '#lib/components/CostCalculator.svelte';
	import WorkpieceInspectionScan from '#lib/components/WorkpieceInspectionScan.svelte';
	import { siteConfig } from '#lib/config/site';
	import { createFaqSchema, serializeSchema } from '#lib/seo/schema';

	const faqs = [
		{
			question: 'Какой минимальный объем заказа в цехе MetalProm39?',
			answer:
				'Базовый порог запуска заказа для юридических лиц составляет 5 000 рублей с учетом НДС 20%. Это обусловлено постоянными издержками на разработку управляющей программы (УП), привязку инструмента, наладку станка и входной/выходной контроль ОТК. Серийные скидки начинаются от 5 штук (10%) и достигают 40% на партиях от 100 штук.'
		},
		{
			question: 'Работаете ли вы с давальческим сырьем заказчика?',
			answer:
				'Да. При предоставлении давальческого металлопроката стоимость сырья полностью исключается из расчета (ставится отметка «Материал заказчика»). Требуется наличие сертификата завода-изготовителя на партию металла для обеспечения расчетных режимов резания.'
		},
		{
			question: 'В каких форматах принимается конструкторская документация?',
			answer:
				'Мы принимаем 3D-модели в форматах STEP (.step, .stp), Parasolid (.x_t), IGES (.igs), а также плоские чертежи с указанием допусков, шероховатости и посадок в форматах PDF, DXF и DWG.'
		},
		{
			question: 'Как осуществляется контроль качества и проверка допусков?',
			answer:
				'Каждая партия проходит входной контроль металла, контроль первой детали (First Article Inspection) и финишную приемку инженером ОТК с использованием цифровых микрометров и профилометров Mitutoyo (Япония). К отгрузке прилагается паспорт качества изделия с фактическими размерами.'
		},
		{
			question: 'Работаете ли вы по безналичному расчету с НДС 20% и ЭДО?',
			answer:
				'Да. Мы работаем исключительно в легальном B2B-поле по безналичному расчету с выделением НДС 20%. Документооборот осуществляется через системы ЭДО Диадок и СБИС, либо на бумажных носителях с синей печатью.'
		}
	];

	const faqSchema = createFaqSchema(faqs);
</script>

<svelte:head>
	<title>Высокоточная металлообработка с ЧПУ в Калининграде | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Прецизионная токарная и фрезерная обработка с ЧПУ в Калининграде. Допуски до IT6-IT7, серии от 5 до 1000 шт. за 5-7 дней. НДС 20%, контроль ОТК Mitutoyo. Расчет онлайн."
	/>
	{@html serializeSchema(faqSchema)}
</svelte:head>

<main>
	<!-- Hero Section: Laboratory Split Bench (Vantage Stage) -->
	<section class="border-b border-[var(--color-rule)] bg-[var(--color-paper)] py-16 sm:py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
				<!-- Left Column: Core Value Proposition, Actions & Readout Bar -->
				<div class="lg:col-span-7">
					<div class="mb-4 text-xs font-light text-[var(--color-muted)]">
						Цех в Калининграде, 2 смены, прием заказов
					</div>

					<h1 class="text-3xl text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
						Прецизионная металлообработка с ЧПУ в Калининграде
					</h1>

					<p class="lead mt-6 max-w-2xl">
						Серийное изготовление токарных и 4-осевых фрезерных деталей по чертежам заказчика.
						Квалитеты точности до IT6, инструментальный контроль ОТК Mitutoyo, расчет с НДС 20%.
					</p>

					<div class="mt-8 flex flex-wrap items-center gap-3">
						<a href="#calculator-section" class="btn">Инженерный калькулятор онлайн</a>
						<a href="mailto:{siteConfig.contactEmail}" class="btn btn--line">Отправить чертежи</a>
					</div>

					<!-- 4-item horizontal hairline readout line with corner ticks -->
					<dl class="readout ticks" aria-label="Параметры производства">
						<div>
							<dt>Станочный парк</dt>
							<dd class="num">4<span class="u">&thinsp;центра</span></dd>
						</div>
						<div>
							<dt>Точность</dt>
							<dd class="num">IT6<span class="u">&thinsp;(Ra 0.4)</span></dd>
						</div>
						<div>
							<dt>Сроки партии</dt>
							<dd class="num">5&ndash;7<span class="u">&thinsp;дней</span></dd>
						</div>
						<div>
							<dt>Порог запуска</dt>
							<dd class="num">5&thinsp;000<span class="u">&thinsp;₽</span></dd>
						</div>
					</dl>
				</div>

				<!-- Right Column: Equipment Limits Passport enclosed in precision .ticks -->
				<div class="lg:col-span-5">
					<aside class="ticks passport" aria-label="Технологический паспорт цеха">
						<div class="passport__head">
							<div>
								<div class="text-xs text-[var(--color-muted)]">Технологический паспорт</div>
								<div class="passport__title mt-0.5">Лимиты оборудования цеха</div>
							</div>
							<div class="passport__badge">
								<span class="live-dot" aria-hidden="true"></span>
								<span>Статус: в работе (Калининград)</span>
							</div>
						</div>

						<dl class="passport__list">
							<div class="passport__row">
								<dt>Токарная обработка</dt>
								<dd class="num whitespace-nowrap">⌀320 × 750<span class="u">&thinsp;мм</span></dd>
							</div>
							<div class="passport__row">
								<dt>Фрезерная (3 оси)</dt>
								<dd class="num whitespace-nowrap">800 × 500 × 500<span class="u">&thinsp;мм</span></dd>
							</div>
							<div class="passport__row">
								<dt>Поворотный стол (4-я ось)</dt>
								<dd class="num whitespace-nowrap">⌀200<span class="u">&thinsp;мм</span> (0.001°)</dd>
							</div>
							<div class="passport__row">
								<dt>Предельный квалитет</dt>
								<dd class="num whitespace-nowrap">IT6 <span class="u">(до&nbsp;±0.008&nbsp;мм)</span></dd>
							</div>
							<div class="passport__row">
								<dt>Шероховатость поверхности</dt>
								<dd class="num whitespace-nowrap">Ra&nbsp;0.4&nbsp;–&nbsp;1.6<span class="u">&thinsp;мкм</span></dd>
							</div>
							<div class="passport__row">
								<dt>Инструментальный контроль</dt>
								<dd class="whitespace-nowrap">Mitutoyo (ОТК&nbsp;100%)</dd>
							</div>
							<div class="passport__row">
								<dt>Базовый порог заказа</dt>
								<dd class="num whitespace-nowrap">5&thinsp;000<span class="u">&thinsp;₽</span> <span class="u text-[11px]">(НДС&nbsp;20%)</span></dd>
							</div>
						</dl>

						<div class="passport__foot">
							Партии от 5 до 1 000 шт. Доставка по Калининграду и области
						</div>
					</aside>
				</div>
			</div>
		</div>
	</section>

	<!-- Production Divisions Grid -->
	<section
		class="border-b border-[var(--color-rule)] bg-[var(--color-paper)] py-16 sm:py-24"
		aria-labelledby="divisions-heading"
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="max-w-3xl">
				<h2 id="divisions-heading" class="text-2xl text-[var(--color-ink)] sm:text-3xl">
					Производственные участки цеха МеталлПром39
				</h2>
				<p class="lead mt-3 text-sm leading-relaxed sm:text-base">
					Специализированные участки механической обработки, оснащенные станками с числовым
					программным управлением и оснасткой для серийного выпуска
				</p>
			</div>

			<div
				class="mt-12 grid grid-cols-1 gap-0 border-t border-[var(--color-rule)] md:grid-cols-3 md:divide-x md:divide-[var(--color-rule)]"
			>
				<!-- Division 1: Turning -->
				<div class="flex flex-col justify-between py-8 pr-0 md:pr-8">
					<div>
						<div class="text-xs text-[var(--color-muted)]">Участок 01</div>
						<h3 class="mt-1 text-lg text-[var(--color-ink)]">Токарные работы с ЧПУ</h3>
						<p class="mt-3 text-xs leading-relaxed text-[var(--color-ink-2)]">
							Высокопроизводительная токарная обработка тел вращения из конструкционных,
							легированных и нержавеющих сталей, бронзы и алюминия.
						</p>
						<dl class="mt-6 space-y-2 border-t border-[var(--color-rule)] pt-4 text-xs">
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Макс. диаметр над станиной:</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									⌀320<span class="u">&thinsp;мм</span>
								</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Макс. длина обработки:</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									750<span class="u">&thinsp;мм</span>
								</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Точность размеров:</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									IT7–IT8<span class="u">&thinsp;(до ±0.012 мм)</span>
								</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Базовая ставка нормо-часа:</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									2&thinsp;500<span class="u">&thinsp;₽/ч</span>
								</dd>
							</div>
						</dl>
					</div>
					<div class="mt-6">
						<a
							href="{base}/tokarnye-raboty-chpu/"
							class="text-xs text-[var(--color-ink-2)] hover:text-[var(--color-accent)]"
						>
							Параметры токарного участка &rarr;
						</a>
					</div>
				</div>

				<!-- Division 2: Milling -->
				<div class="flex flex-col justify-between py-8 md:px-8">
					<div>
						<div class="text-xs text-[var(--color-muted)]">Участок 02</div>
						<h3 class="mt-1 text-lg text-[var(--color-ink)]">Фрезерные работы ЧПУ (3 и 4 оси)</h3>
						<p class="mt-3 text-xs leading-relaxed text-[var(--color-ink-2)]">
							Прецизионная обработка корпусных деталей, приборных панелей, плит и сложных
							пространственных поверхностей с непрерывным 4D-позиционированием.
						</p>
						<dl class="mt-6 space-y-2 border-t border-[var(--color-rule)] pt-4 text-xs">
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Рабочее поле (X/Y/Z):</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									800 × 500 × 500<span class="u">&thinsp;мм</span>
								</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Координатно-поворотный стол:</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									⌀200<span class="u">&thinsp;мм (0.001°)</span>
								</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Позиционирование:</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									±0.005<span class="u">&thinsp;мм</span>
								</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Базовая ставка нормо-часа:</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									3&thinsp;000<span class="u">&thinsp;₽/ч</span>
								</dd>
							</div>
						</dl>
					</div>
					<div class="mt-6">
						<a
							href="{base}/frezernye-raboty-chpu/"
							class="text-xs text-[var(--color-ink-2)] hover:text-[var(--color-accent)]"
						>
							Параметры фрезерного участка &rarr;
						</a>
					</div>
				</div>

				<!-- Division 3: Gear-cutting & Grinding -->
				<div class="flex flex-col justify-between py-8 pl-0 md:pl-8">
					<div>
						<div class="text-xs text-[var(--color-muted)]">Участок 03</div>
						<h3 class="mt-1 text-lg text-[var(--color-ink)]">Зуборезка и шлифование</h3>
						<p class="mt-3 text-xs leading-relaxed text-[var(--color-ink-2)]">
							Финишная доводка зубчатых передач и прецизионное плоское и круглое шлифование для
							достижения посадочных допусков шестого квалитета.
						</p>
						<dl class="mt-6 space-y-2 border-t border-[var(--color-rule)] pt-4 text-xs">
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Нарезание зубьев шестерен:</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									до ⌀500<span class="u">&thinsp;мм (m1.0–m8.0)</span>
								</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Круглое шлифование в центрах:</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									⌀200 × 800<span class="u">&thinsp;мм</span>
								</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Финишная шероховатость:</dt>
								<dd class="num font-normal text-[var(--color-ink)]">
									Ra 0.2–0.4<span class="u">&thinsp;мкм (IT6)</span>
								</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-[var(--color-muted)]">Термообработка (кооперация):</dt>
								<dd class="num font-normal text-[var(--color-ink)]">ТВЧ, объемная закалка</dd>
							</div>
						</dl>
					</div>
					<div class="mt-6">
						<a
							href="{base}/zuboreznye-i-shlifovalnye-raboty/"
							class="text-xs text-[var(--color-ink-2)] hover:text-[var(--color-accent)]"
						>
							Параметры зуборезного участка &rarr;
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Interactive CNC CMM Inspection Twin & Layer Ledger (Vantage Theme) -->
	<WorkpieceInspectionScan />

	<!-- Interactive Cost Calculator Section -->
	<section
		id="calculator-section"
		class="border-b border-[var(--color-rule)] bg-[var(--color-paper)] py-16 sm:py-24"
		aria-label="Калькулятор стоимости ЧПУ онлайн"
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<CostCalculator />
		</div>
	</section>

	<!-- Regional Industrial Clusters Coverage (Structured with whitespace & hairlines) -->
	<section
		class="border-b border-[var(--color-rule)] bg-[var(--color-paper)] py-16 sm:py-24"
		aria-labelledby="regional-presence-heading"
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<h2 id="regional-presence-heading" class="text-2xl text-[var(--color-ink)] sm:text-3xl">
				Географический охват и логистика по Калининградской области
			</h2>
			<p class="lead mt-3 max-w-3xl text-sm leading-relaxed">
				Цех расположен в пригороде Калининграда с оперативным выездом на Окружную дорогу для
				доставки деталей ключевым региональным заказчикам
			</p>
			<div
				class="mt-10 grid grid-cols-1 gap-6 border-t border-[var(--color-rule)] pt-6 text-xs sm:grid-cols-2 lg:grid-cols-4"
			>
				<div class="border-b border-[var(--color-rule)] pb-4 lg:border-b-0">
					<div class="font-normal text-[var(--color-ink)]">г. Калининград</div>
					<div class="mt-1 text-[var(--color-muted)]">
						Машиностроение, приборостроение, гидравлика, остовы
					</div>
				</div>
				<div class="border-b border-[var(--color-rule)] pb-4 lg:border-b-0">
					<div class="font-normal text-[var(--color-ink)]">г. Светлый</div>
					<div class="mt-1 text-[var(--color-muted)]">
						Судоремонт, гребные валы, втулки, забортная арматура
					</div>
				</div>
				<div class="border-b border-[var(--color-rule)] pb-4 lg:border-b-0">
					<div class="font-normal text-[var(--color-ink)]">г. Балтийск</div>
					<div class="mt-1 text-[var(--color-muted)]">
						Портовая инфраструктура, шпильки, ремонтные муфты
					</div>
				</div>
				<div class="pb-4">
					<div class="font-normal text-[var(--color-ink)]">Гурьевский район</div>
					<div class="mt-1 text-[var(--color-muted)]">
						Агропромышленный комплекс, спецтехника, пальцы, шестерни
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Technical FAQ Section (Ruled list without solid card boxes) -->
	<section
		class="border-b border-[var(--color-rule)] bg-[var(--color-paper)] py-16 sm:py-24"
		aria-labelledby="faq-heading"
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="max-w-3xl">
				<h2 id="faq-heading" class="text-2xl text-[var(--color-ink)] sm:text-3xl">
					Инженерные и организационные вопросы заказчиков
				</h2>
			</div>

			<div class="mt-10 border-t border-[var(--color-rule)]">
				{#each faqs as faq}
					<div class="border-b border-[var(--color-rule)] py-6">
						<h3 class="text-base text-[var(--color-ink)]">{faq.question}</h3>
						<p class="mt-2 max-w-3xl text-xs leading-relaxed text-[var(--color-ink-2)] sm:text-sm">
							{faq.answer}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Contact CTA Anchor Target (Passive Contact, 152-FZ compliant) -->
	<section id="order-form" class="bg-[var(--color-paper)] py-16 text-center sm:py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="border-t border-[var(--color-rule)] pt-12 pb-6">
				<h2 class="text-2xl text-[var(--color-ink)] sm:text-3xl">
					Готовы рассчитать точную смету по вашей конструкторской документации?
				</h2>
				<p class="lead mx-auto mt-4 max-w-2xl text-sm">
					Направьте чертежи (PDF, DXF, DWG) или 3D-модели (STEP, IGES) на электронную почту главного
					технолога
				</p>
				<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
					<a href="mailto:{siteConfig.contactEmail}" class="btn btn--line">
						{siteConfig.contactEmail}
					</a>
					<a href="tel:{siteConfig.contactPhone}" class="btn btn--line num">
						{siteConfig.contactPhone}
					</a>
				</div>
				<p class="mt-6 text-xs text-[var(--color-muted)]">
					Конфиденциальность гарантируется (NDA по запросу). Безналичный расчет с НДС 20%
				</p>
			</div>
		</div>
	</section>
</main>
