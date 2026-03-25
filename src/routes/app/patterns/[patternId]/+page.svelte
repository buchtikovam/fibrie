<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { ui } from '$lib/state/ui.svelte';
	import type { PageProps } from './$types';

	import PatternCarousel from "$ui/blocks/pattern/PatternCarousel.svelte";
	import PatternHeader from "$ui/blocks/pattern/PatternHeader.svelte";
	import BottomActionBar from "$ui/components/layout/BottomActionBar.svelte";
	import SnapDrawer from "$ui/components/layout/SnapDrawer.svelte";

	let { data }: PageProps = $props();

	let activeTab = $state<'materials' | 'parts' | 'about'>('about');
	let pattern = $derived(data.pattern);

	$effect(() => {
		ui.showDock = false;
		return () => (ui.showDock = true);
	});
</script>

<SnapDrawer>
	{#snippet background()}
		<PatternCarousel imageIds={pattern.images}/>
	{/snippet}

	{#snippet header(isDrawerAtTop)}
		<PatternHeader
			{pattern}
			{isDrawerAtTop}
			bind:activeTab
		/>
	{/snippet}

	{#if activeTab === 'about'}
		<div class="flex flex-col gap-6">
			<p>
				Create a timeless, stretchy, and beautifully textured hat with this Classic Ribbed Beanie
			</p>

			<h3 class="font-bold">🔎 Abbreviations</h3>

			<div class="flex flex-col gap-3">
				<div class="flex items-center gap-3 rounded-lg bg-base-200 p-3">
					<div class="size-10 min-w-10 rounded-lg bg-base-100"></div>
				</div>
			</div>
		</div>
	{/if}
</SnapDrawer>

<BottomActionBar>
	<button class="btn btn-primary btn-lg w-full">
		Start project
	</button>
</BottomActionBar>
