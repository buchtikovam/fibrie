<script lang="ts">
	import { ChevronRight } from '$icons';

	import type { ProfileNavItem } from '../types';

	let { item }: { item: ProfileNavItem } = $props();
</script>

<a href={item.href} class="btn btn-ghost h-auto w-full flex-row items-center justify-between gap-4 p-2 no-underline">
	<div class="bg-secondary/20 flex size-12 items-center justify-center rounded-2xl">
		{#if item.icon}
			{@const Icon = item.icon}
			<Icon class="size-6" />
		{/if}
	</div>

	<span class="flex-1 flex-col items-start text-left text-lg font-semibold">
		{item.label}
	</span>

	<div class="text-base-content/50">
		<ChevronRight strokeWidth="3" />
	</div>
</a>
