<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import {
		createOrganizationSchema,
		createLocalBusinessSchema,
		serializeSchema
	} from '#lib/seo/schema';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const orgSchema = createOrganizationSchema();
	const localBusinessSchema = createLocalBusinessSchema();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	{@html serializeSchema(orgSchema)}
	{@html serializeSchema(localBusinessSchema)}
</svelte:head>

<div
	class="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-zinc-800 selection:text-zinc-100"
>
	<Header />
	<div class="flex-1">
		{@render children()}
	</div>
	<Footer />
</div>
