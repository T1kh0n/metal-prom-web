<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [{ name: 'Карта сайта', path: '/sitemap/' }];

	const sitemapSections = [
		{
			title: 'Производственные услуги механического цеха',
			links: [
				{
					name: 'Токарные работы с ЧПУ',
					href: '/tokarnye-raboty-chpu/',
					desc: 'Токарная обработка валов, втулок, фланцев до ⌀320 мм и длины 750 мм'
				},
				{
					name: 'Фрезерные работы с ЧПУ',
					href: '/frezernye-raboty-chpu/',
					desc: '3- и 4-осевое фрезерование корпусов, плит и кронштейнов с точностью ±0.005 мм'
				},
				{
					name: 'Зуборезные и шлифовальные работы',
					href: '/zuboreznye-i-shlifovalnye-raboty/',
					desc: 'Нарезка шестерен m1–m8, шлицевых соединений, шлифование валов до Ra 0.4 мкм и ТВЧ'
				}
			]
		},
		{
			title: 'Инженерные инструменты и контроль качества',
			links: [
				{
					name: 'Онлайн-калькулятор стоимости ЧПУ',
					href: '/kalkulyator-stoimosti-chpu/',
					desc: 'Интерактивный расчет нормо-часов, партионных скидок и загрузка 3D-моделей STEP/STL'
				},
				{
					name: 'Контроль качества (ОТК) и станочный парк',
					href: '/kontrol-kachestva-i-oborudovanie/',
					desc: 'Протокол FAI, измерительная лаборатория Mitutoyo и паспорта качества изделий'
				},
				{
					name: 'Портфолио выполненных деталей',
					href: '/portfolio/',
					desc: 'Реализованные проекты: судовые валы, гидравлические коллекторы, корпуса и шестерни'
				}
			]
		},
		{
			title: 'Инженерная база знаний и статьи',
			links: [
				{
					name: 'Все публикации базы знаний',
					href: '/stati/',
					desc: 'Руководства по выбору материалов, допускам и снижению себестоимости деталей'
				},
				{
					name: 'Выбор конструкционных и нержавеющих сталей',
					href: '/stati/vybor-stali-dlya-chpu-obrabotki/',
					desc: 'Сравнительный анализ обрабатываемости Ст45, 40Х, 09Г2С, 12Х18Н10Т и Д16Т'
				},
				{
					name: 'Квалитеты точности IT6–IT12 и шероховатость Ra',
					href: '/stati/kvalitety-tochnosti-i-sherohovatost-gost/',
					desc: 'Таблица допусков ГОСТ 25346 и экономическая целесообразность шлифования'
				},
				{
					name: 'DFM-оптимизация себестоимости деталей',
					href: '/stati/optimizaciya-stoimosti-detaley-chpu/',
					desc: '7 правил конструирования технологичных деталей для снижения цены на 25–40%'
				}
			]
		},
		{
			title: 'Контакты и правовая информация',
			links: [
				{
					name: 'Контакты и схема проезда',
					href: '/kontakty/',
					desc: 'Телефон цеха, инженерная почта, реквизиты юридического лица с НДС 20%'
				},
				{
					name: 'Политика конфиденциальности и 152-ФЗ',
					href: '/politika-konfidentsialnosti/',
					desc: 'Правовой статус B2B-взаимодействия и регламент защиты КД заказчиков (NDA)'
				}
			]
		}
	];
</script>

<svelte:head>
	<title>Карта сайта и каталог услуг механообработки | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Карта сайта металлообрабатывающего цеха MetalProm39 в Калининграде. Полный перечень услуг токарной, фрезерной обработки, калькулятора и статей."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<header class="border-b border-[var(--color-rule)] pb-8">
			<h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">
				Карта сайта и каталог услуг цеха
			</h1>
			<p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
				Иерархическая структура сайта цеха {siteConfig.brandName}. Навигация по технологическим
				услугам, оборудованию, базе знаний и онлайн-калькулятору.
			</p>
		</header>

		<!-- Sitemap Tree -->
		<div class="mt-10 space-y-10">
			{#each sitemapSections as section}
				<section class="border-b border-[var(--color-rule)] pb-8">
					<h2 class="text-xs font-normal text-[var(--color-muted)]">
						{section.title}
					</h2>
					<div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
						{#each section.links as link}
							<div class="well transition-colors hover:border-[var(--color-rule-2)]">
								<a
									href={link.href}
									class="text-xs font-normal text-[var(--color-ink)] hover:underline"
								>
									{link.name} &rarr;
								</a>
								<p class="mt-1.5 text-xs leading-relaxed text-[var(--color-muted)]">{link.desc}</p>
							</div>
						{/each}
					</div>
				</section>
			{/each}
		</div>
	</div>
</main>
