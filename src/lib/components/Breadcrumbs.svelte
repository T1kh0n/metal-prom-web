<script lang="ts">
	import { createBreadcrumbSchema, serializeSchema, type BreadcrumbItem } from '#lib/seo/schema';

	interface Props {
		items: BreadcrumbItem[];
	}

	let { items }: Props = $props();

	// Full breadcrumb hierarchy including root
	let fullItems = $derived([{ name: 'Главная', path: '/' }, ...items]);

	let schemaObj = $derived(createBreadcrumbSchema(fullItems));
</script>

<svelte:head>
	{@html serializeSchema(schemaObj)}
</svelte:head>

<nav aria-label="Хлебные крошки" class="mb-6">
	<ol class="flex flex-wrap items-center gap-2 text-xs text-[var(--color-muted)]">
		{#each fullItems as item, index}
			{#if index > 0}
				<li class="text-[var(--color-rule-2)] select-none" aria-hidden="true">→</li>
			{/if}
			<li>
				{#if index === fullItems.length - 1}
					<span class="font-normal text-[var(--color-ink)]" aria-current="page">{item.name}</span>
				{:else}
					<a
						href={item.path}
						class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
					>
						{item.name}
					</a>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
