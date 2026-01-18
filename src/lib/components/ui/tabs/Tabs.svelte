<script lang="ts">
	import type { TabItem } from '$lib/features/navigation/types';

	import { page } from '$app/state';

	interface Props {
		tabs: TabItem[];
	}

	let { tabs }: Props = $props();
</script>

<div role="tablist" class="tabs-sm tabs-box flex">
	{#each tabs as tab (tab.id)}
		{@const active = page.url.pathname === tab.href}

		<a role="tab" href={tab.href} aria-label={tab.label} class:tab-active={active} class="tab flex-1">
			{tab.label}
		</a>
	{/each}
</div>
