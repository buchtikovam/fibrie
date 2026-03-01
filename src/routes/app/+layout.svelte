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
		class="relative flex min-h-0 flex-1 flex-col overflow-auto bg-base-100"
	>
		{@render children?.()}
	</main>

	{#if ui.showDock}
		<div
			style="view-transition-name: dock;"
			class="fixed right-0 bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] left-0 z-50 mx-auto w-full max-w-sm px-12"
		>
			<nav
				class="flex items-center justify-between rounded-full border-2 border-base-200 bg-base-100 p-1.5 shadow-lg backdrop-blur-xl"
			>
				{#each dockItems as item (item.id)}
					{@const active = isActive(page.url.pathname, item.href)}
					{@const Icon = item.icon}

					<a
						href={resolve(item.href)}
						aria-label={item.label}
						aria-current={active ? 'page' : undefined}
						class={[
							'group relative z-0 flex items-center justify-center rounded-full p-2 transition-colors duration-600',
							active ? 'text-primary-content' : 'text-base-content ',
						]}
					>
						<div
							class={[
								'absolute inset-0 -z-10 rounded-full bg-primary transition-opacity duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
								active ? 'opacity-100 shadow-sm shadow-primary/20' : 'opacity-0',
							]}
						></div>

						<Icon
							class="size-5 shrink-0 transition-transform duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
							strokeWidth={active ? 2 : 1.75}
						/>

						<div
							class={[
								'grid transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
								active ? 'ml-1.5 grid-cols-[1fr] opacity-100' : 'ml-0 grid-cols-[0fr] opacity-0',
							]}
						>
							<span class="overflow-hidden text-sm font-medium tracking-normal whitespace-nowrap">
								{item.label}
							</span>
						</div>
					</a>
				{/each}
			</nav>
		</div>
	{/if}
</div>
