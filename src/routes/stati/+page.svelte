<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [{ name: 'База знаний', path: '/stati/' }];

	const articles = [
		{
			slug: 'vybor-stali-dlya-chpu-obrabotki',
			title:
				'Выбор конструкционных и нержавеющих сталей для ЧПУ обработки: Ст45, 40Х, 09Г2С, AISI 304',
			category: 'Материаловедение',
			readTime: '6 мин чтения',
			excerpt:
				'Сравнительный технологический анализ обрабатываемости ключевых марок сталей. Коэффициенты обрабатываемости Кv, влияние легирования на износ инструмента и себестоимость нормо-часа.'
		},
		{
			slug: 'kvalitety-tochnosti-i-sherohovatost-gost',
			title:
				'Квалитеты точности IT6–IT12 и шероховатость поверхности Ra по ГОСТ в контрактном производстве',
			category: 'Метрология и стандарты',
			readTime: '8 мин чтения',
			excerpt:
				'Инженерное руководство по назначению допусков и шероховатости на чертежах. Почему необоснованное завышение требований до IT6 удорожает партию в 2–3 раза и когда требуется круглое шлифование.'
		},
		{
			slug: 'optimizaciya-stoimosti-detaley-chpu',
			title:
				'DFM-оптимизация: как снизить себестоимость фрезерованных и токарных деталей на 20–40%',
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

		<header class="border-b border-[var(--color-rule)] pb-8">
			<h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">
				База знаний по металлообработке с ЧПУ
			</h1>
			<p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
				Инженерные статьи и руководства технологов: выбор сталей, назначение допусков по ГОСТ и
				DFM-оптимизация себестоимости деталей.
			</p>
		</header>

		<!-- Articles Grid -->
		<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each articles as article}
				<article
					class="well flex flex-col justify-between transition-colors hover:border-[var(--color-rule-2)]"
				>
					<div>
						<div class="flex items-center justify-between text-xs text-[var(--color-muted)]">
							<span
								class="rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper)] px-2 py-0.5"
							>
								{article.category}
							</span>
							<span class="num">{article.readTime}</span>
						</div>
						<h2
							class="mt-4 text-base leading-snug font-normal text-[var(--color-ink)] hover:text-white"
						>
							<a href="/stati/{article.slug}/">{article.title}</a>
						</h2>
						<p class="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">{article.excerpt}</p>
					</div>

					<div class="mt-6 border-t border-[var(--color-rule)] pt-4">
						<a
							href="/stati/{article.slug}/"
							class="text-xs text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
						>
							Читать инженерный разбор &rarr;
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</main>
