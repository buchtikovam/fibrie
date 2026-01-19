<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import PremiumBanner from '$lib/features/profile/components/PremiumBanner.svelte';
	import ProfileMenuLink from '$lib/features/profile/components/ProfileMenuLink.svelte';
	import ProfileSummaryCard from '$lib/features/profile/components/ProfileSummaryCard.svelte';
	import { getProfileMenuItems } from '$lib/features/profile/config';

	import Heading from '$ui/typography/Heading.svelte';

	let items = $derived(getProfileMenuItems());
</script>

<header class="flex-none">
	<Heading>{m.routes_profile_heading()}</Heading>
</header>

<nav aria-label="Profile navigation" class="flex-1 overflow-y-auto">
	<ul class="flex flex-col gap-2">
		<li>
			<ProfileSummaryCard />
		</li>

		<li>
			<PremiumBanner />
		</li>

		{#each items as item, index (item.id)}
			<li>
				<ProfileMenuLink {item} />
			</li>

			{#if index !== items.length - 1}
				<li role="separator" class="divider my-0 h-0.5 p-0"></li>
			{/if}
		{/each}
	</ul>
</nav>
