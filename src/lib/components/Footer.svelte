<script lang="ts">
	import { siteConfig } from '#lib/config/site';

	const currentYear = new Date().getFullYear();
</script>

<footer class="border-t border-zinc-800 bg-zinc-950 text-zinc-400">
	<!-- Main Footer Columns -->
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			<!-- Col 1: Production Plant Summary -->
			<div class="space-y-4">
				<div class="flex items-center gap-2">
					<div
						class="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 font-mono text-sm font-bold text-zinc-100"
					>
						M
					</div>
					<span class="text-base font-bold text-white uppercase">{siteConfig.brandName}</span>
				</div>
				<p class="text-xs leading-relaxed text-zinc-400">
					Специализированный производственный участок механической обработки с ЧПУ в Калининградской
					области. Изготовление серийных деталей по чертежам заказчика для судостроения,
					агропромышленного комплекса и приборостроения.
				</p>
				<div class="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 text-xs">
					<div class="font-medium text-zinc-300">Режим работы цеха:</div>
					<div class="mt-1 font-mono text-zinc-400">Пн–Пт: 08:00 – 20:00 (2 смены)</div>
					<div class="font-mono text-zinc-400">Сб: 09:00 – 16:00 (дежурный технолог)</div>
				</div>
			</div>

			<!-- Col 2: Core Machining Services -->
			<div>
				<h3 class="text-xs font-semibold tracking-wider text-zinc-200 uppercase">
					Услуги механообработки
				</h3>
				<ul class="mt-4 space-y-2.5 text-xs">
					<li>
						<a
							href="/tokarnye-raboty-chpu/"
							class="text-zinc-300 transition-colors hover:text-white hover:underline"
						>
							Токарные работы с ЧПУ (до ⌀320 мм)
						</a>
					</li>
					<li>
						<a
							href="/frezernye-raboty-chpu/"
							class="text-zinc-300 transition-colors hover:text-white hover:underline"
						>
							Фрезерная ЧПУ обработка (3 и 4 оси)
						</a>
					</li>
					<li>
						<a
							href="/zuboreznye-i-shlifovalnye-raboty/"
							class="text-zinc-300 transition-colors hover:text-white hover:underline"
						>
							Зубонарезные и шлифовальные работы
						</a>
					</li>
					<li>
						<a
							href="/kalkulyator-stoimosti-chpu/"
							class="inline-flex items-center gap-1 font-medium text-zinc-200 transition-colors hover:text-white hover:underline"
						>
							Онлайн-калькулятор стоимости
						</a>
					</li>
				</ul>
			</div>

			<!-- Col 3: Quality, Park & Knowledge Base -->
			<div>
				<h3 class="text-xs font-semibold tracking-wider text-zinc-200 uppercase">
					Инженерия и стандарты
				</h3>
				<ul class="mt-4 space-y-2.5 text-xs">
					<li>
						<a
							href="/kontrol-kachestva-i-oborudovanie/"
							class="text-zinc-300 transition-colors hover:text-white hover:underline"
						>
							Лаборатория ОТК и станочный парк
						</a>
					</li>
					<li>
						<a href="/portfolio/" class="text-zinc-300 transition-colors hover:text-white hover:underline">
							Портфолио изготовленных деталей
						</a>
					</li>
					<li>
						<a href="/stati/" class="text-zinc-300 transition-colors hover:text-white hover:underline">
							Инженерная база знаний и статьи
						</a>
					</li>
					<li>
						<a
							href="/stati/vybor-stali-dlya-chpu-obrabotki/"
							class="text-zinc-300 transition-colors hover:text-white hover:underline"
						>
							Выбор сталей и сплавов для ЧПУ
						</a>
					</li>
					<li>
						<a
							href="/stati/kvalitety-tochnosti-i-sherohovatost-gost/"
							class="text-zinc-300 transition-colors hover:text-white hover:underline"
						>
							Квалитеты IT6–IT12 и шероховатость Ra
						</a>
					</li>
				</ul>
			</div>

			<!-- Col 4: Contacts & B2B Requisites -->
			<div>
				<h3 class="text-xs font-semibold tracking-wider text-zinc-200 uppercase">
					Контакты и реквизиты
				</h3>
				<div class="mt-4 space-y-2 text-xs">
					<div class="text-zinc-300">{siteConfig.addressLocality}</div>
					<div class="text-zinc-400">{siteConfig.addressStreet}</div>
					<div class="pt-2 font-mono">
						<a
							href="tel:{siteConfig.contactPhone}"
							class="block font-medium text-zinc-200 hover:text-white hover:underline"
						>
							{siteConfig.contactPhone}
						</a>
						<a
							href="mailto:{siteConfig.contactEmail}"
							class="block text-zinc-300 hover:text-white hover:underline"
						>
							{siteConfig.contactEmail}
						</a>
					</div>
					<div class="border-t border-zinc-800 pt-3 text-xs text-zinc-500">
						<div>Безналичный расчет с НДС 20% / УСН</div>
						<div>ЭДО: Диадок / СБИС (по запросу)</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 152-FZ Legal Notice -->
		<div
			class="mt-10 rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 text-xs leading-relaxed text-zinc-400"
		>
			<strong class="font-medium text-zinc-300">Правовое уведомление (152-ФЗ и 149-ФЗ):</strong>
			Веб-сайт {siteConfig.brandName} не осуществляет сбор, хранение, систематизацию или передачу персональных
			данных физических лиц и не является оператором персональных данных Роскомнадзора. Все расчеты калькулятора
			носят характер предварительной технической оценки. Взаимодействие с заказчиками осуществляется исключительно
			в формате B2B через прямые корпоративные контакты и обмен чертежами по электронной почте.
		</div>

		<!-- Bottom Copyright Bar -->
		<div
			class="mt-8 flex flex-col items-center justify-between border-t border-zinc-800 pt-6 text-xs text-zinc-400 sm:flex-row"
		>
			<div>
				© {currentYear} {siteConfig.brandName}. Прецизионная металлообработка с ЧПУ в Калининграде.
			</div>
			<div class="mt-3 flex items-center gap-4 text-xs sm:mt-0">
				<a
					href="/politika-konfidentsialnosti/"
					class="text-zinc-400 transition-colors hover:text-zinc-200 hover:underline"
				>
					Политика конфиденциальности
				</a>
				<span>·</span>
				<a href="/sitemap/" class="text-zinc-400 transition-colors hover:text-zinc-200 hover:underline">
					Карта сайта
				</a>
			</div>
		</div>
	</div>
</footer>
