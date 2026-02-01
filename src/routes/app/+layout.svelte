<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
	let dockItems = $derived(data.dock);

	function isActive(currentPath: string, targetHref: string): boolean {
		return currentPath.startsWith(targetHref);
	}
</script>

<main
	class="relative flex min-h-0 flex-1 flex-col bg-base-100 p-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
>
	{@render children?.()}@
</main>

<div class="dock relative dock-md rounded-t-3xl border-t-0 pb-1">
	{#each dockItems as item (item.id)}
		{@const active = isActive(page.url.pathname, item.href)}
		{@const Icon = item.icon}

		<a
			href={resolve(item.href)}
			class:dock-active={active}
			aria-label={item.label}
			aria-current={active ? 'page' : undefined}
			class={`${active ? 'text-primary ' : ''} `}
		>
			<Icon class="size-[1.2em]" stroke-linejoin="miter" stroke-linecap="butt" />
			<span class="dock-label">{item.label}</span>
		</a>
	{/each}
</div>
