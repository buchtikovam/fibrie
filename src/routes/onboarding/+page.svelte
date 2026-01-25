<script lang="ts">
	import { getOnboardingSlides } from '$lib/features/onboarding/constants';
	import { onboardingStore } from '$lib/features/onboarding/store.svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	import { ArrowRight, Check } from '$icons';

	function handleNext() {
		if (isLastSlide) {
			goto(resolve('/onboarding/preferences'));
		} else {
			onboardingStore.currentIndex++;
		}
	}

	let onboardingSlides = $derived(getOnboardingSlides());
	let currentSlide = $derived(onboardingSlides[onboardingStore.currentIndex]);
	let isLastSlide = $derived(onboardingSlides.length === onboardingStore.currentIndex + 1);
</script>

{#if currentSlide}
	<div
		class="relative p-8 flex h-full w-full flex-col overflow-hidden transition-colors duration-700 ease-in-out {currentSlide.bgColor}"
	>
		<div class="h-[40%]"></div>

		<div class="z-20 flex w-full flex-col justify-between transition-all duration-300">
			<div class="flex flex-col w-5/6 gap-6">
				{#key currentSlide.id}
					<div
						class="flex flex-col gap-3"
						in:fly={{ x: 50, duration: 500, delay: 200, easing: cubicOut }}
						out:fly={{ x: -50, duration: 200, opacity: 0 }}
					>
						<h1 class="text-4xl font-black tracking-tight {currentSlide.textColor}">
							{currentSlide.title}
						</h1>

						<p class="text-md {currentSlide.textSecondaryColor}">
							{currentSlide.description}
						</p>
					</div>
				{/key}
			</div>

			<div class="absolute bottom-25 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2">
				<button
					onclick={handleNext}
					class="btn btn-circle {currentSlide.btnColor} btn-xl transition-transform active:scale-90"
					aria-label={isLastSlide ? 'Finish' : 'Next Slide'}
				>
					{#if isLastSlide}
						<Check class="size-6" stroke-width="3" />
					{:else}
						<ArrowRight class="size-6" stroke-width="3" />
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- TODO: stickers ! -->
<!--		<div class="absolute inset-0 h-[60%] w-full overflow-hidden pointer-events-none">-->
<!--{#key onboardingStore.currentSlide.id}-->
<!--	<div class="relative h-full w-full">-->
<!--		{#each onboardingStore.currentSlide.stickers as sticker, i (sticker.url + i)}-->
<!--			<img-->
<!--				src={sticker.url}-->
<!--				alt={sticker.alt}-->
<!--				class="absolute object-contain drop-shadow-xl"-->
<!--				style:top="{sticker.top}%"-->
<!--				style:left="{sticker.left}%"-->
<!--				style:width="{sticker.width}%"-->
<!--				style:transform="rotate({sticker.rotate}deg)"-->
<!--				style:z-index={sticker.zIndex}-->
<!--				in:scale={{-->
<!--					duration: 600,-->
<!--					delay: 100 + i * 150,-->
<!--					start: 0.5,-->
<!--					easing: backOut,-->
<!--				}}-->
<!--				out:fade={{ duration: 200 }}-->
<!--			/>-->
<!--		{/each}-->
<!--	</div>-->
<!--{/key}-->
<!--		</div>-->
