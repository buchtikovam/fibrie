<script lang="ts">
	import BackButton from '$ui/components/buttons/BackButton.svelte';

	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children?: Snippet;
	}

	let { title, children }: Props = $props();
</script>

<div class="flex items-center">
	<BackButton />

	<h1 class="flex-1 text-center text-2xl font-bold">{title}</h1>

	{@render children?.()}
</div>
