<!--<script lang="ts">-->
<!--	import { getDockItems } from '$lib/features/navigation/config';-->

<!--	import { page } from '$app/state';-->

<!--	let dockItems = $derived(getDockItems());-->

<!--	function isActive(currentPath: string, targetHref: string): boolean {-->
<!--		return currentPath.startsWith(targetHref);-->
<!--	}-->
<!--</script>-->

<!--<div class="dock dock-md relative border-t-0 rounded-t-3xl pb-1">-->
<!--	{#each dockItems as item (item.id)}-->
<!--		{@const active = isActive(page.url.pathname, item.href)}-->
<!--		{@const Icon = item.icon}-->

<!--		<a-->
<!--			href={item.href}-->
<!--			class:dock-active={active}-->
<!--			aria-label={item.label}-->
<!--			aria-current={active ? 'page' : undefined}-->
<!--			class={`${active ? 'text-primary ' : ''} `}-->
<!--		>-->
<!--			<Icon class="size-[1.2em]" stroke-linejoin="miter" stroke-linecap="butt" />-->
<!--			<span class="dock-label">{item.label}</span>-->
<!--		</a>-->
<!--	{/each}-->
<!--</div>-->
