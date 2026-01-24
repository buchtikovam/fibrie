<script lang="ts">
	import Dock from '$lib/features/navigation/components/Dock.svelte';

	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<main
	class="relative flex flex-1 flex-col min-h-0 pt-[env(safe-area-inset-top)] sm:pt-6 pb-[env(safe-area-inset-bottom)] bg-base-100"
>
	{@render children?.()}
</main>

<Dock />
