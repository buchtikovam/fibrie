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

export interface OnboardingState {
	isFirstLaunch: boolean;
	isLoading: boolean;
}

export const STORAGE_KEYS = {
	HAS_LAUNCHED: 'app_has_launched_v1', // versioning keys helps with future migrations
	TEMP_PREFS: 'app_temp_prefs_v1',
} as const;
