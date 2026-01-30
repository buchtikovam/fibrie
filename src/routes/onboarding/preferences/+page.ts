import * as m from '$lib/paraglide/messages';

import type { PageLoad } from './$types';
import type { PreferenceStep } from './types';

export const load: PageLoad = async () => {
	return {
		layout: [
			{
				id: 'skillLevel',
				header: m.routes_onboarding_preferences_step_skill_level_heading(),
				mode: 'single',
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
				id: 'preferredCraft',
				header: m.routes_onboarding_preferences_step_crafts_heading(),
				mode: 'multiple',
				options: [
					{
						label: m.routes_onboarding_preferences_step_crafts_knitting_label(),
						value: 'knitting',
						icon: '🥢',
					},
					{
						label: m.routes_onboarding_preferences_step_crafts_crochet_label(),
						value: 'crochet',
						icon: '🪡',
					},
				],
			},
			{
				id: 'preferredPatternTypes',
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
		] as PreferenceStep[],
	};
};
