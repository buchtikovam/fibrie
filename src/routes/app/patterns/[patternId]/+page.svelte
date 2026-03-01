<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	import { Bookmark, ChevronLeft, Share } from '$icons';

	import BackButton from '$ui/components/buttons/BackButton.svelte';

	import { ui } from '$lib/state/ui.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	interface Ingredient {
		id: string;
		name: string;
		weight: number;
	}

	interface Pattern {
		$id: string;
		profileId: string;
		title: string;
		profile: string;
		prepTime: number;
		difficulty: string;
		rating: number;
		reviews: number;
		imageIds: string[];
		imageUrls: string[];
		ingredients: Ingredient[];
	}

	let pattern = $derived<Pattern>(data.pattern);

	let activeTab = $state<'materials' | 'parts' | 'about'>('materials');
	let servings = $state(4);

	let currentImageIndex = $state(0);
	let carouselRef = $state<HTMLElement | null>(null);

	function handleCarouselScroll(e: Event & { currentTarget: HTMLElement }) {
		const target = e.currentTarget;
		currentImageIndex = Math.round(target.scrollLeft / target.clientWidth);
	}

	function jumpToImage(index: number) {
		if (!carouselRef) return;
		currentImageIndex = index;
		carouselRef.scrollTo({
			left: carouselRef.clientWidth * index,
			behavior: 'smooth',
		});
	}

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
</script>

<main
	bind:this={mainScrollRef}
	onscroll={handleVerticalScroll}
	class="relative h-screen w-full overflow-y-auto bg-base-200"
>
	<div class="sticky top-0 z-0 flex h-[55vh] w-full flex-col justify-between bg-base-200 p-6">
		<div
			class="absolute inset-0 carousel h-full w-full overflow-x-scroll overflow-y-hidden scroll-smooth bg-base-300"
			bind:this={carouselRef}
			onscroll={handleCarouselScroll}
		>
			{#each pattern.imageUrls as img, i (img)}
				<div class="relative carousel-item w-full shrink-0 snap-center">
					<img
						src={img}
						alt="Preview {i + 1} of {pattern.title}"
						class="absolute inset-0 h-full w-full object-cover"
					/>
				</div>
			{/each}
		</div>

		<div
			class="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-transparent"
		></div>
		<div
			class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent"
		></div>

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

		{#if pattern.imageUrls.length > 1}
			<div
				class="relative z-10 mx-auto mb-10 flex items-center gap-2 rounded-full border border-base-100 bg-base-300/60 px-4 py-2"
			>
				{#each pattern.imageUrls as _, i (_)}
					<button
						class="h-2.5 rounded-full transition-all duration-300 {i === currentImageIndex
							? 'w-6 bg-primary'
							: 'w-2.5 bg-base-content/30 hover:bg-base-content/50'}"
						onclick={() => jumpToImage(i)}
						aria-label="View image {i + 1}"
					></button>
				{/each}
			</div>
		{/if}
	</div>

	<section
		bind:this={drawerRef}
		class="relative z-10 -mt-10 flex min-h-screen snap-start flex-col bg-primary shadow-2xl transition-[border-radius] duration-300 ease-in-out {isDrawerAtTop
			? 'rounded-t-none'
			: 'rounded-t-[2.5rem]'}"
	>
		<article
			class="flex flex-1 flex-col bg-base-100 p-8 pb-32 transition-[border-radius] duration-300 ease-in-out {isDrawerAtTop
				? 'rounded-t-none'
				: 'rounded-t-[2.5rem]'}"
		>
			<header class="mb-8 text-center">
				<h1 class="mb-1 text-2xl font-bold text-base-content">{pattern.title}</h1>
				<p class="mb-4 text-sm text-base-content/60">
					Pattern by:
					<a href={resolve(`/app/profiles/${pattern.profileId}`)} class="link">
						{pattern.profile}
					</a>
				</p>

				<div class="flex items-center justify-center gap-3 text-sm text-base-content/70">
					<span>{pattern.prepTime} hours</span>
					<span class="text-base-300">|</span>
					<span>{pattern.difficulty}</span>
					<span class="text-base-300">|</span>
					<span class="flex items-center gap-1 font-medium">
						⭐ {pattern.rating}
						<a href={resolve(`/app/patterns/${pattern.$id}/reviews`)} class="link text-xs font-normal">
							({pattern.reviews} reviews)
						</a>
					</span>
				</div>
			</header>

			<div class="mb-8 flex w-full rounded-full bg-base-200 p-1">
				{#each ['materials', 'parts', 'about'] as tab (tab)}
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

			{#if activeTab === 'materials'}
				<h3 class="mb-4 text-lg font-bold text-base-content">{pattern.ingredients.length} Items</h3>

				<ul class="space-y-4">
					{#each pattern.ingredients as item (item.id)}
						<li class="flex items-center justify-between">
							<span class="font-medium text-base-content">{item.name}</span>
							<span class="text-sm text-base-content/60">
								{(item.weight * (servings / 4)).toFixed(0)} g
							</span>
						</li>
					{/each}
				</ul>
			{/if}
		</article>
	</section>
</main>

<div class="fixed right-6 bottom-6 left-6 z-50 transition-all duration-300 ease-in-out">
	<button class="btn w-full rounded-full btn-lg btn-primary"> Start project </button>
</div>
