<script lang="ts">
	import CostCalculator from '#lib/components/CostCalculator.svelte';
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
	<!-- Hero Section -->
	<section class="border-b border-zinc-800 bg-zinc-950 py-14 sm:py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="max-w-4xl">
				<div
					class="inline-flex items-center gap-2 rounded border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-semibold text-amber-400 uppercase"
				>
					<span>⚙️</span> Контрактное ЧПУ производство · Калининград
				</div>
				<h1 class="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
					Металлообработка с ЧПУ на заказ в Калининграде: токарные и фрезерные работы
				</h1>
				<p class="mt-5 text-base leading-relaxed text-zinc-300 sm:text-lg">
					Изготовление прецизионных серийных деталей по чертежам заказчика для судостроения,
					агропромышленного комплекса, приборостроения и спецтехники. Допуски до
					<strong class="font-mono text-amber-400">IT6–IT7</strong>, безналичный расчет с НДС 20%,
					инструментальный контроль ОТК приборами Mitutoyo.
				</p>
				<div class="mt-8 flex flex-wrap items-center gap-4">
					<a
						href="#calculator-section"
						class="rounded border border-amber-500 bg-amber-500 px-6 py-3 font-mono text-sm font-bold text-zinc-950 transition-colors hover:bg-amber-400"
					>
						⚡ Инженерный калькулятор онлайн
					</a>
					<a
						href="mailto:{siteConfig.contactEmail}"
						class="rounded border border-zinc-700 bg-zinc-900 px-6 py-3 font-mono text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white"
					>
						✉️ Отправить чертежи на {siteConfig.contactEmail}
					</a>
				</div>
			</div>

			<!-- Quantitative Trust Metrics Bar (Hallmark Data Sheet) -->
			<div
				class="mt-12 grid grid-cols-2 gap-4 border-t border-zinc-800 pt-8 font-mono text-xs sm:grid-cols-4"
			>
				<div class="rounded border border-zinc-900 bg-zinc-900/40 p-4">
					<div class="text-zinc-500">Станочный парк:</div>
					<div class="mt-1 text-base font-bold text-white">4 ЧПУ центра</div>
					<div class="mt-0.5 text-[11px] text-zinc-400">Токарные и 3D фрезерные</div>
				</div>
				<div class="rounded border border-zinc-900 bg-zinc-900/40 p-4">
					<div class="text-zinc-500">Точность деталей:</div>
					<div class="mt-1 text-base font-bold text-emerald-400">до IT6 (Ra 0.4)</div>
					<div class="mt-0.5 text-[11px] text-zinc-400">Шлифование и ОТК Mitutoyo</div>
				</div>
				<div class="rounded border border-zinc-900 bg-zinc-900/40 p-4">
					<div class="text-zinc-500">Сроки поставки:</div>
					<div class="mt-1 text-base font-bold text-amber-400">5 – 7 дней</div>
					<div class="mt-0.5 text-[11px] text-zinc-400">Экспресс-запуск 48ч</div>
				</div>
				<div class="rounded border border-zinc-900 bg-zinc-900/40 p-4">
					<div class="text-zinc-500">Порог заказа:</div>
					<div class="mt-1 text-base font-bold text-white">от 5 000 ₽</div>
					<div class="mt-0.5 text-[11px] text-zinc-400">Безнал с НДС 20% / УСН</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Core Machining Services Grid -->
	<section
		class="border-b border-zinc-800 bg-zinc-950 py-16"
		aria-labelledby="services-overview-heading"
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="max-w-3xl">
				<div class="font-mono text-xs font-bold tracking-wider text-amber-400 uppercase">
					Технологические переделы
				</div>
				<h2 id="services-overview-heading" class="mt-2 text-2xl font-bold text-white sm:text-3xl">
					Производственные участки цеха {siteConfig.brandName}
				</h2>
			</div>

			<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
				<!-- Card 1: Turning -->
				<div
					class="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700"
				>
					<div>
						<div class="font-mono text-xs text-amber-400">01 / Токарная группа</div>
						<h3 class="mt-2 text-lg font-bold text-white">Токарные работы с ЧПУ</h3>
						<p class="mt-2 text-xs leading-relaxed text-zinc-400">
							Обработка тел вращения: валы, оси, втулки, фланцы, резьбовые переходники. Диаметр до
							320 мм, длина до 750 мм. Квалитеты точности IT7–IT8.
						</p>
						<div class="mt-4 space-y-1 font-mono text-[11px] text-zinc-300">
							<div>• Базовая ставка: <strong class="text-amber-400">2 500 ₽ / час</strong></div>
							<div>• Серии: <strong class="text-white">от 5 до 1 000 шт.</strong></div>
						</div>
					</div>
					<div class="mt-6 border-t border-zinc-800 pt-4">
						<a
							href="/tokarnye-raboty-chpu/"
							class="font-mono text-xs font-semibold text-amber-400 hover:underline"
						>
							Параметры токарного участка →
						</a>
					</div>
				</div>

				<!-- Card 2: Milling -->
				<div
					class="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700"
				>
					<div>
						<div class="font-mono text-xs text-amber-400">02 / Фрезерная группа</div>
						<h3 class="mt-2 text-lg font-bold text-white">Фрезерные работы ЧПУ (3 и 4 оси)</h3>
						<p class="mt-2 text-xs leading-relaxed text-zinc-400">
							Высокоскоростная обработка корпусных деталей, плит, приборных блоков и кронштейнов.
							Рабочая зона 800×500×500 мм с поворотной 4-й осью.
						</p>
						<div class="mt-4 space-y-1 font-mono text-[11px] text-zinc-300">
							<div>• 3 оси: <strong class="text-amber-400">3 000 ₽ / час</strong></div>
							<div>• 4 оси / 3D: <strong class="text-amber-400">3 500 ₽ / час</strong></div>
						</div>
					</div>
					<div class="mt-6 border-t border-zinc-800 pt-4">
						<a
							href="/frezernye-raboty-chpu/"
							class="font-mono text-xs font-semibold text-amber-400 hover:underline"
						>
							Параметры фрезерного участка →
						</a>
					</div>
				</div>

				<!-- Card 3: Finishing & Gears -->
				<div
					class="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700"
				>
					<div>
						<div class="font-mono text-xs text-amber-400">03 / Финишная доводка</div>
						<h3 class="mt-2 text-lg font-bold text-white">Зуборезка и шлифование</h3>
						<p class="mt-2 text-xs leading-relaxed text-zinc-400">
							Нарезка цилиндрических шестерен m1–m8, прямобочных и эвольвентных шлицев. Прецизионное
							круглое и плоское шлифование до IT6 (Ra 0.4), закалка ТВЧ.
						</p>
						<div class="mt-4 space-y-1 font-mono text-[11px] text-zinc-300">
							<div>• Чистота поверхности: <strong class="text-emerald-400">Ra 0.4 мкм</strong></div>
							<div>• Твердость ТВЧ: <strong class="text-white">до 55 HRCэ</strong></div>
						</div>
					</div>
					<div class="mt-6 border-t border-zinc-800 pt-4">
						<a
							href="/zuboreznye-i-shlifovalnye-raboty/"
							class="font-mono text-xs font-semibold text-amber-400 hover:underline"
						>
							Параметры зуборезного участка →
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Interactive Cost Calculator Section -->
	<section
		id="calculator-section"
		class="border-b border-zinc-800 bg-zinc-950 py-16"
		aria-label="Калькулятор стоимости ЧПУ онлайн"
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<CostCalculator />
		</div>
	</section>

	<!-- Regional Industrial Clusters Coverage -->
	<section
		class="border-b border-zinc-800 bg-zinc-950 py-16"
		aria-labelledby="regional-presence-heading"
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<h2 id="regional-presence-heading" class="text-2xl font-bold text-white sm:text-3xl">
				Географический охват и логистика по Калининградской области
			</h2>
			<p class="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
				Цех расположен в пригороде Калининграда с оперативным выездом на Окружную дорогу, что
				обеспечивает быструю доставку деталей ключевым региональным заказчикам:
			</p>
			<div class="mt-8 grid grid-cols-1 gap-4 font-mono text-xs sm:grid-cols-2 lg:grid-cols-4">
				<div class="rounded-lg border border-zinc-900 bg-zinc-900/60 p-4">
					<div class="font-bold text-amber-400">г. Калининград</div>
					<div class="mt-1 text-zinc-300">Машиностроение, приборостроение, гидравлика, остовы</div>
				</div>
				<div class="rounded-lg border border-zinc-900 bg-zinc-900/60 p-4">
					<div class="font-bold text-amber-400">г. Светлый</div>
					<div class="mt-1 text-zinc-300">Судоремонт, гребные валы, втулки, забортная арматура</div>
				</div>
				<div class="rounded-lg border border-zinc-900 bg-zinc-900/60 p-4">
					<div class="font-bold text-amber-400">г. Балтийск</div>
					<div class="mt-1 text-zinc-300">Портовая инфраструктура, шпильки, ремонтные муфты</div>
				</div>
				<div class="rounded-lg border border-zinc-900 bg-zinc-900/60 p-4">
					<div class="font-bold text-amber-400">Гурьевский район</div>
					<div class="mt-1 text-zinc-300">
						Агропромышленный комплекс, спецтехника, пальцы, шестерни
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Technical FAQ Section -->
	<section class="border-b border-zinc-800 bg-zinc-950 py-16" aria-labelledby="faq-heading">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="max-w-3xl">
				<div class="font-mono text-xs font-bold tracking-wider text-amber-400 uppercase">
					Часто задаваемые вопросы
				</div>
				<h2 id="faq-heading" class="mt-2 text-2xl font-bold text-white sm:text-3xl">
					Инженерные и организационные вопросы заказчиков
				</h2>
			</div>

			<div class="mt-8 space-y-4">
				{#each faqs as faq}
					<div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
						<h3 class="text-base font-bold text-white">{faq.question}</h3>
						<p class="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">{faq.answer}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Contact CTA Anchor Target -->
	<section id="order-form" class="bg-zinc-950 py-16 text-center">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 md:p-12">
				<h2 class="text-2xl font-bold text-white sm:text-3xl">
					Готовы рассчитать точную смету по вашей конструкторской документации?
				</h2>
				<p class="mt-3 text-sm text-zinc-400">
					Направьте чертежи (PDF, DXF, DWG) или 3D-модели (STEP, IGES) на электронную почту главного
					технолога:
				</p>
				<div class="mt-6 flex flex-wrap items-center justify-center gap-4">
					<a
						href="mailto:{siteConfig.contactEmail}"
						class="rounded border border-amber-500 bg-amber-500 px-6 py-3 font-mono text-sm font-bold text-zinc-950 transition-colors hover:bg-amber-400"
					>
						✉️ {siteConfig.contactEmail}
					</a>
					<a
						href="tel:{siteConfig.contactPhone}"
						class="rounded border border-zinc-700 bg-zinc-800 px-6 py-3 font-mono text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white"
					>
						📞 {siteConfig.contactPhone}
					</a>
				</div>
				<p class="mt-4 font-mono text-[11px] text-zinc-500">
					Конфиденциальность гарантируется (NDA по запросу). Безналичный расчет с НДС 20% / УСН.
				</p>
			</div>
		</div>
	</section>
</main>
