<script lang="ts">
	import { siteConfig } from '#lib/config/site';

	const currentYear = new Date().getFullYear();
</script>

<footer
	class="border-t border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink-2)]"
>
	<!-- Main Footer Columns -->
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			<!-- Col 1: Production Plant Summary -->
			<div class="space-y-4">
				<div class="flex items-center gap-2">
					<div
						class="flex h-7 w-7 items-center justify-center rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] font-mono text-sm font-light text-[var(--color-ink)]"
					>
						M
					</div>
					<span class="text-base font-light tracking-tight text-[var(--color-ink)]"
						>{siteConfig.brandName}</span
					>
				</div>
				<p class="text-xs leading-relaxed text-[var(--color-muted)]">
					Специализированный производственный участок механической обработки с ЧПУ в Калининградской
					области. Изготовление серийных деталей по чертежам заказчика для судостроения,
					агропромышленного комплекса и приборостроения.
				</p>
				<div
					class="rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-3 text-xs"
				>
					<div class="font-normal text-[var(--color-ink)]">Режим работы цеха:</div>
					<div class="mt-1 font-mono text-[var(--color-muted)]">Пн–Пт: 08:00 – 20:00 (2 смены)</div>
					<div class="font-mono text-[var(--color-muted)]">
						Сб: 09:00 – 16:00 (дежурный технолог)
					</div>
				</div>
			</div>

			<!-- Col 2: Core Machining Services -->
			<div>
				<h3 class="text-xs font-normal text-[var(--color-ink)]">Услуги механообработки</h3>
				<ul class="mt-4 space-y-2.5 text-xs">
					<li>
						<a
							href="/tokarnye-raboty-chpu/"
							class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
						>
							Токарные работы с ЧПУ (до ⌀320 мм)
						</a>
					</li>
					<li>
						<a
							href="/frezernye-raboty-chpu/"
							class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
						>
							Фрезерная ЧПУ обработка (3 и 4 оси)
						</a>
					</li>
					<li>
						<a
							href="/zuboreznye-i-shlifovalnye-raboty/"
							class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
						>
							Зубонарезные и шлифовальные работы
						</a>
					</li>
					<li>
						<a
							href="/kalkulyator-stoimosti-chpu/"
							class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
						>
							Онлайн-калькулятор стоимости
						</a>
					</li>
				</ul>
			</div>

			<!-- Col 3: Quality, Park & Knowledge Base -->
			<div>
				<h3 class="text-xs font-normal text-[var(--color-ink)]">Инженерия и стандарты</h3>
				<ul class="mt-4 space-y-2.5 text-xs">
					<li>
						<a
							href="/kontrol-kachestva-i-oborudovanie/"
							class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
						>
							Лаборатория ОТК и станочный парк
						</a>
					</li>
					<li>
						<a
							href="/portfolio/"
							class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
						>
							Портфолио изготовленных деталей
						</a>
					</li>
					<li>
						<a
							href="/stati/"
							class="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
						>
							Инженерная база знаний и статьи
						</a>
					</li>
					<li>
						<a
							href="/stati/vybor-stali-dlya-chpu-obrabotki/"
							class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
						>
							Справочник сталей (Ст45, 40Х, Д16Т)
						</a>
					</li>
					<li>
						<a
							href="/stati/kvalitety-tochnosti-i-sherohovatost-gost/"
							class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
						>
							Таблицы допусков IT6–IT12 и Ra
						</a>
					</li>
					<li>
						<a
							href="/stati/optimizaciya-stoimosti-detaley-chpu/"
							class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
						>
							7 правил снижения цены ЧПУ (DFM)
						</a>
					</li>
				</ul>
			</div>

			<!-- Col 4: Contacts & B2B Legal Details -->
			<div>
				<h3 class="text-xs font-normal text-[var(--color-ink)]">Контакты и реквизиты</h3>
				<div class="mt-4 space-y-2 text-xs">
					<div class="text-[var(--color-ink-2)]">{siteConfig.addressLocality}</div>
					<div class="text-[var(--color-muted)]">{siteConfig.addressStreet}</div>
					<div class="pt-2 font-mono">
						<a
							href="tel:{siteConfig.contactPhone}"
							class="block text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
						>
							{siteConfig.contactPhone}
						</a>
						<a
							href="mailto:{siteConfig.contactEmail}"
							class="block text-[var(--color-muted)] hover:text-[var(--color-ink)]"
						>
							{siteConfig.contactEmail}
						</a>
					</div>
					<div class="border-t border-[var(--color-rule)] pt-3 text-xs text-[var(--color-muted)]">
						<div>Безналичный расчет с НДС 20% / УСН</div>
						<div>ЭДО: Диадок / СБИС (по запросу)</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 152-FZ Legal Notice -->
		<div
			class="mt-10 rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4 text-xs leading-relaxed text-[var(--color-muted)]"
		>
			<strong class="font-normal text-[var(--color-ink-2)]"
				>Правовое уведомление (152-ФЗ и 149-ФЗ):</strong
			>
			Веб-сайт {siteConfig.brandName} не осуществляет сбор, хранение, систематизацию или передачу персональных
			данных физических лиц и не является оператором персональных данных Роскомнадзора. Все расчеты калькулятора
			носят характер предварительной технической оценки. Взаимодействие с заказчиками осуществляется исключительно
			в формате B2B через прямые корпоративные контакты и обмен чертежами по электронной почте.
		</div>

		<!-- Bottom Copyright Bar -->
		<div
			class="mt-8 flex flex-col items-center justify-between border-t border-[var(--color-rule)] pt-6 text-xs text-[var(--color-muted)] sm:flex-row"
		>
			<div>
				© {currentYear}
				{siteConfig.brandName}. Прецизионная металлообработка с ЧПУ в Калининграде.
			</div>
			<div class="mt-3 flex items-center gap-6 text-xs sm:mt-0">
				<a
					href="/politika-konfidentsialnosti/"
					class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
				>
					Политика конфиденциальности
				</a>
				<a
					href="/sitemap/"
					class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
				>
					Карта сайта
				</a>
			</div>
		</div>
	</div>
</footer>
