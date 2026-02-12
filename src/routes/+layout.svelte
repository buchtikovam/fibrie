<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate, beforeNavigate, onNavigate } from '$app/navigation';

	import favicon from '$lib/assets/favicon.svg';
	import { App } from '@capacitor/app';
	import { SystemBarType, SystemBars } from '@capacitor/core';
	import posthog from 'posthog-js';
	import { onMount } from 'svelte';

	import '../app.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	if (browser) {
		beforeNavigate(() => posthog.capture('$pageleave'));
		afterNavigate(() => posthog.capture('$pageview'));
	}

	onMount(() => {
		// Capacitor back navigation
		const backListener = App.addListener('backButton', () => {
			history.back();
		});

		// Hide bottom navigation bar
		SystemBars.hide({
			bar: SystemBarType.NavigationBar,
		});

		// Cleanup prevents memory leaks if layout ever unmounts (rare but safe)
		return () => {
			backListener.then((handle) => handle.remove());
		};
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex h-dvh w-full flex-col">
	{@render children?.()}
</div>
