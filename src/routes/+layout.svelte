<script lang="ts">
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

<div class="flex h-dvh w-full flex-col">
	{@render children?.()}
</div>
