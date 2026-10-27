<script lang="ts">
	import CostCalculator from '#lib/components/CostCalculator.svelte';
	import { siteConfig } from '#lib/config/site';
</script>

<svelte:head>
	<title>Высокоточная металлообработка и ЧПУ в Калининграде | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Прецизионная токарная и фрезерная обработка с ЧПУ в Калининграде. Серии от 5 до 1000 шт. за 3-5 дней. Паспорта качества ОТК, НДС. Минимальный заказ 5000 руб."
	/>
</svelte:head>

<main class="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-zinc-950">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<!-- Hero Section -->
		<header class="mb-12 max-w-3xl">
			<div
				class="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400"
			>
				<span>⚙️</span> Токарные и фрезерные работы с ЧПУ в Калининграде
			</div>
			<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
				Металлообработка с ЧПУ на заказ в Калининграде
			</h1>
			<p class="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
				Изготовление высокоточных серийных деталей по чертежам и 3D-моделям для судостроения,
				агропромышленного комплекса, приборостроения и спецтехники. Допуски до IT6–IT7, безналичный
				расчет с НДС, паспорта ОТК.
			</p>
		</header>

		<!-- Interactive Cost Calculator Section -->
		<section id="calculator-section" aria-label="Калькулятор стоимости ЧПУ">
			<CostCalculator />
		</section>

		<!-- Contact Anchor Target -->
		<section
			id="order-form"
			class="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center"
		>
			<h3 class="text-xl font-bold text-white">Нужен детальный расчет или согласование КД?</h3>
			<p class="mt-2 text-sm text-zinc-400">
				Отправьте чертежи в форматах PDF, DXF, STEP на нашу инженерную почту:
				<a href="mailto:{siteConfig.contactEmail}" class="font-semibold text-amber-400 underline">
					{siteConfig.contactEmail}
				</a>
				или позвоните главному технологу:
				<a href="tel:{siteConfig.contactPhone}" class="font-semibold text-amber-400">
					{siteConfig.contactPhone}
				</a>
			</p>
		</section>
	</div>
</main>
