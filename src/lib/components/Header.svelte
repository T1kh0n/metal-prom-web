<script lang="ts">
	import { siteConfig } from '#lib/config/site';

	let isMobileMenuOpen = $state(false);

	const navLinks = [
		{ name: 'Токарная', href: '/tokarnye-raboty-chpu/' },
		{ name: 'Фрезерная', href: '/frezernye-raboty-chpu/' },
		{ name: 'Зуборезка', href: '/zuboreznye-i-shlifovalnye-raboty/' },
		{ name: 'Калькулятор', href: '/kalkulyator-stoimosti-chpu/' },
		{ name: 'Портфолио', href: '/portfolio/' },
		{ name: 'ОТК и станки', href: '/kontrol-kachestva-i-oborudovanie/' },
		{ name: 'Статьи', href: '/stati/' },
		{ name: 'Контакты', href: '/kontakty/' }
	];
</script>

<header
	class="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-[var(--color-paper)]/95 backdrop-blur-md"
>
	<!-- Single Clean Navigation Bar -->
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
		<!-- Brand Logo -->
		<a href="/" class="group flex shrink-0 items-center gap-3">
			<div
				class="flex h-8 w-8 items-center justify-center rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] font-mono text-sm font-light text-[var(--color-ink)]"
			>
				M
			</div>
			<div class="min-w-0">
				<div class="flex items-baseline gap-1.5">
					<span class="text-base font-light tracking-tight text-[var(--color-ink)] sm:text-lg">
						{siteConfig.brandName}
					</span>
					<span class="text-xs text-[var(--color-muted)]">ЧПУ</span>
				</div>
				<div class="hidden text-[10px] font-light text-[var(--color-muted)] sm:block">
					Прецизионная металлообработка
				</div>
			</div>
		</a>

		<!-- Right Section: Navigation Links & Actions -->
		<div class="flex items-center gap-5 sm:gap-6">
			<!-- Desktop Navigation -->
			<nav class="hidden items-center gap-4 lg:flex xl:gap-5" aria-label="Основная навигация">
				{#each navLinks as link}
					<a
						href={link.href}
						class="text-xs whitespace-nowrap text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
					>
						{link.name}
					</a>
				{/each}
			</nav>

			<!-- Quick CTA (Vantage hairline secondary pill button, hidden on mobile/tablet) -->
			<a
				href="/kalkulyator-stoimosti-chpu/"
				class="btn btn--sm btn--line !hidden shrink-0 lg:!inline-flex"
			>
				<span>Калькулятор ЧПУ</span>
			</a>

			<!-- Mobile Menu Button (≥ 44px touch target) -->
			<button
				type="button"
				class="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-card)] border border-[var(--color-rule)] text-[var(--color-ink-2)] transition-colors hover:text-white lg:hidden"
				onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				aria-expanded={isMobileMenuOpen}
				aria-label="Переключить меню"
			>
				{#if isMobileMenuOpen}
					<span class="text-base font-light">✕</span>
				{:else}
					<span class="text-base font-light">☰</span>
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Dropdown Navigation -->
	{#if isMobileMenuOpen}
		<div class="border-b border-[var(--color-rule)] bg-[var(--color-paper-2)] px-4 py-4 lg:hidden">
			<nav class="flex flex-col space-y-1">
				{#each navLinks as link}
					<a
						href={link.href}
						class="border-b border-[var(--color-rule)] py-2.5 text-sm text-[var(--color-ink-2)] transition-colors hover:text-white"
						onclick={() => (isMobileMenuOpen = false)}
					>
						{link.name}
					</a>
				{/each}
				<div class="mt-4 pt-2">
					<div class="text-xs text-[var(--color-muted)]">Прямой контакт с цехом:</div>
					<a
						href="tel:{siteConfig.contactPhone}"
						class="num mt-1 block text-sm text-[var(--color-ink)] hover:text-white"
					>
						{siteConfig.contactPhone}
					</a>
					<a
						href="mailto:{siteConfig.contactEmail}"
						class="mt-0.5 block text-xs text-[var(--color-muted)] hover:text-white"
					>
						{siteConfig.contactEmail}
					</a>
				</div>
			</nav>
		</div>
	{/if}
</header>
