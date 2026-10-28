<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [{ name: 'База знаний', path: '/stati/' }];

	const articles = [
		{
			slug: 'vybor-stali-dlya-chpu-obrabotki',
			title: 'Выбор конструкционных и нержавеющих сталей для ЧПУ обработки: Ст45, 40Х, 09Г2С, AISI 304',
			category: 'Материаловедение',
			readTime: '6 мин чтения',
			excerpt:
				'Сравнительный технологический анализ обрабатываемости ключевых марок сталей. Коэффициенты обрабатываемости Кv, влияние легирования на износ инструмента и себестоимость нормо-часа.'
		},
		{
			slug: 'kvalitety-tochnosti-i-sherohovatost-gost',
			title: 'Квалитеты точности IT6–IT12 и шероховатость поверхности Ra по ГОСТ в контрактном производстве',
			category: 'Метрология и стандарты',
			readTime: '8 мин чтения',
			excerpt:
				'Инженерное руководство по назначению допусков и шероховатости на чертежах. Почему необоснованное завышение требований до IT6 удорожает партию в 2–3 раза и когда требуется круглое шлифование.'
		},
		{
			slug: 'optimizaciya-stoimosti-detaley-chpu',
			title: 'DFM-оптимизация: как снизить себестоимость фрезерованных и токарных деталей на 20–40%',
			category: 'Экономика производства',
			readTime: '7 мин чтения',
			excerpt:
				'Практические рекомендации конструкторам (Design for Manufacturability): радиусы внутренних углов, глубина резьб, толщина стенок и технологические базы, позволяющие избежать брака и снизить машинное время.'
		}
	];
</script>

<svelte:head>
	<title>Инженерная база знаний и статьи по металлообработке с ЧПУ | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Технические статьи и руководства по выбору сталей, допускам IT6-IT12 по ГОСТ и DFM-оптимизации стоимости деталей для конструкторов и технологов от цеха MetalProm39."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<header class="max-w-4xl border-b border-zinc-800 pb-8">
			<div
				class="inline-flex items-center rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-1 font-mono text-xs font-medium text-zinc-300"
			>
				<span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
				Инженерная база знаний
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
							<span class="rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-zinc-300">
								{article.category}
							</span>
							<span>{article.readTime}</span>
						</div>
						<h2 class="mt-4 text-lg leading-snug font-bold text-white hover:text-zinc-300">
							<a href="/stati/{article.slug}/">{article.title}</a>
						</h2>
						<p class="mt-3 text-xs leading-relaxed text-zinc-400">{article.excerpt}</p>
					</div>

					<div class="mt-6 border-t border-zinc-900 pt-4">
						<a
							href="/stati/{article.slug}/"
							class="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white"
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
