<script lang="ts">
	import type { Component } from 'svelte';

	import { getDockItems } from '$lib/features/navigation/data';

	import { page } from '$app/state';

	let dockItems = $derived(getDockItems());

	function isActive(currentPath: string, targetHref: string): boolean {
		return currentPath.startsWith(targetHref);
	}
</script>

{#snippet dockIcon(Icon: Component)}
	<Icon class="size-[1.2em]" viewBox="0 0 24 24" stroke-linejoin="miter" stroke-linecap="butt" />
{/snippet}

<div class="dock dock-sm pb-safe">
	{#each dockItems as item (item.id)}
		{@const active = isActive(page.url.pathname, item.href)}

		<a
			href={item.href}
			class:dock-active={active}
			aria-label={item.label}
			aria-current={active ? 'page' : undefined}
		>
			{@render dockIcon(item.icon)}
			<span class="dock-label">{item.label}</span>
		</a>
	{/each}
</div>
