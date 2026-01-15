<script lang="ts">
	import type { Snippet } from 'svelte';

	import Dock from '$lib/features/navigation/components/Dock.svelte';

	import '../app.css';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="bg-base-100 flex justify-center rounded-sm">
	<main class="flex-1">
		{@render children?.()}
	</main>

	<Dock />
</div>
