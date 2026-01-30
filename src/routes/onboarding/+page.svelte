<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	import { ArrowRight, Check } from '$icons';

	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	import type { PageProps } from './$types';

	function handleNext() {
		if (isLastSlide) {
			goto(resolve('/onboarding/preferences'));
		} else {
			currentIndex++;
		}
	}

	let { data }: PageProps = $props();

	let currentIndex = $state(0);

	let onboardingSlides = $derived(data.layout);
	let currentSlide = $derived(onboardingSlides[currentIndex]);
	let isLastSlide = $derived(onboardingSlides.length === currentIndex + 1);
</script>

{#if currentSlide}
	<div
		class="relative flex h-full w-full flex-col overflow-hidden p-8 transition-colors duration-700 ease-in-out {currentSlide.bgColor}"
	>
		<div class="h-[40%]"></div>

		<div class="z-20 flex w-full flex-col justify-between transition-all duration-300">
			<div class="flex w-5/6 flex-col gap-6">
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
					class="btn btn-circle {currentSlide.btnColor} transition-transform btn-xl active:scale-90"
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
