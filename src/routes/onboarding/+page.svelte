<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	import { ArrowRight, Check } from '$icons';

	import { getOnboardingSlides } from './data';

	function handleNext() {
		if (isLastSlide) {
			goto(resolve('/onboarding/preferences'));
		} else {
			currentIndex++;
		}
	}

	let currentIndex = $state(0);

	let onboardingSlides = $derived(getOnboardingSlides());
	let currentSlide = $derived(onboardingSlides[currentIndex]);
	let isLastSlide = $derived(onboardingSlides.length === currentIndex + 1);
</script>

<!--{#if currentSlide}-->
<!--	<div-->
<!--		class="relative p-8 flex h-full w-full flex-col overflow-hidden transition-colors duration-700 ease-in-out {currentSlide.bgColor}"-->
<!--	>-->
<!--		<div class="h-[40%]"></div>-->

<!--		<div class="z-20 flex w-full flex-col justify-between transition-all duration-300">-->
<!--			<div class="flex flex-col w-5/6 gap-6">-->
<!--				{#key currentSlide.id}-->
<!--					<div-->
<!--						class="flex flex-col gap-3"-->
<!--						in:fly={{ x: 50, duration: 500, delay: 200, easing: cubicOut }}-->
<!--						out:fly={{ x: -50, duration: 200, opacity: 0 }}-->
<!--					>-->
<!--						<h1 class="text-4xl font-black tracking-tight {currentSlide.textColor}">-->
<!--							{currentSlide.title}-->
<!--						</h1>-->

<!--						<p class="text-md {currentSlide.textSecondaryColor}">-->
<!--							{currentSlide.description}-->
<!--						</p>-->
<!--					</div>-->
<!--				{/key}-->
<!--			</div>-->

<!--			<div class="absolute bottom-25 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2">-->
<!--				<button-->
<!--					onclick={handleNext}-->
<!--					class="btn btn-circle {currentSlide.btnColor} btn-xl transition-transform active:scale-90"-->
<!--					aria-label={isLastSlide ? 'Finish' : 'Next Slide'}-->
<!--				>-->
<!--					{#if isLastSlide}-->
<!--						<Check class="size-6" stroke-width="3" />-->
<!--					{:else}-->
<!--						<ArrowRight class="size-6" stroke-width="3" />-->
<!--					{/if}-->
<!--				</button>-->
<!--			</div>-->
<!--		</div>-->
<!--	</div>-->
<!--{/if}-->

<!--&lt;!&ndash;&lt;!&ndash; TODO: stickers ! &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;		<div class="absolute inset-0 h-[60%] w-full overflow-hidden pointer-events-none">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;{#key onboardingStore.currentSlide.id}&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;	<div class="relative h-full w-full">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;		{#each onboardingStore.currentSlide.stickers as sticker, i (sticker.url + i)}&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;			<img&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;				src={sticker.url}&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;				alt={sticker.alt}&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;				class="absolute object-contain drop-shadow-xl"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;				style:top="{sticker.top}%"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;				style:left="{sticker.left}%"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;				style:width="{sticker.width}%"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;				style:transform="rotate({sticker.rotate}deg)"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;				style:z-index={sticker.zIndex}&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;				in:scale={{&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;					duration: 600,&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;					delay: 100 + i * 150,&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;					start: 0.5,&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;					easing: backOut,&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;				}}&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;				out:fade={{ duration: 200 }}&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;			/>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;		{/each}&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;	</div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;{/key}&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;		</div>&ndash;&gt;&ndash;&gt;-->
