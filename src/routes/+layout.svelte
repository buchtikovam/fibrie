<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '@fontsource-variable/outfit';

	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
