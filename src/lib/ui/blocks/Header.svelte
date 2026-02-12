<script lang="ts">
	import BackButton from '$ui/components/buttons/BackButton.svelte';
	import Heading from '$ui/components/typography/Heading.svelte';

	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children?: Snippet;
	}

	let { title, children }: Props = $props();
</script>

<div class="flex items-center">
	<BackButton />

	<Heading>{title}</Heading>

	{@render children?.()}
</div>
