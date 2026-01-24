<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<main class="relative flex flex-1 flex-col min-h-0">
	{@render children?.()}
</main>
