<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [
		{ name: 'Политика конфиденциальности', path: '/politika-konfidentsialnosti/' }
	];
</script>

<svelte:head>
	<title>Политика конфиденциальности и правовой статус 152-ФЗ | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Официальная правовая позиция цеха MetalProm39 по 152-ФЗ: работа исключительно в формате B2B, отсутствие сбора персональных данных, регламент защиты КД заказчиков."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<article>
			<header class="border-b border-[var(--color-rule)] pb-8">
				<h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">
					Политика конфиденциальности цеха
				</h1>
				<p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
					Правовые стандарты взаимодействия по 152-ФЗ, статус не-оператора персональных данных и
					регламент защиты чертежей заказчиков.
				</p>
				<p class="num mt-2 text-xs text-[var(--color-muted)]">
					Редакция от 28 октября 2026 года · Механический цех {siteConfig.brandLegalName}
				</p>
			</header>

			<div class="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
				<div class="space-y-6 text-xs leading-relaxed text-[var(--color-muted)] lg:col-span-8">
					<!-- 152-FZ Non-Operator Posture Declaration -->
					<div class="well text-xs leading-relaxed text-[var(--color-ink-2)]">
						<div class="font-normal text-[var(--color-ink)]">
							Декларация о статусе не-оператора персональных данных:
						</div>
						<p class="mt-2 max-w-2xl text-xs leading-relaxed text-[var(--color-muted)]">
							Информационный ресурс <strong class="font-normal text-[var(--color-ink)]"
								>{siteConfig.siteDomain}</strong
							> не ведет сбор, систематизацию, хранение или передачу персональных данных физических лиц
							по 152-ФЗ. Ресурс не содержит форм регистрации, личных кабинетов или полей ввода персональных
							данных.
						</p>
					</div>

					<div class="space-y-6">
						<div>
							<h2 class="text-base text-[var(--color-ink)]">1. Общие положения и цели ресурса</h2>
							<p class="mt-2 max-w-2xl">
								1.1. Веб-сайт служит целям информирования юридических лиц и ИП о технических
								возможностях механообрабатывающего оборудования цеха {siteConfig.brandName}.
							</p>
							<p class="mt-2 max-w-2xl">
								1.2. Информация и предварительные расчеты калькулятора носят характер
								предварительной оценки и не являются публичной офертой до изучения КД технологом.
							</p>
						</div>

						<div>
							<h2 class="text-base text-[var(--color-ink)]">
								2. Анонимные технические опросники и калькулятор
							</h2>
							<p class="mt-2 max-w-2xl">
								2.1. Использование встроенного инженерного калькулятора добровольно и анонимно.
							</p>
							<p class="mt-2 max-w-2xl">
								2.2. Запрашиваемые параметры включают исключительно технические характеристики
								заказа (класс геометрии, марку металла, объем серии, квалитет точности).
							</p>
						</div>

						<div>
							<h2 class="text-base text-[var(--color-ink)]">3. Файлы cookie и аналитика</h2>
							<p class="mt-2 max-w-2xl">
								3.1. Для сохранения локальных настроек калькулятора сайт использует LocalStorage на
								устройстве пользователя.
							</p>
							<p class="mt-2 max-w-2xl">
								3.2. Веб-аналитика настроена с жестким соблюдением конфиденциальности: Вебвизор
								отключен, IP-адреса маскируются.
							</p>
						</div>

						<div>
							<h2 class="text-base text-[var(--color-ink)]">
								4. Корпоративное взаимодействие (B2B) и NDA
							</h2>
							<p class="mt-2 max-w-2xl">
								4.1. Связь с цехом и передача чертежей (PDF, DXF, STEP) осуществляется заказчиком по
								корпоративной почте <strong class="font-normal text-[var(--color-ink)]"
									>{siteConfig.contactEmail}</strong
								>.
							</p>
							<p class="mt-2 max-w-2xl">
								4.2. Все поступающие чертежи и технологические данные составляют коммерческую тайну
								и защищаются соглашением о конфиденциальности (NDA).
							</p>
						</div>
					</div>
				</div>

				<!-- Sidebar / Requisites (lg:col-span-4) -->
				<aside class="space-y-6 lg:col-span-4">
					<div class="well font-mono text-xs text-[var(--color-muted)]">
						<div class="font-sans font-normal text-[var(--color-ink)]">
							{siteConfig.brandLegalName}
						</div>
						<div class="num mt-2">ИНН: 3906999990 · КПП: 390601001</div>
						<div class="num">ОГРН: 1233900000000</div>
						<div class="mt-2 font-sans">
							{siteConfig.addressRegion}, {siteConfig.addressLocality}, {siteConfig.addressStreet}
						</div>
						<div class="mt-2 font-sans">
							Корреспонденция: {siteConfig.contactEmail}
						</div>
					</div>
				</aside>
			</div>
		</article>
	</div>
</main>
