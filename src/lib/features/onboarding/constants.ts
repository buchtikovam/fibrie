import * as m from '$lib/paraglide/messages';

import type { OnboardingSlide, PreferenceQuestionStep } from './types';

export function getOnboardingSlides(): OnboardingSlide[] {
	return [
		// Screen 1: WELCOME
		// Focus: Friendly introduction, establishes the bunny mascot
		{
			id: 'welcome',
			title: m.routes_onboarding_slide_welcome_title(),
			description: m.routes_onboarding_slide_welcome_description(),
			bgColor: 'bg-primary/10',
			textColor: 'text-primary',
			textSecondaryColor: 'text-primary/70',
			btnColor: 'btn-primary',
			stickers: [
				// {
				// 	url: '/stickers/bunny-wave.png', - /static/stickers
				// 	alt: 'Bun-Bun waving hello',
				// 	top: 15,
				// 	left: 20,
				// 	width: 60,
				// 	rotate: 0,
				// 	zIndex: 10,
				// },
			],
		},

		// Screen 2: TOOLS
		// Focus: Magic, tools, ease of use
		{
			id: 'tools',
			title: m.routes_onboarding_slide_tools_title(),
			description: m.routes_onboarding_slide_tools_description(),
			bgColor: 'bg-warning/10',
			textColor: 'text-warning',
			textSecondaryColor: 'text-warning/70',
			btnColor: 'btn-warning',
			stickers: [],
		},

		// Screen 3: GAMIFICATION
		// Focus: Achievement, leveling up, quests
		{
			id: 'gamify',
			title: m.routes_onboarding_slide_gamify_title(),
			description: m.routes_onboarding_slide_gamify_description(),
			bgColor: 'bg-success/10',
			textColor: 'text-success',
			textSecondaryColor: 'text-success/70',
			btnColor: 'btn-success',
			stickers: [],
		},

		// Screen 4: SOCIAL NETWORK
		// Focus: Community, sharing, love
		{
			id: 'social',
			title: m.routes_onboarding_slide_social_title(),
			description: m.routes_onboarding_slide_social_description(),
			bgColor: 'bg-secondary/10',
			textColor: 'text-secondary',
			textSecondaryColor: 'text-secondary',
			btnColor: 'btn-secondary',
			stickers: [],
		},
	];
}

export function getOnboardingPreferencesSteps(): PreferenceQuestionStep[] {
	return [
		{
			id: 'skillLevel',
			header: m.routes_onboarding_preferences_step_skill_level_heading(),
			mode: 'single', // Renders Radios
			options: [
				{
					label: m.routes_onboarding_preferences_step_skill_level_beginner_label(),
					value: 'beginner',
					icon: '🐣',
					description: m.routes_onboarding_preferences_step_skill_level_beginner_description(),
				},
				{
					label: m.routes_onboarding_preferences_step_skill_level_intermediate_label(),
					value: 'intermediate',
					icon: '🧶',
					description: m.routes_onboarding_preferences_step_skill_level_intermediate_description(),
				},
				{
					label: m.routes_onboarding_preferences_step_skill_level_advanced_label(),
					value: 'Advanced',
					icon: '🎓',
					description: m.routes_onboarding_preferences_step_skill_level_advanced_description(),
				},
				{
					label: m.routes_onboarding_preferences_step_skill_level_expert_label(),
					value: 'expert',
					icon: '👑',
					description: m.routes_onboarding_preferences_step_skill_level_expert_description(),
				},
			],
		},
		{
			id: 'crafts',
			header: m.routes_onboarding_preferences_step_crafts_heading(),
			mode: 'multiple',
			options: [
				{ label: m.routes_onboarding_preferences_step_crafts_knitting_label(), value: 'knitting', icon: '🥢' },
				{ label: m.routes_onboarding_preferences_step_crafts_crochet_label(), value: 'crochet', icon: '🪡' },
				// {
				// 	label: m.routes_onboarding_preferences_step_crafts_machine_knitting_label(),
				// 	value: 'machine-knitting',
				// 	icon: '🦾',
				// },
			],
		},
		{
			id: 'patterns',
			header: m.routes_onboarding_preferences_step_patterns_heading(),
			mode: 'multiple',
			options: [
				{
					label: m.routes_onboarding_preferences_step_patterns_clothing_label(),
					value: 'clothing',
					icon: '👚',
					description: m.routes_onboarding_preferences_step_patterns_clothing_description(),
				},
				{
					label: m.routes_onboarding_preferences_step_patterns_accessories_label(),
					value: 'accessories',
					icon: '🧤',
					description: m.routes_onboarding_preferences_step_patterns_accessories_description(),
				},
				{
					label: m.routes_onboarding_preferences_step_patterns_toys_label(),
					value: 'toys',
					icon: '🧸',
					description: m.routes_onboarding_preferences_step_patterns_toys_description(),
				},
				{
					label: m.routes_onboarding_preferences_step_patterns_home_and_decor_label(),
					value: 'home-and-decor',
					icon: '🎀',
					description: m.routes_onboarding_preferences_step_patterns_home_and_decor_description(),
				},
				{
					label: m.routes_onboarding_preferences_step_patterns_motifs_label(),
					value: 'motifs',
					icon: '🧶',
					description: m.routes_onboarding_preferences_step_patterns_motifs_description(),
				},
				{
					label: m.routes_onboarding_preferences_step_patterns_seasonal_label(),
					value: 'seasonal',
					icon: '🎄',
					description: m.routes_onboarding_preferences_step_patterns_seasonal_description(),
				},
				{
					label: m.routes_onboarding_preferences_step_patterns_tapestry_label(),
					value: 'tapestry',
					icon: '🏁',
					description: m.routes_onboarding_preferences_step_patterns_tapestry_description(),
				},
				{
					label: m.routes_onboarding_preferences_step_patterns_niche_label(),
					value: 'niche',
					icon: '🐈',
					description: m.routes_onboarding_preferences_step_patterns_niche_description(),
				},
			],
		},
	];
}
