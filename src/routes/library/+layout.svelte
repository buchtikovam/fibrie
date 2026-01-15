<script lang="ts">
	import type { TabItem } from '$lib/features/navigation/types';

	import Tabs from '$lib/components/tabs/Tabs.svelte';

	function getNavTabs(): TabItem[] {
		return [];
	}
</script>

<div class="p-6">
	<h1 class="text-2xl font-bold">Main Heading</h1>

	<Tabs tabs={getNavTabs()} />
</div>
