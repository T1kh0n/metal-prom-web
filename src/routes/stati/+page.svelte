<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [{ name: 'База знаний', path: '/stati/' }];

	const articles = [
		{
			slug: 'vybor-stali-dlya-chpu-obrabotki',
			title:
				'Выбор сталей и сплавов для ЧПУ обработки: сравнительный анализ Ст45, 40Х, 12Х18Н10Т и Д16Т',
			excerpt:
				'Инженерное руководство по подбору конструкционных материалов. Анализ коэффициента обрабатываемости Kmat, температурных деформаций, склонности к налипанию и режимов термообработки.',
			date: '2026-10-25',
			readTime: '7 мин',
			category: 'Материаловедение'
		},
		{
			slug: 'kvalitety-tochnosti-i-sherohovatost-gost',
			title: 'Квалитеты точности (IT6–IT12) и шероховатость поверхности (Ra) по ГОСТ 25346-2015',
			excerpt:
				'Как выбор допуска влияет на себестоимость механообработки. Экспоненциальный рост трудоемкости при переходе от токарного IT8 к шлифовальному IT6 и нормативы финишной доводки.',
			date: '2026-10-26',
			readTime: '9 мин',
			category: 'Метрология и стандарты'
		},
		{
			slug: 'optimizaciya-stoimosti-detaley-chpu',
			title:
				'DFM-оптимизация: 7 правил проектирования деталей для снижения себестоимости ЧПУ на 25–40%',
			excerpt:
				'Практические рекомендации конструкторам: радиусы сопряжений под стандартные фрезы, глубина карманов, технологичность резьбовых отверстий и оптимальный размер партии.',
			date: '2026-10-27',
			readTime: '8 мин',
			category: 'DFM и проектирование'
		}
	];
</script>

<svelte:head>
	<title>Инженерная база знаний и статьи по металлообработке | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Технические статьи и руководства по ЧПУ металлообработке: выбор сталей, квалитеты IT6-IT12, шероховатость Ra, DFM-проектирование для снижения себестоимости деталей."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<header class="max-w-4xl border-b border-zinc-800 pb-8">
			<div
				class="inline-flex items-center gap-2 rounded border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-semibold text-amber-400 uppercase"
			>
				<span>📚</span> Инженерная база знаний
			</div>
			<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
				Техническая база знаний по механической обработке с ЧПУ
			</h1>
			<p class="mt-4 text-base leading-relaxed text-zinc-300">
				Экспертные публикации главных технологов цеха {siteConfig.brandName}. Руководства по выбору
				марок сталей, расчету допусков и посадок по ГОСТ, а также методикам снижения себестоимости
				серийных партий для главных инженеров и конструкторов предприятий.
			</p>
		</header>

		<!-- Articles Grid -->
		<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each articles as article}
				<article
					class="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-zinc-700"
				>
					<div>
						<div class="flex items-center justify-between font-mono text-xs text-zinc-500">
							<span class="rounded bg-zinc-900 px-2 py-0.5 text-amber-400">{article.category}</span>
							<span>{article.readTime}</span>
						</div>
						<h2 class="mt-4 text-lg leading-snug font-bold text-white hover:text-amber-400">
							<a href="/stati/{article.slug}/">{article.title}</a>
						</h2>
						<p class="mt-3 text-xs leading-relaxed text-zinc-400">{article.excerpt}</p>
					</div>

					<div class="mt-6 border-t border-zinc-900 pt-4">
						<a
							href="/stati/{article.slug}/"
							class="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-amber-400 hover:text-amber-300"
						>
							<span>Читать инженерный разбор</span>
							<span>→</span>
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</main>
