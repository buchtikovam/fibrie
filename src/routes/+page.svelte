<script lang="ts">
	import { onMount } from 'svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	onMount(async () => {
		console.log(data);
	});
</script>

page
