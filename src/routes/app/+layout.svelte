<script lang="ts">
	import { page } from '$app/state';

	import { ui } from '$lib/state/ui.svelte';

	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
	let dockItems = $derived(data.dock);
</script>

<div class="relative flex h-full flex-col bg-base-200 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
	<main
		style="view-transition-name: content;"
		class="relative flex min-h-0 flex-1 flex-col overflow-auto bg-base-100"
	>
		{@render children?.()}
	</main>

	{#if ui.showDock}
		<nav style="view-transition-name: dock;" class="dock">
			{#each dockItems as item (item.id)}
				{@const active = page.url.pathname === item.href}
				{@const IconComponent = item.icon}

				<a
					href={item.href}
					aria-label={item.label}
					aria-current={active ? 'page' : undefined}
					class:dock-active={active}
					class="transition-colors"
				>
					<IconComponent class="size-5" />
					<span class="dock-label">{item.label}</span>
				</a>
			{/each}
		</nav>
	{/if}
</div>
