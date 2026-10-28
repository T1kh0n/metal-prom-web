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

		<header class="max-w-4xl border-b border-zinc-800 pb-8">
			<div
				class="inline-flex items-center gap-2 rounded border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-semibold text-amber-400 uppercase"
			>
				<span>📍</span> Прямая B2B связь
			</div>
			<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
				Контакты, реквизиты цеха и логистика в Калининградской области
			</h1>
			<p class="mt-4 text-base leading-relaxed text-zinc-300">
				Прием чертежей, технических заданий (ТЗ) и заявок на контрактную металлообработку деталей
				любой сложности. Работаем напрямую с юридическими лицами и ИП по безналичному расчету с НДС
				20%.
			</p>
		</header>

		<div class="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
			<!-- Contact Information Column -->
			<div class="space-y-6 lg:col-span-7">
				<!-- Communication Channels -->
				<div class="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
					<h2 class="text-base font-bold text-white">Прямые контакты цеха</h2>
					<div class="mt-5 grid grid-cols-1 gap-4 font-mono text-xs sm:grid-cols-2">
						<div class="rounded border border-zinc-900 bg-zinc-900/60 p-4">
							<div class="text-zinc-500">Инженерный отдел (чертежи):</div>
							<a
								href="mailto:{siteConfig.contactEmail}"
								class="mt-1 block text-sm font-bold text-amber-400 hover:underline"
							>
								{siteConfig.contactEmail}
							</a>
							<p class="mt-1 font-sans text-[11px] text-zinc-500">
								Форматы: PDF, DXF, DWG, STEP, IGES
							</p>
						</div>
						<div class="rounded border border-zinc-900 bg-zinc-900/60 p-4">
							<div class="text-zinc-500">Диспетчер производства:</div>
							<a
								href="tel:{siteConfig.contactPhone}"
								class="mt-1 block text-sm font-bold text-amber-400 hover:underline"
							>
								{siteConfig.contactPhone}
							</a>
							<p class="mt-1 font-sans text-[11px] text-zinc-500">Пн–Пт с 08:00 до 20:00 (МСК-1)</p>
						</div>
					</div>

					<div class="mt-5 border-t border-zinc-900 pt-4 font-mono text-xs text-zinc-400">
						<div>
							Фактический адрес производства:
							<strong class="text-zinc-200">
								{siteConfig.addressRegion}, {siteConfig.addressLocality}, {siteConfig.addressStreet}
							</strong>
						</div>
						<div class="mt-1 text-zinc-500">
							Координаты GPS для навигаторов грузового транспорта:
							<span class="text-zinc-300">54.7104° N, 20.5109° E</span>
						</div>
					</div>
				</div>

				<!-- Working Hours -->
				<div class="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
					<h2 class="text-base font-bold text-white">Режим работы и отгрузки готовой продукции</h2>
					<div class="mt-4 space-y-2 font-mono text-xs text-zinc-300">
						<div class="flex justify-between border-b border-zinc-900 py-2">
							<span class="text-zinc-400">Производственные смены станков ЧПУ:</span>
							<span class="font-bold text-white"
								>Понедельник — Пятница: 08:00 – 20:00 (2 смены)</span
							>
						</div>
						<div class="flex justify-between border-b border-zinc-900 py-2">
							<span class="text-zinc-400">Инженерно-технологический отдел:</span>
							<span class="font-bold text-white">Понедельник — Пятница: 08:30 – 17:30</span>
						</div>
						<div class="flex justify-between py-2">
							<span class="text-zinc-400">Склад отгрузки и дежурный мастер:</span>
							<span class="font-bold text-amber-400">Суббота: 09:00 – 15:00</span>
						</div>
					</div>
				</div>

				<!-- Logistics in Kaliningrad Oblast -->
				<div class="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
					<h2 class="text-base font-bold text-white">Транспортная доступность и логистика</h2>
					<p class="mt-3 text-xs leading-relaxed text-zinc-400">
						Производственная площадка расположена в непосредственной близости от Большой Окружной
						дороги г. Калининграда, что обеспечивает свободный заезд грузовых автомобилей без
						ограничений по тоннажу:
					</p>
					<ul class="mt-3 list-inside list-disc space-y-1 text-xs text-zinc-300">
						<li>Удобный выезд на автотрассу в направлении портов г. Светлый и г. Балтийск;</li>
						<li>
							Прямое сообщение с промышленными парками Гурьевска, Багратионовска и Черняховска;
						</li>
						<li>
							Возможность отправки готовых партий курьерскими службами (СДЭК, Деловые Линии) по всей
							области.
						</li>
					</ul>
				</div>
			</div>

			<!-- Requisites & Compliance Column -->
			<div class="space-y-6 lg:col-span-5">
				<div class="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
					<h2 class="font-mono text-xs font-bold tracking-wider text-zinc-200 uppercase">
						Реквизиты для заключения договоров
					</h2>
					<div class="mt-4 space-y-3 font-mono text-xs text-zinc-400">
						<div>
							<span class="text-zinc-500">Полное наименование:</span>
							<div class="font-sans font-bold text-zinc-200">{siteConfig.brandLegalName}</div>
						</div>
						<div class="grid grid-cols-2 gap-2">
							<div>
								<span class="text-zinc-500">ИНН:</span>
								<div class="font-bold text-white">3906999990</div>
							</div>
							<div>
								<span class="text-zinc-500">КПП:</span>
								<div class="font-bold text-white">390601001</div>
							</div>
						</div>
						<div>
							<span class="text-zinc-500">ОГРН:</span>
							<div class="font-bold text-white">1233900000000</div>
						</div>
						<div>
							<span class="text-zinc-500">Налогообложение:</span>
							<div class="text-emerald-400">ОСНО с выделением НДС 20% / УСН</div>
						</div>
						<div class="border-t border-zinc-800 pt-3">
							<span class="text-zinc-500">Электронный документооборот (ЭДО):</span>
							<div class="mt-1 text-zinc-200">Диадок (СКБ Контур) / СБИС (Тензор)</div>
						</div>
					</div>
				</div>

				<!-- Legal 152-FZ Compliance Box -->
				<div class="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-xs text-zinc-400">
					<div class="font-bold text-zinc-300">Гарантия конфиденциальности (152-ФЗ):</div>
					<p class="mt-2 text-[11px] leading-relaxed text-zinc-500">
						Настоящий ресурс предназначен строго для коммерческого взаимодействия между
						предприятиями (B2B). Мы не собираем и не обрабатываем персональные данные частных лиц.
						Все передаваемые чертежи и ноу-хау защищаются соглашением о неразглашении (NDA).
					</p>
				</div>
			</div>
		</div>
	</div>
</main>
