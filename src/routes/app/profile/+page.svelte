<script lang="ts">
	import { resolve } from '$app/paths';

	import { ArrowLeft, ChevronRight } from '$icons';

	import * as m from '$lib/paraglide/messages';
</script>

<div class="flex items-center">
	<a href={resolve('/app')} class="btn btn-circle">
		<ArrowLeft />
	</a>

	<h1 class="flex-1 text-center text-2xl font-bold">{m.routes_profile_heading()}</h1>

	<button class="btn btn-circle">
		<!--		<ArrowLeft></ArrowLeft>-->
	</button>
</div>

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
					<p class="text-lg font-semibold">Jane Doe</p>
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
				class="btn my-2 flex h-auto min-h-30 w-full flex-row items-center justify-between gap-4 p-6"
			>
				<div class="flex flex-1 flex-col items-start gap-2 text-left">
					<p class="w-2/3 text-lg">Try premium</p>
					<p class="w-2/3">Unlock all features and patterns with 14-day free trial</p>
				</div>

				<div class="">
					<ChevronRight strokeWidth="3" />
				</div>
			</a>
		</li>

		<!--<a href={item.href} class="btn btn-ghost h-auto w-full flex-row items-center justify-between gap-4 p-2 no-underline">-->
		<!--	<div class="bg-secondary/20 flex size-12 items-center justify-center rounded-2xl">-->
		<!--		{#if item.icon}-->
		<!--			{@const Icon = item.icon}-->
		<!--			<Icon class="size-6" />-->
		<!--		{/if}-->
		<!--	</div>-->

		<!--	<span class="flex-1 flex-col items-start text-left text-lg font-semibold">-->
		<!--		{item.label}-->
		<!--	</span>-->

		<!--	<div class="text-base-content/50">-->
		<!--		<ChevronRight strokeWidth="3" />-->
		<!--	</div>-->
		<!--</a>-->
	</ul>
</nav>
