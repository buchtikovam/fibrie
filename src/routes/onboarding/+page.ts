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
				bgColor: 'bg-primary/10',
				textColor: 'text-primary',
				textSecondaryColor: 'text-primary/70',
				btnColor: 'btn-primary',
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
			},
		] as Slide[],
	};
};
