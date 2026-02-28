<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import { ui } from '$lib/state/ui.svelte';

	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
	let dockItems = $derived(data.dock);

	function isActive(currentPath: string, targetHref: string): boolean {
		return currentPath === targetHref;
	}
</script>

<div class="relative flex h-full flex-col bg-base-200 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
	<main
		style="view-transition-name: content;"
		class="relative flex min-h-0 flex-1 flex-col overflow-auto bg-base-200"
	>
		{@render children?.()}
	</main>

	{#if ui.showDock}
		<div class="dock relative dock-md rounded-t-3xl border-t-0 bg-base-200">
			{#each dockItems as item (item.id)}
				{@const active = isActive(page.url.pathname, item.href)}
				{@const Icon = item.icon}

				<a
					href={resolve(item.href)}
					class:dock-active={active}
					aria-label={item.label}
					aria-current={active ? 'page' : undefined}
					class={['text-base-content', '[&.dock-active::after]:text-primary']}
				>
					<Icon class="size-[1.2em] max-h-[1.2em]" />
					<span class="dock-label">{item.label}</span>
				</a>
			{/each}
		</div>
	{/if}
</div>
