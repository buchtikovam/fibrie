<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="fixed right-6 bottom-6 left-6 z-50 transition-all duration-300 ease-in-out">
	{@render children()}
</div>
