<script lang="ts">
	import { resolve } from '$app/paths';

	import { Bell, ChevronRight, LogOut, Settings, Star } from '$icons';

	import Header from '$ui/blocks/Header.svelte';
	import SubHeading from '$ui/components/typography/SubHeading.svelte';

	import type { Component } from 'svelte';

	import * as m from '$lib/paraglide/messages';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	interface NavigationItem {
		title: string;
		icon: Component;
		href: string;
		isPro?: boolean;
	}
</script>

<Header title={m.routes_profile_heading()}>
	<button class="btn btn-circle">
		<Bell class="size-5" />
	</button>
</Header>

<nav aria-label="Profile navigation" class="flex-1 overflow-y-auto">
	<ul class="flex flex-col gap-2">
		<li>
			<a
				href={resolve('/app/profile/my-profile')}
				class="btn h-auto min-h-20 w-full flex-row items-center justify-between gap-4 p-2 no-underline btn-ghost"
			>
				<div class="avatar">
					<div class="w-16 rounded-full">
						<img
							alt="profile_picture"
							src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
						/>
					</div>
				</div>

				<div class="flex-1 flex-col items-start text-left">
					<SubHeading>{data.user.name}</SubHeading>
					<span class="text-sm font-normal text-base-content/70">
						{m.routes_profile_nav_my_profile()}
					</span>
				</div>

				<div class="text-base-content/50">
					<ChevronRight strokeWidth="3" />
				</div>
			</a>
		</li>

		<li>
			<a
				href={resolve('/app/premium')}
				class="btn my-2 flex h-auto min-h-30 w-full flex-row items-center justify-between gap-4 p-6 btn-primary"
			>
				<div class="flex w-2/3 flex-col items-start gap-2 text-left">
					<SubHeading>Try premium</SubHeading>
					<p>Unlock all features and patterns with 14-day free trial</p>
				</div>

				<div class="">
					<ChevronRight strokeWidth="3" />
				</div>
			</a>
		</li>

		<li class="mt-3 flex flex-col gap-3 overflow-auto">
			{@render navigationItem({
				href: resolve('/app/profile/preferences'),
				title: 'Preferences',
				isPro: false,
				icon: Star,
			})}

			{@render separator()}
			{@render navigationItem({
				href: resolve('/app/profile/settings'),
				title: 'Settings',
				isPro: false,
				icon: Settings,
			})}

			{@render separator()}
			{@render navigationItem({
				href: resolve('/auth/logout'),
				title: 'Log out',
				isPro: false,
				icon: LogOut,
			})}
		</li>
	</ul>
</nav>

{#snippet navigationItem(item: NavigationItem)}
	<a href={item.href} class="group flex items-center justify-between transition-all active:scale-95">
		<div class="flex flex-1 items-center gap-4">
			<div
				class="flex size-12 items-center justify-center rounded-2xl bg-base-200 text-base-content transition-colors group-hover:bg-white"
			>
				{#if item.icon}
					{@const Icon = item.icon}
					<Icon size={22} strokeWidth={2} />
				{/if}
			</div>

			<div class="flex w-full flex-1 items-center gap-3 pr-4">
				<span class="flex-1 text-lg font-semibold">{item.title}</span>

				{#if item.isPro}
					<span class="badge badge-secondary">Pro</span>
				{/if}
			</div>
		</div>

		<ChevronRight
			class="text-base-content/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-base-content"
			size={24}
		/>
	</a>
{/snippet}

{#snippet separator()}
	<div class="h-0.5 w-full bg-base-200"></div>
{/snippet}
