<script lang="ts">
	import type { Snippet } from 'svelte';

	import { ChevronRight, type Icon } from '@lucide/svelte';

	interface Props {
		title: string;
		icon: typeof Icon;
		separator?: boolean;
		onclick?: () => void;
		children?: Snippet;
	}

	let { title, icon: IconComponent, separator = true, onclick, children }: Props = $props();
</script>

<button class="flex w-full flex-col" {onclick}>
	<span class="flex items-center gap-4 p-2">
		<span
			class="rounded-md bg-base-300 p-2 transition-colors group-hover:bg-primary group-hover:text-primary-content"
		>
			<IconComponent class="size-5" />
		</span>

		<span class="flex-1 text-start font-medium text-base-content">{title}</span>

		<ChevronRight class="size-5 opacity-50" />
	</span>

	{#if children}
		<div class="px-2 pb-2">
			{@render children()}
		</div>
	{/if}

	{#if separator}
		<span class="my-2 h-0.5 w-full bg-base-300"></span>
	{/if}
</button>
