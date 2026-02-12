<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<h1 class="flex-1 text-center text-2xl font-bold">{@render children?.()}</h1>
