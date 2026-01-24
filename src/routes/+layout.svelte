<script lang="ts">
	import { authStore } from '$lib/features/auth/state.svelte';
	import { onboardingStore } from '$lib/features/onboarding/store.svelte';
	import { SystemBarType, SystemBars } from '@capacitor/core';

	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import '../app.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	$effect(() => {
		(async () => {
			await SystemBars.hide({
				bar: SystemBarType.NavigationBar,
			});
			// await SystemBars.hide({
			// 	bar: SystemBarType.StatusBar,
			// });
		})();
	});

	$effect(() => {
		onboardingStore.init();

		const currentPath = page.route.id;

		if (onboardingStore.isFirstLaunch === true) {
			console.log(currentPath);

			if (!currentPath?.startsWith('/onboarding')) {
				goto('/onboarding');
			}

			return;
		}

		if (onboardingStore.isFirstLaunch === false) {
			authStore.init();
		}
	});
</script>

<div class=" flex h-dvh w-full flex-col">
	{#if onboardingStore.isLoading}
		<!--TODO: loading animation; also if auth loading-->
		<p>...</p>
	{:else}
		{@render children?.()}
	{/if}
</div>
