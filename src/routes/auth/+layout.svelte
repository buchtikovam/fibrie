<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-8 bg-primary/10 p-6">
	{@render children?.()}
</div>
