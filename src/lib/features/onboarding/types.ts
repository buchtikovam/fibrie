export interface StickerPosition {
	url: string;
	alt: string;
	top: number;
	left: number;
	width: number;
	rotate: number;
	zIndex: number;
}

export interface OnboardingSlide {
	id: string;
	title: string;
	description: string;
	bgColor: string;
	textColor: string;
	textSecondaryColor: string;
	btnColor: string;
	stickers: StickerPosition[];
}

export const STORAGE_KEYS = {
	HAS_LAUNCHED: 'app_has_launched_v1', // versioning keys helps with future migrations
	TEMP_PREFS: 'app_temp_prefs_v1',
} as const;

// --- ONBOARDING PREFERENCES ---

export type PreferenceSelectionMode = 'single' | 'multiple';

export interface PreferenceSelectionOption {
	label: string;
	description?: string;
	value: string;
	icon?: string;
}

export interface PreferenceQuestionStep {
	id: string;
	header: string;
	mode: PreferenceSelectionMode;
	options: PreferenceSelectionOption[];
}
