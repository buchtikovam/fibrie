<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex h-full w-full flex-col gap-4 p-6 pb-0">
	{@render children?.()}
</div>
