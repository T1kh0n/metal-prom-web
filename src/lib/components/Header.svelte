<script lang="ts">
	import { siteConfig } from '#lib/config/site';

	let isMobileMenuOpen = $state(false);

	const navLinks = [
		{ name: 'Токарная ЧПУ', href: '/tokarnye-raboty-chpu/' },
		{ name: 'Фрезерная ЧПУ', href: '/frezernye-raboty-chpu/' },
		{ name: 'Зуборезка и шлифовка', href: '/zuboreznye-i-shlifovalnye-raboty/' },
		{ name: 'Калькулятор', href: '/kalkulyator-stoimosti-chpu/' },
		{ name: 'Портфолио', href: '/portfolio/' },
		{ name: 'ОТК и парк станков', href: '/kontrol-kachestva-i-oborudovanie/' },
		{ name: 'База знаний', href: '/stati/' },
		{ name: 'Контакты', href: '/kontakty/' }
	];
</script>

<header class="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md">
	<!-- Top Precision Status Bar -->
	<div
		class="hidden border-b border-zinc-900 bg-zinc-900/50 px-4 py-1.5 text-xs text-zinc-400 sm:block"
	>
		<div class="mx-auto flex max-w-7xl items-center justify-between">
			<div class="flex items-center gap-4">
				<span class="inline-flex items-center gap-1.5 font-mono text-zinc-300">
					<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
					Прием заказов: цех работает в 2 смены
				</span>
				<span class="hidden text-zinc-600 lg:inline">|</span>
				<span class="hidden lg:inline">
					г. Калининград · НДС 20% · Поверка ОТК Mitutoyo · Допуск IT6
				</span>
			</div>
			<div class="flex items-center gap-4 font-mono text-xs">
				<a
					href="mailto:{siteConfig.contactEmail}"
					class="text-zinc-300 transition-colors hover:text-amber-400"
				>
					{siteConfig.contactEmail}
				</a>
				<span class="text-zinc-700">|</span>
				<a
					href="tel:{siteConfig.contactPhone}"
					class="font-bold text-amber-400 transition-colors hover:text-amber-300"
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
				class="flex h-9 w-9 items-center justify-center rounded border border-amber-500/40 bg-zinc-900 font-mono text-base font-black text-amber-400 shadow-sm"
			>
				M
			</div>
			<div>
				<div class="flex items-baseline gap-1.5">
					<span class="text-lg font-black tracking-wider text-white uppercase sm:text-xl">
						{siteConfig.brandName}
					</span>
					<span class="font-mono text-[10px] font-semibold text-amber-500 uppercase">ЧПУ</span>
				</div>
				<div class="text-[11px] font-medium tracking-tight text-zinc-400">
					Прецизионная металлообработка
				</div>
			</div>
		</a>

		<!-- Desktop Navigation -->
		<nav class="hidden items-center gap-1 xl:flex" aria-label="Основная навигация">
			{#each navLinks as link}
				<a
					href={link.href}
					class="rounded px-2.5 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white"
				>
					{link.name}
				</a>
			{/each}
		</nav>

		<!-- Desktop Quick CTA -->
		<div class="hidden items-center gap-3 sm:flex xl:flex">
			<a
				href="/kalkulyator-stoimosti-chpu/"
				class="inline-flex items-center gap-1.5 rounded border border-amber-500 bg-amber-500 px-3.5 py-2 font-mono text-xs font-bold text-zinc-950 transition-colors hover:bg-amber-400"
			>
				<span>⚡</span>
				<span>Калькулятор ЧПУ</span>
			</a>
		</div>

		<!-- Mobile Menu Button -->
		<button
			type="button"
			class="flex h-9 w-9 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-white xl:hidden"
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

	<!-- Mobile Dropdown Navigation -->
	{#if isMobileMenuOpen}
		<div class="border-b border-zinc-800 bg-zinc-950 px-4 py-4 xl:hidden">
			<nav class="flex flex-col space-y-2">
				{#each navLinks as link}
					<a
						href={link.href}
						class="rounded border border-zinc-900 bg-zinc-900/40 px-3 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-700 hover:text-amber-400"
						onclick={() => (isMobileMenuOpen = false)}
					>
						{link.name}
					</a>
				{/each}
				<div class="mt-4 border-t border-zinc-800 pt-3">
					<div class="font-mono text-xs text-zinc-400">Прямой контакт с цехом:</div>
					<a
						href="tel:{siteConfig.contactPhone}"
						class="mt-1 block font-mono text-sm font-bold text-amber-400"
					>
						{siteConfig.contactPhone}
					</a>
					<a
						href="mailto:{siteConfig.contactEmail}"
						class="mt-0.5 block font-mono text-xs text-zinc-300 hover:text-amber-400"
					>
						{siteConfig.contactEmail}
					</a>
				</div>
			</nav>
		</div>
	{/if}
</header>
