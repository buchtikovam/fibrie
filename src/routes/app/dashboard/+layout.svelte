<script lang="ts">
	import type { Snippet } from 'svelte';

	import PageContainer from '$lib/components/layout/containers/PageContainer.svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<PageContainer>
	{@render children?.()}
</PageContainer>
