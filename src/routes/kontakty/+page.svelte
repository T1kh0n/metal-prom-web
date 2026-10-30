<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [{ name: 'Контакты', path: '/kontakty/' }];
</script>

<svelte:head>
	<title>Контакты механического цеха ЧПУ в Калининграде | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Контакты цеха MetalProm39 в Калининграде: телефон +7 (4012) 00-00-00, электронная почта order@metalprom39.com. Реквизиты для договоров с НДС 20%, схема проезда."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<header class="border-b border-[var(--color-rule)] pb-8">
			<h1 class="mt-4 text-3xl text-[var(--color-ink)] sm:text-4xl">
				Контакты и реквизиты цеха ЧПУ
			</h1>
			<p class="lead mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
				Прием чертежей, ТЗ и заявок на контрактную металлообработку. Работаем напрямую с
				юридическими лицами и ИП по безналичному расчету с НДС 20%.
			</p>
		</header>

		<div class="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
			<!-- Contact Information Column -->
			<div class="space-y-6 lg:col-span-7">
				<!-- Communication Channels -->
				<div class="well">
					<h2 class="text-sm font-normal text-[var(--color-ink)]">Прямые контакты цеха</h2>
					<div class="mt-4 grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
						<div
							class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper)] p-4"
						>
							<div class="text-[var(--color-muted)]">Инженерный отдел (чертежи):</div>
							<a
								href="mailto:{siteConfig.contactEmail}"
								class="mt-1 block text-sm font-normal text-[var(--color-ink)] hover:underline"
							>
								{siteConfig.contactEmail}
							</a>
							<p class="mt-1 text-[11px] text-[var(--color-muted)]">
								Форматы: PDF, DXF, DWG, STEP, IGES
							</p>
						</div>
						<div
							class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper)] p-4"
						>
							<div class="text-[var(--color-muted)]">Диспетчер производства:</div>
							<a
								href="tel:{siteConfig.contactPhone}"
								class="num mt-1 block text-sm font-normal text-[var(--color-ink)] hover:underline"
							>
								{siteConfig.contactPhone}
							</a>
							<p class="mt-1 text-[11px] text-[var(--color-muted)]">
								Пн–Пт с 08:00 до 20:00 (МСК-1)
							</p>
						</div>
					</div>

					<div
						class="mt-5 border-t border-[var(--color-rule)] pt-4 text-xs text-[var(--color-muted)]"
					>
						<div>
							Фактический адрес производства:
							<strong class="font-normal text-[var(--color-ink)]">
								{siteConfig.addressRegion}, {siteConfig.addressLocality}, {siteConfig.addressStreet}
							</strong>
						</div>
						<div class="num mt-1 text-[var(--color-muted)]">
							Координаты GPS для навигаторов грузового транспорта:
							<span class="text-[var(--color-ink-2)]">54.7104° N, 20.5109° E</span>
						</div>
					</div>
				</div>

				<!-- Working Hours -->
				<div class="well">
					<h2 class="text-sm font-normal text-[var(--color-ink)]">
						Режим работы и отгрузки готовой продукции
					</h2>
					<div class="mt-4 space-y-2 text-xs text-[var(--color-ink-2)]">
						<div class="flex justify-between border-b border-[var(--color-rule)] py-2">
							<span class="text-[var(--color-muted)]">Производственные смены станков ЧПУ:</span>
							<span class="num text-[var(--color-ink)]"
								>Понедельник — Пятница: 08:00 – 20:00 (2 смены)</span
							>
						</div>
						<div class="flex justify-between border-b border-[var(--color-rule)] py-2">
							<span class="text-[var(--color-muted)]">Инженерно-технологический отдел:</span>
							<span class="num text-[var(--color-ink)]">Понедельник — Пятница: 08:30 – 17:30</span>
						</div>
						<div class="flex justify-between py-2">
							<span class="text-[var(--color-muted)]">Склад отгрузки и дежурный мастер:</span>
							<span class="num text-[var(--color-ink)]">Суббота: 09:00 – 15:00</span>
						</div>
					</div>
				</div>

				<!-- Logistics in Kaliningrad Oblast -->
				<div class="well">
					<h2 class="text-sm font-normal text-[var(--color-ink)]">
						Транспортная доступность и логистика
					</h2>
					<p class="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">
						Производственная площадка расположена вблизи Большой Окружной дороги Калининграда,
						обеспечивая свободный заезд грузовых автомобилей без ограничений по тоннажу:
					</p>
					<ul class="mt-3 list-inside list-disc space-y-1 text-xs text-[var(--color-ink-2)]">
						<li>Удобный выезд на автотрассу в направлении портов Светлый и Балтийск;</li>
						<li>
							Прямое сообщение с промышленными парками Гурьевска, Багратионовска и Черняховска;
						</li>
						<li>Возможность отправки готовых партий курьерскими службами (СДЭК, Деловые Линии).</li>
					</ul>
				</div>
			</div>

			<!-- Requisites & Compliance Column -->
			<div class="space-y-6 lg:col-span-5">
				<div class="well">
					<h2 class="text-xs font-normal text-[var(--color-ink)]">
						Реквизиты для заключения договоров
					</h2>
					<div class="mt-4 space-y-3 text-xs text-[var(--color-muted)]">
						<div>
							<span class="text-[var(--color-muted)]">Полное наименование:</span>
							<div class="font-normal text-[var(--color-ink)]">{siteConfig.brandLegalName}</div>
						</div>
						<div class="grid grid-cols-2 gap-2">
							<div>
								<span class="text-[var(--color-muted)]">ИНН:</span>
								<div class="num font-normal text-[var(--color-ink)]">3906999990</div>
							</div>
							<div>
								<span class="text-[var(--color-muted)]">КПП:</span>
								<div class="num font-normal text-[var(--color-ink)]">390601001</div>
							</div>
						</div>
						<div>
							<span class="text-[var(--color-muted)]">ОГРН:</span>
							<div class="num font-normal text-[var(--color-ink)]">1233900000000</div>
						</div>
						<div>
							<span class="text-[var(--color-muted)]">Налогообложение:</span>
							<div class="text-[var(--color-ink)]">ОСНО с выделением НДС 20% / УСН</div>
						</div>
						<div class="border-t border-[var(--color-rule)] pt-3">
							<span class="text-[var(--color-muted)]">Электронный документооборот (ЭДО):</span>
							<div class="mt-1 text-[var(--color-ink)]">Диадок (СКБ Контур) / СБИС (Тензор)</div>
						</div>
					</div>
				</div>

				<!-- Legal 152-FZ Compliance Box -->
				<div class="well text-xs text-[var(--color-muted)]">
					<div class="font-normal text-[var(--color-ink)]">
						Гарантия конфиденциальности (152-ФЗ):
					</div>
					<p class="mt-2 text-[11px] leading-relaxed text-[var(--color-muted)]">
						Настоящий ресурс предназначен строго для взаимодействия между предприятиями (B2B). Мы не
						собираем и не обрабатываем персональные данные. Все чертежи защищаются соглашением NDA.
					</p>
				</div>
			</div>
		</div>
	</div>
</main>
