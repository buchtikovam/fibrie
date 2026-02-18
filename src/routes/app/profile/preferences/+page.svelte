<script lang="ts">
	import { invalidate } from '$app/navigation';

	import { account } from '$appwrite/account';

	import { RotateCcw } from '$icons';

	import BadgeGroup from '$ui/blocks/BadgeGroup.svelte';
	import Header from '$ui/blocks/Header.svelte';

	import * as m from '$lib/paraglide/messages.js';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let pendingPrefs = $state({
		skillLevel: (data.user?.prefs.skillLevel as string) || null,
		preferredCraft: (data.user?.prefs.preferredCraft as string[]) || [],
	});

	let isSaving = $state(false);

	function resetChanges() {
		pendingPrefs = {
			skillLevel: (data.user?.prefs.skillLevel as string) || null,
			preferredCraft: (data.user?.prefs.preferredCraft as string[]) || [],
		};
	}

	async function savePreferences() {
		isSaving = true;

		try {
			await account.updatePrefs({
				prefs: {
					...data.user?.prefs,
					...pendingPrefs,
				},
			});

			await invalidate('app:user');
		} catch (error) {
			console.error('Appwrite Error:', error);
		} finally {
			isSaving = false;
		}
	}
</script>

<Header title={m.routes_profile_preferences_heading()}>
	<button class="btn btn-circle" onclick={resetChanges}>
		<RotateCcw class="size-5" />
	</button>
</Header>

<section class=" flex flex-col gap-12 overflow-auto pb-22">
	<p>Share your style and we'll find the perfect patterns for your next project! ✨</p>

	<BadgeGroup
		title="How would you describe your skills? 🎓"
		options={[
			{ field: 'beginner', label: 'Crochet' },
			{ field: 'intermediate', label: 'Intermediate' },
			{ field: 'advanced', label: 'Advanced' },
			{ field: 'expert', label: 'Expert' },
		]}
		bind:value={pendingPrefs.skillLevel}
		mode="single"
	/>

	<BadgeGroup
		title="Choose your craft 🪡"
		options={[
			{ field: 'crochet', label: 'Crochet' },
			{ field: 'knitting', label: 'Knitting' },
		]}
		mode="multi"
		bind:value={pendingPrefs.preferredCraft}
	/>

	<BadgeGroup
		title="What do you like to make? 🎀"
		options={[
			{ field: 'clothing', label: 'Clothing' },
			{ field: 'accessories', label: 'Accessories' },
			{ field: 'toys', label: 'Toys' },
			{ field: 'home-and-decor', label: 'Home & Decor' },
			{ field: 'motifs', label: 'Motifs' },
			{ field: 'seasonal', label: 'Seasonal' },
			{ field: 'tapestry', label: 'Tapestry' },
			{ field: 'niche', label: 'Niche' },
		]}
		mode="multi"
		bind:value={pendingPrefs.preferredCraft}
	/>

	<BadgeGroup
		title="Which yarn weights do you prefer? 🧶"
		options={[
			{ field: 'lace', label: 'Lace' },
			{ field: 'fingering', label: 'Fingering' },
			{ field: 'sport', label: 'Sport' },
			{ field: 'dk', label: 'DK' },
			{ field: 'worsted', label: 'Worsted' },
			{ field: 'bulky', label: 'Bulky' },
			{ field: 'super-bulky', label: 'Super bulky' },
			{ field: 'jumbo', label: 'Jumbo' },
		]}
		mode="multi"
		bind:value={pendingPrefs.preferredCraft}
	/>

	<BadgeGroup
		title="Which materials do you use? 👚"
		options={[
			{ field: 'wool', label: 'Wool' },
			{ field: 'merino', label: 'Merino' },
			{ field: 'cotton', label: 'Cotton' },
			{ field: 'acrylic', label: 'Acrylic' },
			{ field: 'silk', label: 'Silk' },
			{ field: 'alpaca', label: 'Alpaca' },
			{ field: 'cashmere', label: 'Cashmere' },
			{ field: 'mohair', label: 'Mohair' },
			{ field: 'linen', label: 'Linen' },
			{ field: 'nylon', label: 'Nylon' },
			{ field: 'polyester', label: 'Polyester' },
			{ field: 'bamboo', label: 'Bamboo' },
		]}
		mode="multi"
		bind:value={pendingPrefs.preferredCraft}
	/>
</section>

<button class="btn absolute inset-x-6 bottom-6 btn-lg btn-primary"> Save preferences </button>
