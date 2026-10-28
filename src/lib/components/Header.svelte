<script lang="ts">
	import { siteConfig } from '#lib/config/site';

	let isMobileMenuOpen = $state(false);

	const navLinks = [
		{ name: 'Токарная ЧПУ', href: '/tokarnye-raboty-chpu/' },
		{ name: 'Фрезерная ЧПУ', href: '/frezernye-raboty-chpu/' },
		{ name: 'Зуборезка и шлифовка', href: '/zuboreznye-i-shlifovalnye-raboty/' },
		{ name: 'Калькулятор', href: '/kalkulyator-stoimosti-chpu/' },
		{ name: 'Портфолио', href: '/portfolio/' },
		{ name: 'ОТК и оборудование', href: '/kontrol-kachestva-i-oborudovanie/' },
		{ name: 'База знаний', href: '/stati/' },
		{ name: 'Контакты', href: '/kontakty/' }
	];
</script>

<header class="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md">
	<!-- Top Precision Status Bar -->
	<div
		class="hidden border-b border-zinc-800/80 bg-zinc-900/40 px-4 py-1.5 text-xs text-zinc-400 sm:block"
	>
		<div class="mx-auto flex max-w-7xl items-center justify-between">
			<div class="flex items-center gap-4 text-xs">
				<span class="text-zinc-200">Цех работает в 2 смены</span>
				<span class="text-zinc-700" aria-hidden="true">/</span>
				<span>Калининград</span>
				<span class="text-zinc-700" aria-hidden="true">/</span>
				<span>НДС 20%</span>
				<span class="text-zinc-700" aria-hidden="true">/</span>
				<span>Контроль ОТК Mitutoyo до IT6</span>
			</div>
			<div class="flex items-center gap-4 font-mono text-xs">
				<a
					href="mailto:{siteConfig.contactEmail}"
					class="text-zinc-300 transition-colors hover:text-white"
				>
					{siteConfig.contactEmail}
				</a>
				<span class="text-zinc-700" aria-hidden="true">/</span>
				<a
					href="tel:{siteConfig.contactPhone}"
					class="font-medium text-zinc-200 transition-colors hover:text-white"
				>
					{siteConfig.contactPhone}
				</a>
			</div>
		</div>
	</div>

	<!-- Main Navigation Bar -->
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
		<!-- Brand Logo -->
		<a href="/" class="group flex items-center gap-3">
			<div
				class="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 font-mono text-base font-bold text-zinc-100 shadow-sm"
			>
				M
			</div>
			<div>
				<div class="flex items-baseline gap-1.5">
					<span class="text-lg font-bold tracking-tight text-white sm:text-xl">
						{siteConfig.brandName}
					</span>
					<span class="font-mono text-xs text-zinc-400">ЧПУ</span>
				</div>
				<div class="text-[11px] font-normal tracking-tight text-zinc-400">
					Прецизионная металлообработка
				</div>
			</div>
		</a>

		<!-- Right Section: Navigation Links & Actions -->
		<div class="flex items-center gap-3 sm:gap-4">
			<!-- Desktop Navigation -->
			<nav class="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
				{#each navLinks as link}
					<a
						href={link.href}
						class="rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white"
					>
						{link.name}
					</a>
				{/each}
			</nav>

			<!-- Quick CTA -->
			<a
				href="/kalkulyator-stoimosti-chpu/"
				class="inline-flex items-center justify-center rounded-md bg-zinc-100 px-3.5 py-1.5 text-xs font-medium text-zinc-950 shadow-sm transition-colors hover:bg-white"
			>
				<span>Калькулятор ЧПУ</span>
			</a>

			<!-- Mobile Menu Button -->
			<button
				type="button"
				class="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-white lg:hidden"
				onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				aria-expanded={isMobileMenuOpen}
				aria-label="Переключить меню"
			>
				{#if isMobileMenuOpen}
					<span class="text-base font-bold">✕</span>
				{:else}
					<span class="text-base font-bold">☰</span>
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Dropdown Navigation -->
	{#if isMobileMenuOpen}
		<div class="border-b border-zinc-800 bg-zinc-950 px-4 py-4 lg:hidden">
			<nav class="flex flex-col space-y-2">
				{#each navLinks as link}
					<a
						href={link.href}
						class="rounded-md border border-zinc-900 bg-zinc-900/40 px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:text-white"
						onclick={() => (isMobileMenuOpen = false)}
					>
						{link.name}
					</a>
				{/each}
				<div class="mt-4 border-t border-zinc-800 pt-3">
					<div class="text-xs text-zinc-400">Прямой контакт с цехом:</div>
					<a
						href="tel:{siteConfig.contactPhone}"
						class="mt-1 block font-mono text-sm font-semibold text-zinc-100 hover:text-white"
					>
						{siteConfig.contactPhone}
					</a>
					<a
						href="mailto:{siteConfig.contactEmail}"
						class="mt-0.5 block font-mono text-xs text-zinc-300 hover:text-white"
					>
						{siteConfig.contactEmail}
					</a>
				</div>
			</nav>
		</div>
	{/if}
</header>
