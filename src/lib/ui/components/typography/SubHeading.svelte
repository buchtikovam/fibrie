<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<h3 class="text-lg font-semibold">{@render children?.()}</h3>
