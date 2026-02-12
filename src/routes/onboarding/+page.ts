import { redirect } from '@sveltejs/kit';

import { resolve } from '$app/paths';

import * as m from '$lib/paraglide/messages';
import { preferences } from '$lib/preferences';

import type { PageLoad } from './$types';
import type { Slide } from './types';

export const load: PageLoad = async () => {
	if (await preferences.boarded.exist()) {
		throw redirect(303, resolve('/auth'));
	}

	return {
		layout: [
			// Screen 1: WELCOME
			// Focus: Friendly introduction, establishes the bunny mascot
			{
				id: 'welcome',
				title: m.routes_onboarding_slide_welcome_title(),
				description: m.routes_onboarding_slide_welcome_description(),
				bgColor: 'bg-primary/50',
				textColor: 'text-primary-content',
				textSecondaryColor: 'text-primary-content',
				btnColor: 'btn-primary',
			},

			// Screen 2: TOOLS
			// Focus: Magic, tools, ease of use
			{
				id: 'tools',
				title: m.routes_onboarding_slide_tools_title(),
				description: m.routes_onboarding_slide_tools_description(),
				bgColor: 'bg-secondary/50',
				textColor: 'text-secondary-content',
				textSecondaryColor: 'text-secondary-content',
				btnColor: 'btn-secondary',
			},

			// Screen 3: GAMIFICATION
			// Focus: Achievement, leveling up, quests
			{
				id: 'gamify',
				title: m.routes_onboarding_slide_gamify_title(),
				description: m.routes_onboarding_slide_gamify_description(),
				bgColor: 'bg-accent/50',
				textColor: 'text-accent-content',
				textSecondaryColor: 'text-accent-content',
				btnColor: 'btn-accent',
			},

			// Screen 4: SOCIAL NETWORK
			// Focus: Community, sharing, love
			{
				id: 'social',
				title: m.routes_onboarding_slide_social_title(),
				description: m.routes_onboarding_slide_social_description(),
				bgColor: 'bg-primary/50',
				textColor: 'text-primary-content',
				textSecondaryColor: 'text-primary-content',
				btnColor: 'btn-primary',
			},
		] as Slide[],
	};
};
