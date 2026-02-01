<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	import { onMount } from 'svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const user = $derived(data.user);

	onMount(async () => {
		if (user) {
			await goto(resolve('/app'));
		} else {
			await goto(resolve('/auth'));
		}
	});
</script>

success! loading...
