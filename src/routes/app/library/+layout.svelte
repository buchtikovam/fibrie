<script lang="ts">
	import { goto } from '$app/navigation';

	import type { TabItem } from '$lib/features/navigation/types';

	import * as m from '$lib/paraglide/messages';
	import Tabs from '$lib/ui/components/tabs/Tabs.svelte';
	import Heading from '$lib/ui/components/typography/Heading.svelte';
	import PageContainer from '$lib/ui/layout/containers/PageContainer.svelte';
	import { onMount } from 'svelte';

	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	function getNavTabs(): TabItem[] {
		return [
			{
				id: 'saved',
				label: m.routes_library_nav_tab_saved(),
				href: '/library/saved',
			},
			{
				id: 'created',
				label: m.routes_library_nav_tab_created(),
				href: '/library/created',
			},
			{
				id: 'collections',
				label: m.routes_library_nav_tab_collections(),
				href: '/library/collections',
			},
		];
	}

	onMount(() => {
		goto('/library/saved');
	});
</script>

<PageContainer>
	<Heading>{m.routes_library_heading()}</Heading>

	<Tabs tabs={getNavTabs()} />
</PageContainer>

{@render children?.()}
