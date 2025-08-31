<script lang="ts">
	import type { Snippet } from 'svelte';

	import favicon from '$lib/assets/favicon.svg';
	import '@fontsource-variable/outfit';

	import { beforeNavigate } from '$app/navigation';

	import auth from '$appwrite/auth/index.svelte';

	import { Button } from '$ui/button';

	import '../app.css';

	let { children }: { children?: Snippet } = $props();

	beforeNavigate(({ to, cancel }) => auth.guard(to?.url.pathname, cancel));
	auth.initialize();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="h-screen w-screen bg-gradient-to-br from-primary/25 via-slate-100 to-cyan-50 font-sans p-4">
	{@render children?.()}
</div>

<Button onclick={() => auth.logout()}>deeee</Button>
