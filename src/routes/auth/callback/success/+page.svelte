<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	import { account } from '$appwrite/account';

	import { preferences } from '$preferences';

	import { onMount } from 'svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const user = $derived(data.user);

	onMount(async () => {
		if (user) {
			const prefs: Partial<typeof preferences.prefs.get> | null = await preferences.prefs.get();

			if (prefs) {
				await account.updatePrefs({ prefs });
				await preferences.prefs.remove();
			}
			await goto(resolve('/app'));
		} else {
			await goto(resolve('/auth'));
		}
	});
</script>

success! loading...
