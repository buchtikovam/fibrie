<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate, beforeNavigate, onNavigate } from '$app/navigation';

	import favicon from '$lib/assets/favicon.svg';
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
		(async () => {
			await SystemBars.hide({
				bar: SystemBarType.NavigationBar,
			});
		})();
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

<style>
	/* 🛑 STOP the global root animation */
	:global(::view-transition-group(root)) {
		animation: none;
	}

	/* ✨ Apply the "Whisper" animation ONLY to the 'content' name */
	:global(::view-transition-old(content)) {
		animation: 150ms ease-in both fade-out;
	}

	:global(::view-transition-new(content)) {
		animation:
			300ms ease-out both fade-in,
			300ms cubic-bezier(0.2, 0, 0, 1) both slide-micro;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-micro {
		from {
			transform: translateY(8px);
		}
	}
</style>
