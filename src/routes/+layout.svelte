<script lang="ts">
	import { authStore } from '$lib/features/auth/store.svelte';
	import { onboardingStore } from '$lib/features/onboarding/store.svelte';
	import { SystemBarType, SystemBars } from '@capacitor/core';
	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import '../app.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	onMount(() => {
		(async () => {
			await SystemBars.hide({
				bar: SystemBarType.NavigationBar,
			});
		})();

		onboardingStore.init();

		const currentPath = page.route.id;

		if (onboardingStore.isFirstLaunch === true) {
			if (!currentPath?.startsWith('/onboarding')) {
				goto('/onboarding');
			}

			return;
		} else {
			authStore.init();
		}
	});

	$effect(() => {
		if (!authStore.isLoading) {
			if (authStore.user) {
				goto('/app/dashboard');
			} else if (!authStore.user) {
				goto('/auth/login');
			}
		}
	});
</script>

<div class="flex h-dvh w-full flex-col">
	{#if onboardingStore.isLoading || authStore.isLoading}
		<!--TODO: loading animation; also if auth loading-->
		<p>LOADING ANIMATION YIPPEE</p>
	{:else}
		{@render children?.()}
	{/if}
</div>
