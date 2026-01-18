<script lang="ts">
	import type { ButtonNavItem } from '$lib/features/navigation/types';

	import * as m from '$lib/paraglide/messages';

	import { resolve } from '$app/paths';

	import { ChevronRight, GraduationCap, Heart, Mail, Settings, Share, Star, Watch } from '$icons';

	import Heading from '$ui/typography/Heading.svelte';
	import SubHeading from '$ui/typography/SubHeading.svelte';

	const items: ButtonNavItem[] = [
		{
			id: 'academy',
			label: 'Academy',
			href: resolve('/profile/academy'),
			icon: GraduationCap,
		},

		{
			id: 'connect-to-watch',
			label: 'Connect to Watch',
			href: resolve('/profile/connect-to-watch'),
			icon: Watch,
		},
		{
			id: 'settings',
			label: 'Settings',
			href: resolve('/profile/settings'),
			icon: Settings,
		},
		{
			id: 'preferences',
			label: 'Preferences',
			href: resolve('/profile/preferences'),
			icon: Star,
		},
		{
			id: 'contact',
			label: 'Contact us',
			href: resolve('/profile/contact'),
			icon: Mail,
		},
		{
			id: 'share',
			label: 'Share our app',
			href: resolve('/profile/share'),
			icon: Share,
		},
		{
			id: 'rating',
			label: 'Give us a rating',
			href: resolve('/profile/rating'),
			icon: Heart,
		},
	];

	const profileHref = resolve('/profile/my-profile');
</script>

<header class="flex-none">
	<Heading>{m.routes_profile_heading()}</Heading>
</header>

<nav aria-label="Profile navigation" class="flex-1 overflow-y-auto">
	<ul class="flex flex-col gap-2">
		<li>
			<a
				href={profileHref}
				class="btn btn-ghost w-full h-auto min-h-20 p-2 flex flex-row items-center justify-between gap-4 no-underline"
			>
				<div class="avatar">
					<div class="w-20 rounded-full">
						<img
							alt="profile_picture"
							src="https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp"
						/>
					</div>
				</div>

				<div class="flex-1 flex flex-col items-start text-left">
					<SubHeading>Jane Doe</SubHeading>
					<span class="text-sm font-normal text-base-content/70">
						{m.routes_profile_nav_button_my_profile()}
					</span>
				</div>

				<div class="text-base-content/50">
					<ChevronRight strokeWidth="3" />
				</div>
			</a>
		</li>

		<li>
			<a
				href={resolve('/')}
				class="btn btn-secondary rounded-3xl w-full h-auto min-h-[7.5rem] p-6 my-2 flex flex-row items-center justify-between gap-4 no-underline shadow-lg"
			>
				<div class="flex-1 flex flex-col items-start text-left text-secondary-content">
					<SubHeading>Unlock all features with 14-day free trial</SubHeading>
				</div>

				<div class="text-secondary-content">
					<ChevronRight strokeWidth="3" />
				</div>
			</a>
		</li>

		{#each items as item, index (item.id)}
			<li>
				{@render navButton(item)}
			</li>

			{#if index !== items.length - 1}
				<li role="separator" class="divider my-0 p-0 h-0.5"></li>
			{/if}
		{/each}
	</ul>
</nav>

{#snippet navButton(item: ButtonNavItem)}
	<a
		href={item.href}
		class="btn btn-ghost w-full h-auto p-2 flex flex-row items-center justify-between gap-6 no-underline"
	>
		<div class="size-12 flex items-center justify-center bg-primary/25 rounded-2xl text-primary-content">
			{#if item.icon}
				{@const Icon = item.icon}
				<Icon class="size-7" />
			{/if}
		</div>

		<span class="flex-1 flex flex-col items-start text-lg font-semibold text-left">
			{item.label}
		</span>

		<div class="text-base-content/50">
			<ChevronRight strokeWidth="3" />
		</div>
	</a>
{/snippet}
