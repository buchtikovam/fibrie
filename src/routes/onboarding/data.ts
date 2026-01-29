import * as m from '$lib/paraglide/messages';

interface StickerPosition {
	url: string;
	alt: string;
	top: number;
	left: number;
	width: number;
	rotate: number;
	zIndex: number;
}

interface OnboardingSlide {
	id: string;
	title: string;
	description: string;
	bgColor: string;
	textColor: string;
	textSecondaryColor: string;
	btnColor: string;
	stickers: StickerPosition[];
}

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
