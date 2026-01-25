<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<div class="h-full p-6 w-full flex flex-col gap-8 items-center justify-center bg-primary/10">
	{@render children?.()}
</div>
