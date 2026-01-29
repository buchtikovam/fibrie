export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type CraftType = 'knitting' | 'crochet' | 'machine-knitting' | 'tunisian-crochet' | 'tapestry-crochet';

export type MeasurementSystem = 'metric' | 'imperial';
export type YarnWeight = 'lace' | 'fingering' | 'sport' | 'dk' | 'worsted' | 'bulky' | 'super-bulky' | 'jumbo';

export interface UserPreferences {
	// in-app preferences
	theme: 'autumn';
	measurementSystem: MeasurementSystem;
	crochetTerms: 'US' | 'UK';
	leftHandedMode: boolean;
	preferredYarnWeights: YarnWeight[];

	// craft preferences
	skillLevel: SkillLevel | null;
	preferredCraft: CraftType[];
	preferredPatternTypes: (
		| 'wearables'
		| 'accessories'
		| 'toys'
		| 'home-and-decor'
		| 'tapestry'
		| 'motifs'
		| 'seasonal'
		| 'niche'
	)[];
	companionName: string;
}

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

export const DEFAULT_PREFERENCES: UserPreferences = {
	theme: 'autumn',
	measurementSystem: 'metric',
	crochetTerms: 'US',
	leftHandedMode: false,
	preferredYarnWeights: [],

	preferredCraft: [],
	skillLevel: 'beginner',
	preferredPatternTypes: [],
	companionName: '',
};
