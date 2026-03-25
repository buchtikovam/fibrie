<script lang="ts">
	import type { Snippet } from 'svelte';
	import Carousel from '$ui/components/carousel/Carousel.svelte';
	import CarouselTrigger from '$ui/components/carousel/CarouselTrigger.svelte';
	import TopBottomFade from '$ui/components/overlay/TopBottomFade.svelte';
	import BackButton from "$ui/components/button/BackButton.svelte";
	import { Bookmark, Share } from '$icons';

	interface Props {
		imageIds: string[]|null;
	}

	let {  imageIds}: Props = $props();

	let currentImageIndex = $state(0);
	let carouselRef = $state<HTMLElement | null>(null);
</script>

<div class="sticky top-0 z-0 flex h-[55vh] w-full flex-col justify-between bg-base-200 p-6">
	<Carousel bucketId="pattern_images" {imageIds} bind:carouselRef bind:currentImageIndex />

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

	<CarouselTrigger {imageIds} bind:currentImageIndex {carouselRef} />
</div>
