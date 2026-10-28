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
	<ol class="flex flex-wrap items-center gap-1.5 font-mono text-xs text-zinc-400">
		{#each fullItems as item, index}
			{#if index > 0}
				<li class="text-zinc-600 select-none" aria-hidden="true">/</li>
			{/if}
			<li>
				{#if index === fullItems.length - 1}
					<span class="font-medium text-zinc-200" aria-current="page">{item.name}</span>
				{:else}
					<a
						href={item.path}
						class="text-zinc-400 transition-colors hover:text-amber-400 hover:underline"
					>
						{item.name}
					</a>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
