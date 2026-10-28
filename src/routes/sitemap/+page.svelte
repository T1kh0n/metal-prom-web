<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [{ name: 'Карта сайта', path: '/sitemap/' }];

	const sitemapSections = [
		{
			title: 'Основные разделы и производственные участки',
			links: [
				{
					name: 'Главная страница',
					href: '/',
					desc: 'Обзор производственного цеха, сводка возможностей, базовые параметры и онлайн-калькулятор.'
				},
				{
					name: 'Токарные работы с ЧПУ',
					href: '/tokarnye-raboty-chpu/',
					desc: 'Обработка тел вращения: валы, оси, фланцы, втулки до ⌀320 мм, длина до 750 мм.'
				},
				{
					name: 'Фрезерные работы с ЧПУ (3 и 4 оси)',
					href: '/frezernye-raboty-chpu/',
					desc: 'Высокоточная обработка корпусов, плит, приборных блоков. Поворотный стол, поле 800×500×500 мм.'
				},
				{
					name: 'Зуборезные и шлифовальные работы',
					href: '/zuboreznye-i-shlifovalnye-raboty/',
					desc: 'Нарезание шестерен m1-m8, шлицевых валов, круглое шлифование до IT6 (Ra 0.4 мкм), закалка ТВЧ.'
				},
				{
					name: 'Инженерный калькулятор стоимости ЧПУ',
					href: '/kalkulyator-stoimosti-chpu/',
					desc: 'Интерактивный расчет сметы по нормо-часам, анализ 3D-моделей (STL/STEP) и серийные скидки.'
				},
				{
					name: 'Портфолио выполненных деталей',
					href: '/portfolio/',
					desc: 'Кейсы изготовленных гребных валов, гидрофланцев, фрезерованных корпусов и шестерен.'
				},
				{
					name: 'Контроль качества (ОТК) и станочный парк',
					href: '/kontrol-kachestva-i-oborudovanie/',
					desc: 'Метрологическая лаборатория, цифровые приборы Mitutoyo, паспорт изделия и перечень станков.'
				},
				{
					name: 'Контакты и реквизиты цеха',
					href: '/kontakty/',
					desc: 'Прямые контакты диспетчера, почта для чертежей, схема проезда в Калининграде и реквизиты B2B.'
				}
			]
		},
		{
			title: 'Инженерная база знаний и статьи',
			links: [
				{
					name: 'Все статьи базы знаний',
					href: '/stati/',
					desc: 'Каталог экспертных материалов главных технологов для конструкторов и снабженцев.'
				},
				{
					name: 'Выбор сталей для ЧПУ обработки',
					href: '/stati/vybor-stali-dlya-chpu-obrabotki/',
					desc: 'Анализ обрабатываемости марок Ст45, 40Х, 09Г2С, 12Х18Н10Т и алюминия Д16Т.'
				},
				{
					name: 'Квалитеты точности IT6–IT12 и шероховатость Ra',
					href: '/stati/kvalitety-tochnosti-i-sherohovatost-gost/',
					desc: 'Таблицы допусков по ГОСТ 25346-2015, влияние точности на себестоимость деталей.'
				},
				{
					name: 'DFM-оптимизация себестоимости деталей',
					href: '/stati/optimizaciya-stoimosti-detaley-chpu/',
					desc: '7 ключевых правил проектирования для снижения цены металлообработки на 25–40%.'
				}
			]
		},
		{
			title: 'Правовая документация',
			links: [
				{
					name: 'Политика конфиденциальности и 152-ФЗ',
					href: '/politika-konfidentsialnosti/',
					desc: 'Правовая позиция ресурса: формат B2B, отсутствие сбора персональных данных граждан.'
				}
			]
		}
	];
</script>

<svelte:head>
	<title>Карта сайта и навигация по каталогу услуг ЧПУ | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Карта сайта металлообрабатывающего цеха MetalProm39 в Калининграде. Полный перечень услуг токарной, фрезерной обработки, калькулятора и статей."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<header class="max-w-4xl border-b border-zinc-800 pb-8">
			<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
				Карта сайта и каталог услуг механической обработки в Калининграде
			</h1>
			<p class="mt-4 text-base leading-relaxed text-zinc-300">
				Полная иерархическая структура веб-сайта производственного цеха {siteConfig.brandName}.
				Быстрый доступ к описаниям технологических возможностей, инженерным руководствам и расчетным
				инструментам.
			</p>
		</header>

		<!-- Sitemap Tree -->
		<div class="mt-10 space-y-10">
			{#each sitemapSections as section}
				<section class="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
					<h2 class="text-xs font-semibold text-zinc-300">
						{section.title}
					</h2>
					<div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
						{#each section.links as link}
							<div
								class="rounded-lg border border-zinc-900 bg-zinc-900/40 p-4 transition-colors hover:border-zinc-700"
							>
								<a
									href={link.href}
									class="text-sm font-semibold text-white transition-colors hover:text-zinc-300 hover:underline"
								>
									{link.name}
								</a>
								<p class="mt-2 text-xs leading-relaxed text-zinc-400">{link.desc}</p>
							</div>
						{/each}
					</div>
				</section>
			{/each}
		</div>
	</div>
</main>
