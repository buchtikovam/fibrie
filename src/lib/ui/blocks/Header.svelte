<script lang="ts">
	import BackButton from '$ui/components/buttons/BackButton.svelte';

	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children?: Snippet;
	}

	let { title, children }: Props = $props();
</script>

<header
	class="sticky top-0 z-50 flex h-22 shrink-0 items-center bg-base-200/90 px-6 backdrop-blur supports-backdrop-filter:bg-base-200/60"
>
	<BackButton />

	<h1 class="flex-1 text-center text-2xl font-bold">{title}</h1>

	{@render children?.()}
</header>
