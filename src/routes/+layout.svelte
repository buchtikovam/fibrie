<script lang="ts">
	import Dock from '$lib/features/navigation/components/Dock.svelte';

	// import { SystemBarType, SystemBars } from '@capacitor/core';

	import '../app.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// $effect(() => {
	// 	(async () => {
	// 		await SystemBars.hide({
	// 			bar: SystemBarType.NavigationBar,
	// 		});
	// 	})();
	// });
</script>

<div class="bg-base-100 flex h-dvh w-full flex-col overflow-hidden pt-[env(safe-area-inset-top)]">
	<main class="relative flex flex-1 flex-col min-h-0">
		{@render children?.()}
	</main>

	<Dock />
</div>
