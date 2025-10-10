<script lang="ts">
	import type { Snippet } from 'svelte';

	import favicon from '$lib/assets/favicon.svg';
	import '@fontsource-variable/outfit';

	import { beforeNavigate } from '$app/navigation';
	import { onNavigate } from '$app/navigation';

	import auth from '$appwrite/auth/index.svelte';

	import '../app.css';

	let { children }: { children?: Snippet } = $props();

	beforeNavigate(({ to, cancel }) => auth.guard(to?.url.pathname, cancel));

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	auth.initialize();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="h-screen w-screen bg-linear-to-br from-primary/25 via-slate-100 to-cyan-50 font-sans p-4">
	{@render children?.()}
</div>
