<script lang="ts">
	import Dock from '$lib/features/navigation/components/Dock.svelte';
	// import { SystemBarType, SystemBars } from '@capacitor/core';
	import { type Snippet } from 'svelte';

	import '../app.css';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

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
