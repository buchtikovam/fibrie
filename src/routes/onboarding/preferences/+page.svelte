<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	import { preferences } from '$preferences';

	import { ChevronLeft } from '$icons';

	import { getLocale } from '$lib/paraglide/runtime';
	import SelectionCard from '$lib/ui/components/cards/SelectionCard.svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let currentStepIndex = $state(0);

	let answers = $state<Appwrite.Preferences>({
		language: getLocale(),
		skillLevel: 'beginner',
		preferredCraft: [],
		preferredPatternTypes: [],
	});

	let currentStep = $derived(data.layout[currentStepIndex]);
	let totalSteps = $derived(data.layout.length);
	let isLastStep = $derived(currentStepIndex === totalSteps - 1);
	let progressValue = $derived(((currentStepIndex + 1) / totalSteps) * 100);

	let isStepValid = $derived.by(() => {
		const value = answers[currentStep.id as keyof Appwrite.Preferences];
		if (value === undefined || value === null) return false;

		if (Array.isArray(value)) {
			return value.length > 0;
		}

		if (typeof value === 'boolean') return true;

		return String(value).length > 0;
	});

	function handleNext() {
		if (isLastStep) {
			submitData();
		} else {
			currentStepIndex++;
		}
	}

	function handleBack() {
		if (currentStepIndex > 0) {
			currentStepIndex = currentStepIndex - 1;
		}
	}

	async function submitData() {
		await preferences.boarded.set(String(true));
		await preferences.prefs.set(answers);
		await goto(resolve('/auth'));
	}
</script>

<div
	class="flex h-dvh w-full flex-col overflow-hidden bg-primary/10 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
>
	<div class="mx-auto w-full max-w-lg flex-none px-6 pt-4 sm:pt-6">
		<div class="flex items-center gap-4">
			<button
				class="btn flex btn-circle items-center justify-center btn-ghost btn-sm"
				onclick={handleBack}
				aria-label="Go back"
			>
				{#if currentStepIndex}
					<ChevronLeft class="size-5" />
				{/if}
			</button>

			<progress
				class="progress flex-1 progress-primary transition-all duration-500"
				value={progressValue}
				max="100"
			></progress>

			<span class="w-8"> </span>
		</div>
	</div>

	<div class="relative mx-auto min-h-0 w-full max-w-lg flex-1">
		{#if currentStep}
			{#key currentStep.id}
				<div
					class="absolute inset-0 flex flex-col px-6"
					in:fly={{ x: 20, duration: 300, delay: 150, easing: cubicOut }}
					out:fly={{ x: -20, duration: 300, easing: cubicOut }}
				>
					<header class="flex-none py-6">
						<h2 class="text-2xl leading-tight font-bold text-base-content">
							{currentStep.header}
						</h2>
					</header>

					<div class="scrollbar-hide flex-1 overflow-y-auto pb-4">
						<div class="flex flex-col gap-3">
							{#each currentStep.options as option (option.value)}
								<SelectionCard
									name={currentStep.id}
									type={currentStep.mode === 'single' ? 'radio' : 'checkbox'}
									label={option.label}
									description={option.description}
									icon={option.icon}
									value={option.value}
									bind:group={answers[currentStep.id]}
								/>
							{/each}
						</div>
					</div>
				</div>
			{/key}
		{/if}
	</div>

	<div class="mx-auto w-full max-w-lg flex-none px-6 py-4">
		{#if currentStep}
			<button
				class="btn w-full rounded-full shadow-xl transition-all btn-lg btn-primary"
				onclick={handleNext}
				disabled={!isStepValid}
			>
				{isLastStep ? 'Finish Setup' : 'Continue'}
			</button>
		{/if}
	</div>
</div>
