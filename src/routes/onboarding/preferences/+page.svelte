<script lang="ts">
	import { getOnboardingPreferencesSteps } from '$lib/features/onboarding/constants';
	import { onboardingStore } from '$lib/features/onboarding/store.svelte';
	import { DEFAULT_PREFERENCES, type UserPreferences } from '$lib/features/preferences/types';
	import SelectionCard from '$lib/ui/components/cards/SelectionCard.svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	import { ChevronLeft } from '$icons';

	let currentStepIndex = $state(0);
	let answers = $state<UserPreferences>(DEFAULT_PREFERENCES);

	let currentStep = $derived(getOnboardingPreferencesSteps()[currentStepIndex]);
	let totalSteps = getOnboardingPreferencesSteps().length;
	let isLastStep = $derived(currentStepIndex === totalSteps - 1);

	let progressValue = $derived(((currentStepIndex + 1) / totalSteps) * 100);

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
		await onboardingStore.completeOnboarding(answers);
	}
</script>

<div
	class="flex h-[100dvh] w-full flex-col overflow-hidden bg-primary/10 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
>
	<div class="mx-auto w-full max-w-lg flex-none px-6 pt-4 sm:pt-6">
		<div class="flex items-center gap-4">
			<button
				class="btn btn-circle btn-ghost btn-sm flex justify-center items-center"
				onclick={handleBack}
				aria-label="Go back"
			>
				{#if currentStepIndex}
					<ChevronLeft class="size-5" />
				{/if}
			</button>

			<progress
				class="progress progress-primary flex-1 transition-all duration-500"
				value={progressValue}
				max="100"
			></progress>

			<span class="w-8"> </span>
		</div>
	</div>

	<div class="relative flex-1 min-h-0 w-full max-w-lg mx-auto">
		{#if currentStep}
			{#key currentStep.id}
				<div
					class="absolute inset-0 flex flex-col px-6"
					in:fly={{ x: 20, duration: 300, delay: 150, easing: cubicOut }}
					out:fly={{ x: -20, duration: 300, easing: cubicOut }}
				>
					<header class="flex-none py-6">
						<h2 class="text-2xl font-bold leading-tight text-base-content">
							{currentStep.header}
						</h2>
					</header>

					<div class="flex-1 overflow-y-auto pb-4 scrollbar-hide">
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
				class="btn btn-primary btn-lg w-full rounded-full shadow-xl transition-all"
				onclick={handleNext}
				disabled={!answers[currentStep.id] ||
					(Array.isArray(answers[currentStep.id]) && answers[currentStep.id].length === 0)}
			>
				{isLastStep ? 'Finish Setup' : 'Continue'}
			</button>
		{/if}
	</div>
</div>
