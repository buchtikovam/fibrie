<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { SystemBarType, SystemBars } from '@capacitor/core';
	import { onMount } from 'svelte';

	import '../app.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	onMount(() => {
		(async () => {
			await SystemBars.hide({
				bar: SystemBarType.NavigationBar,
			});
		})();
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex h-dvh w-full flex-col">
	{@render children?.()}
</div>
