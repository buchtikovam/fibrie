<script lang="ts">
	import Dock from '$lib/features/navigation/components/Dock.svelte';

	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
</script>

{data.user}

<main
	class="relative flex min-h-0 flex-1 flex-col bg-base-100 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] sm:pt-6"
>
	{@render children?.()}
</main>

<Dock />
