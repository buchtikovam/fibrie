<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	import { preferences } from '$preferences';

	import { ChevronLeft } from '$icons';

	import * as m from '$lib/paraglide/messages';
	import { type FibriePrefs } from '$lib/types/user';
	import { PushNotifications } from '@capacitor/push-notifications';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	import SelectionCard from '../../app/profile/(todo)/cards/SelectionCard.svelte';

	let currentStep = $state(0);
	const TOTAL_STEPS = 6;

	let answers = $state<Partial<FibriePrefs>>({});

	let progressValue = $derived(((currentStep + 1) / TOTAL_STEPS) * 100);
	let permission = $state(false);

	let isStepValid = $derived.by(() => {
		if (currentStep === 0) return !!answers.craft;
		if (currentStep === 1) return true;
		if (currentStep === 2) return !!answers.units;
		if (currentStep === 3) return !!answers.crochetTerms;
		if (currentStep === 4) return !!answers.reminderFrequency;
		if (currentStep === 5) return (answers.bunnyName?.length ?? 0) > 0;
		return false;
	});

	// 5. Navigation Handlers
	async function handleNext() {
		if (currentStep === TOTAL_STEPS - 1) {
			await submitData();
			return;
		}

		// SKIP LOGIC: If Knitting, skip Step 3 (Crochet Terms)
		if (currentStep === 2 && answers.craft === 'knit') {
			currentStep = 4; // Jump over step 3
		} else {
			currentStep++;
		}
	}

	function handleBack() {
		if (currentStep === 0) return;

		// REVERSE SKIP LOGIC: If we are at Step 4 and user is a Knitter, go back to 2
		if (currentStep === 4 && answers.craft === 'knit') {
			currentStep = 2;
		} else {
			currentStep--;
		}
	}

	// 6. Permission Handler for Step 4
	async function requestNotification() {
		if (answers.reminderFrequency !== 'none') {
			const result = await PushNotifications.requestPermissions();

			if (result.receive === 'granted') {
				permission = true;
			}

			if (result.receive !== 'granted') {
				answers.reminderFrequency = 'none';
			}
		}
	}

	async function submitData() {
		answers.onboardingComplete = true;
		await preferences.boarded.set('true');
		await preferences.prefs.set(answers);
		await goto(resolve('/auth'));
	}
</script>

<div
	class="flex h-dvh w-full flex-col overflow-hidden bg-base-200 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
>
	<div class="mx-auto w-full max-w-lg flex-none px-6 pt-4 sm:pt-6">
		<div class="flex items-center gap-4">
			{#if currentStep > 0}
				<button class="btn btn-circle btn-ghost btn-sm" onclick={handleBack} aria-label="Go back">
					<ChevronLeft class="size-6" />
				</button>
			{:else}
				<span class="btn w-8 btn-ghost btn-sm"></span>
			{/if}

			<progress
				class="progress flex-1 progress-primary transition-all duration-500"
				value={progressValue}
				max="100"
			></progress>

			<span class="w-8 text-xs font-bold opacity-50">{currentStep + 1}/{TOTAL_STEPS}</span>
		</div>
	</div>

	<div class="relative mx-auto min-h-0 w-full max-w-lg flex-1">
		{#key currentStep}
			<div
				class="absolute inset-0 flex flex-col px-6"
				in:fly={{ x: 20, duration: 300, delay: 150, easing: cubicOut }}
				out:fly={{ x: -20, duration: 300, easing: cubicOut }}
			>
				{#if currentStep === 0}
					<header class="flex-none py-6">
						<h2 class="font-serif text-2xl font-bold text-base-content">
							{m.routes_onboarding_preferences_craft_title()}
						</h2>

						<p class="mt-2 text-base-content/60">{m.routes_onboarding_preferences_craft_description()}</p>
					</header>

					<div class="flex-1 space-y-3 overflow-y-auto pb-4">
						<SelectionCard
							name="craft"
							type="radio"
							value="knit"
							icon="🥢"
							label={m.routes_onboarding_preferences_craft_value_knit_title()}
							description={m.routes_onboarding_preferences_craft_value_knit_description()}
							bind:group={answers.craft}
						/>

						<SelectionCard
							name="craft"
							type="radio"
							value="crochet"
							icon="🪝"
							label={m.routes_onboarding_preferences_craft_value_crochet_title()}
							description={m.routes_onboarding_preferences_craft_value_crochet_description()}
							bind:group={answers.craft}
						/>

						<SelectionCard
							name="craft"
							type="radio"
							value="both"
							icon="💡"
							label={m.routes_onboarding_preferences_craft_value_both_title()}
							description={m.routes_onboarding_preferences_craft_value_both_description()}
							bind:group={answers.craft}
						/>
					</div>
				{:else if currentStep === 1}
					<header class="flex-none py-6">
						<h2 class="font-serif text-2xl font-bold text-base-content">
							{m.routes_onboarding_preferences_skills_title()}
						</h2>
						<p class="mt-2 text-base-content/60">{m.routes_onboarding_preferences_skills_description()}</p>
					</header>
					<div class="flex-1 space-y-3 overflow-y-auto pb-4">
						<SelectionCard
							name="skill"
							type="radio"
							icon="🐣"
							value="beginner"
							label={m.routes_onboarding_preferences_skills_value_beginner_title()}
							description={m.routes_onboarding_preferences_skills_value_beginner_description()}
							bind:group={answers.skill}
						/>
						<SelectionCard
							name="skill"
							type="radio"
							value="intermediate"
							icon="🧶"
							label={m.routes_onboarding_preferences_skills_value_intermediate_title()}
							description={m.routes_onboarding_preferences_skills_value_intermediate_description()}
							bind:group={answers.skill}
						/>
						<SelectionCard
							name="skill"
							type="radio"
							value="advanced"
							icon="🎓"
							label={m.routes_onboarding_preferences_skills_value_advanced_title()}
							description={m.routes_onboarding_preferences_skills_value_advanced_description()}
							bind:group={answers.skill}
						/>
						<SelectionCard
							name="skill"
							type="radio"
							icon="🫅"
							value="expert"
							label={m.routes_onboarding_preferences_skills_value_expert_title()}
							description={m.routes_onboarding_preferences_skills_value_expert_description()}
							bind:group={answers.skill}
						/>
					</div>
				{:else if currentStep === 2}
					<header class="flex-none py-6">
						<h2 class="font-serif text-2xl font-bold text-base-content">
							{m.routes_onboarding_preferences_units_title()}
						</h2>
					</header>
					<div class="flex-1 space-y-3 overflow-y-auto pb-4">
						<SelectionCard
							name="units"
							type="radio"
							value="metric"
							icon="📏"
							label="Metric"
							description="Centimeters & Millimeters (cm/mm)"
							bind:group={answers.units}
						/>
						<SelectionCard
							name="units"
							type="radio"
							icon="👑"
							value="imperial"
							label="Imperial"
							description="Inches & US Sizes (in)"
							bind:group={answers.units}
						/>
					</div>
				{:else if currentStep === 3}
					<header class="flex-none py-6">
						<h2 class="font-serif text-2xl font-bold text-base-content">
							{m.routes_onboarding_preferences_crochet_terms_title()}
						</h2>
						<p class="mt-2 text-base-content/60">
							{@html m.routes_onboarding_preferences_crochet_terms_description()}
						</p>
					</header>
					<div class="flex-1 space-y-3 overflow-y-auto pb-4">
						<SelectionCard
							name="terms"
							type="radio"
							icon="👍"
							value="US"
							label={m.routes_onboarding_preferences_crochet_terms_value_us_title()}
							description={m.routes_onboarding_preferences_crochet_terms_value_us_description()}
							bind:group={answers.crochetTerms}
						/>
						<SelectionCard
							name="terms"
							type="radio"
							value="UK"
							icon="👎"
							label={m.routes_onboarding_preferences_crochet_terms_value_uk_title()}
							description={m.routes_onboarding_preferences_crochet_terms_value_uk_description()}
							bind:group={answers.crochetTerms}
						/>
					</div>
				{:else if currentStep === 4}
					<header class="flex-none py-6">
						<h2 class="font-serif text-2xl font-bold text-base-content">
							{m.routes_onboarding_preferences_notifications_title()}
						</h2>
						<p class="mt-2 text-base-content/60">
							{m.routes_onboarding_preferences_notifications_description()}
						</p>
					</header>
					<div class="flex-1 space-y-3 overflow-y-auto pb-4">
						<button onclick={requestNotification} class="w-full text-start">
							<SelectionCard
								name="reminders"
								type="radio"
								value="daily"
								icon="⏰"
								label={m.routes_onboarding_preferences_notifications_value_daily_title()}
								description={m.routes_onboarding_preferences_notifications_value_daily_description()}
								bind:group={answers.reminderFrequency}
							/>
						</button>
						<button onclick={requestNotification} class="w-full text-start">
							<SelectionCard
								name="reminders"
								type="radio"
								value="weekly"
								icon="🗓️"
								label={m.routes_onboarding_preferences_notifications_value_weekly_title()}
								description={m.routes_onboarding_preferences_notifications_value_weekly_description()}
								bind:group={answers.reminderFrequency}
							/>
						</button>

						<button class="w-full text-start">
							<SelectionCard
								name="reminders"
								type="radio"
								value="none"
								icon="🔕"
								label={m.routes_onboarding_preferences_notifications_value_none_title()}
								description={m.routes_onboarding_preferences_notifications_value_none_description()}
								bind:group={answers.reminderFrequency}
							/>
						</button>
						{#if permission}
							<p class="mt-6 font-bold text-base-content">
								{m.routes_onboarding_preferences_notifications_time_input_title()}
							</p>
							<input
								type="time"
								class="input input-lg w-full border-primary"
								bind:value={answers.reminderTime}
							/>
						{/if}
					</div>
				{:else if currentStep === 5}
					<header class="flex-none py-6">
						<h2 class="text-2xl font-bold text-base-content">
							{m.routes_onboarding_preferences_companion_title()}
						</h2>
						<p class="mt-2 text-base-content/60">
							{@html m.routes_onboarding_preferences_companion_description()}
						</p>
					</header>

					<div class="relative flex flex-1 flex-col items-center overflow-y-auto pt-8 pb-4">
						<div class="placeholder avatar mt-6 mb-6">
							<div class="flex w-40 items-center justify-center rounded-full bg-primary/50 text-4xl">
								🐰
							</div>
						</div>
						<input
							type="text"
							class="input-bordered input absolute top-75 input-lg w-full text-center text-xl font-bold"
							placeholder="Fluffers"
							bind:value={answers.bunnyName}
						/>
					</div>
				{/if}
			</div>
		{/key}
	</div>

	<div class="mx-auto w-full max-w-lg flex-none px-6 py-4">
		<button
			class="btn w-full rounded-full transition-all btn-lg btn-primary"
			onclick={handleNext}
			disabled={!isStepValid}
		>
			{currentStep === TOTAL_STEPS - 1
				? m.routes_onboarding_preferences_button_submit()
				: m.routes_onboarding_preferences_button_continue()}
		</button>
	</div>
</div>
