<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex h-full w-full flex-col p-6 pb-0 gap-4">
	{@render children?.()}
</div>
