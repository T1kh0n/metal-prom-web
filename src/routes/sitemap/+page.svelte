<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [{ name: 'Карта сайта', path: '/sitemap/' }];

	const sitemapSections = [
		{
			title: 'Основные разделы производства',
			links: [
				{
					name: 'Главная страница',
					href: '/',
					desc: 'Высокоточная металлообработка с ЧПУ в Калининграде: токарные и фрезерные работы, допуски IT6-IT7, НДС 20%.'
				},
				{
					name: 'Инженерный онлайн-калькулятор стоимости ЧПУ',
					href: '/kalkulyator-stoimosti-chpu/',
					desc: 'Мгновенный расчет себестоимости деталей по нормо-часам с загрузкой 3D-моделей STL/STEP и партионными скидками.'
				},
				{
					name: 'Портфолио изготовленных деталей и кейсы',
					href: '/portfolio/',
					desc: 'Примеры выполненных заказов: гребные валы для судостроения, пальцы с ТВЧ-закалкой, герметичные корпуса из Д16Т.'
				},
				{
					name: 'Контакты, реквизиты и логистика',
					href: '/kontakty/',
					desc: 'Фактический адрес цеха, телефоны диспетчерской, электронная почта для чертежей, реквизиты для договоров с НДС.'
				}
			]
		},
		{
			title: 'Производственные услуги механического цеха',
			links: [
				{
					name: 'Токарные работы с ЧПУ',
					href: '/tokarnye-raboty-chpu/',
					desc: 'Токарная обработка тел вращения диаметром до 320 мм и длиной до 750 мм. Изготовление валов, втулок, фланцев, осей.'
				},
				{
					name: 'Фрезерные работы с ЧПУ (3 и 4 оси)',
					href: '/frezernye-raboty-chpu/',
					desc: 'Высокоскоростное фрезерование корпусных деталей, плит, кронштейнов и сложной 3D-геометрии в зоне 800×500×500 мм.'
				},
				{
					name: 'Зуборезные и шлифовальные работы',
					href: '/zuboreznye-i-shlifovalnye-raboty/',
					desc: 'Нарезка прямозубых и косозубых шестерен модулей m1-m8, нарезка шлицев, круглое и плоское шлифование до IT6 (Ra 0.4).'
				}
			]
		},
		{
			title: 'Контроль качества и стандарты',
			links: [
				{
					name: 'Лаборатория ОТК, метрология и парк станков',
					href: '/kontrol-kachestva-i-oborudovanie/',
					desc: 'Трехэтапный контроль качества FAI, поверочный инструмент Mitutoyo, сертификаты ГОСТ и паспорт каждого изделия.'
				}
			]
		},
		{
			title: 'Инженерная база знаний и статьи',
			links: [
				{
					name: 'База знаний цеха (каталог статей)',
					href: '/stati/',
					desc: 'Экспертные статьи технологов по проектированию, допускам, термообработке и режимам резания.'
				},
				{
					name: 'Выбор сталей и сплавов для ЧПУ обработки',
					href: '/stati/vybor-stali-dlya-chpu-obrabotki/',
					desc: 'Сравнительный анализ обрабатываемости Ст45, 40Х, нержавеющей стали 12Х18Н10Т и дюралюминия Д16Т.'
				},
				{
					name: 'Квалитеты точности (IT6–IT12) и шероховатость Ra по ГОСТ',
					href: '/stati/kvalitety-tochnosti-i-sherohovatost-gost/',
					desc: 'Влияние квалитетов на трудоемкость, достижимая чистота поверхности и необходимость шлифования.'
				},
				{
					name: 'DFM-оптимизация: 7 правил снижения себестоимости ЧПУ',
					href: '/stati/optimizaciya-stoimosti-detaley-chpu/',
					desc: 'Практические советы конструкторам: радиусы сопряжений, глубина карманов, технологичность резьб.'
				}
			]
		},
		{
			title: 'Правовая информация',
			links: [
				{
					name: 'Политика конфиденциальности (152-ФЗ)',
					href: '/politika-konfidentsialnosti/',
					desc: 'Официальное заявление о не-сборе персональных данных физических лиц и регламенте анонимной работы.'
				}
			]
		}
	];
</script>

<svelte:head>
	<title>Карта сайта и каталог услуг ЧПУ металлообработки | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Полный структурированный каталог разделов сайта MetalProm39: токарные, фрезерные, шлифовальные услуги, калькулятор стоимости ЧПУ, статьи и реквизиты."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<header class="max-w-4xl border-b border-zinc-800 pb-8">
			<div
				class="inline-flex items-center gap-2 rounded border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-semibold text-amber-400 uppercase"
			>
				<span>🗺️</span> Структура ресурса
			</div>
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
					<h2 class="font-mono text-sm font-bold tracking-wider text-amber-400 uppercase">
						{section.title}
					</h2>
					<div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
						{#each section.links as link}
							<div
								class="rounded-lg border border-zinc-900 bg-zinc-900/40 p-4 transition-colors hover:border-zinc-700"
							>
								<a
									href={link.href}
									class="font-mono text-sm font-bold text-white transition-colors hover:text-amber-400 hover:underline"
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
