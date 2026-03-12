<script lang="ts">
	import { resolve } from '$app/paths';

	import { Bookmark, Share } from '$icons';

	import BackButton from '$ui/components/button/BackButton.svelte';
	import Carousel from '$ui/components/carousel/Carousel.svelte';
	import CarouselTrigger from '$ui/components/carousel/CarouselTrigger.svelte';
	import TopBottomFade from '$ui/components/overlay/TopBottomFade.svelte';

	import type { Pattern } from '$lib/types/user';

	import * as m from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { ui } from '$lib/state/ui.svelte';
	import { formatDuration } from '$lib/utils/format';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let pattern = $derived<Pattern>(data.pattern);

	let activeTab = $state<'materials' | 'parts' | 'about'>('about');

	let texts = $derived(
		pattern.translations.find((v) => v.locale === getLocale()) ??
			pattern.translations.find((v) => v.locale === 'en') ??
			pattern.translations[0],
	);

	let currentImageIndex = $state(0);
	let carouselRef = $state<HTMLElement | null>(null);

	let mainScrollRef = $state<HTMLElement | null>(null);
	let drawerRef = $state<HTMLElement | null>(null);
	let isDrawerAtTop = $state(false);

	function handleVerticalScroll() {
		if (!mainScrollRef || !drawerRef) return;
		isDrawerAtTop = mainScrollRef.scrollTop >= drawerRef.offsetTop - 2;
	}

	$effect(() => {
		ui.showDock = false;
		return () => (ui.showDock = true);
	});

	const TABS = ['about', 'materials', 'parts'] as const;
</script>

<main
	bind:this={mainScrollRef}
	onscroll={handleVerticalScroll}
	class="relative h-screen w-full overflow-y-auto bg-base-200"
>
	<div class="sticky top-0 z-0 flex h-[55vh] w-full flex-col justify-between bg-base-200 p-6">
		<Carousel bucketId="pattern_images" imageIds={data.pattern.images} bind:carouselRef bind:currentImageIndex />
		<TopBottomFade />

		<nav class="relative z-10 flex items-center justify-between">
			<BackButton classes="bg-base-300/60" />

			<div class="flex items-center gap-3">
				<button class="btn btn-circle bg-base-300/60">
					<Share class="size-5" />
				</button>

				<button class="btn btn-circle bg-base-300/60">
					<Bookmark class="size-5" />
				</button>
			</div>
		</nav>

		<CarouselTrigger imageIds={data.pattern.images} bind:currentImageIndex {carouselRef} />
	</div>

	<section
		bind:this={drawerRef}
		class="relative z-10 -mt-10 flex min-h-screen snap-start flex-col bg-primary shadow-2xl transition-[border-radius] duration-300 ease-in-out {isDrawerAtTop
			? 'rounded-t-none'
			: 'rounded-t-[2.5rem]'}"
	>
		<article
			class="flex flex-1 flex-col bg-base-100 pb-32 transition-[border-radius] duration-300 ease-in-out {isDrawerAtTop
				? 'rounded-t-none'
				: 'rounded-t-[2.5rem]'}"
		>
			<div
				class="sticky top-0 z-20 bg-base-100 px-8 pt-8 pb-4 transition-[border-radius] duration-300 ease-in-out {isDrawerAtTop
					? 'rounded-t-none'
					: 'rounded-t-[2.5rem]'}"
			>
				<header class="mb-8 text-center">
					<h1 class="mb-1 text-2xl font-bold text-base-content">{texts?.title}</h1>
					<p class="mb-4 text-sm text-base-content/60">
						{m.routes_patterns_pattern_by()}
						<a href={resolve(`/app/profiles/${pattern.profile.$id}`)} class="link">
							{pattern.profile.public_name}
						</a>
					</p>

					<div class="flex flex-wrap items-center justify-center gap-2 text-sm text-base-content/70">
						<span>{formatDuration(pattern.estimated_minutes, false)}</span>
						<span class="text-base-300">|</span>

						<span>{m.routes_patterns_difficulty({ value: pattern.difficulty })}</span>
						<span class="text-base-300">|</span>

						<span class="flex items-center gap-1 font-medium">
							⭐
							{#await data.lazy.ratings}
								--
							{:then ratings}
								{@const totalReviews = ratings.length}
								{@const average =
									totalReviews > 0
										? (ratings.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(
												1,
											)
										: '--'}

								{average}

								<a
									href={resolve(`/app/patterns/${pattern.$id}/reviews`)}
									class="link text-xs font-normal"
								>
									{`(${ratings.length} ${m.routes_patterns_reviews()})`}
								</a>
							{/await}
						</span>
					</div>
				</header>

				<div class="flex w-full rounded-full bg-base-200 p-1">
					{#each TABS as tab (tab)}
						<button
							class="flex-1 rounded-full py-2.5 text-sm font-medium capitalize transition-all {activeTab ===
							tab
								? 'bg-secondary text-secondary-content shadow-sm'
								: 'text-base-content/60 hover:text-base-content/80'}"
							onclick={() => (activeTab = tab)}
						>
							{tab}
						</button>
					{/each}
				</div>
			</div>
			<div class="px-8 pt-4">
				{#if activeTab === 'about'}
					<div class="flex flex-col gap-6">
						<p>
							Create a timeless, stretchy, and beautifully textured hat with this Classic Ribbed Beanie
							Knitting Pattern! Designed for DK yarn (or fingering weight yarn held double), this hat is
							warm, stylish, and perfect for everyday wear.
						</p>

						<p>
							The pattern includes three adult sizes, detailed decrease instructions, and clear
							step-by-step guidance—ideal for confident beginners and experienced knitters.
						</p>

						<h3 class="font-bold">🔎 Abbreviations</h3>

						<div class="flex flex-col gap-3">
							<div class="border p-2">
								<div class="size-12 bg-base-300"></div>
							</div>
							<div class="border p-2">
								<div class="size-12 bg-base-300"></div>
							</div>
						</div>

						<h3 class="font-bold">🎁 Perfect for</h3>
					</div>
				{/if}
			</div>
		</article>
	</section>
</main>

<div class="fixed right-6 bottom-6 left-6 z-50 transition-all duration-300 ease-in-out">
	<button class="btn w-full rounded-full shadow btn-lg btn-primary"> Start project </button>
</div>
