// onboarding
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type CraftType = 'knitting' | 'crochet' | 'machine-knitting' | 'tunisian-crochet' | 'tapestry-crochet';
export type PatternType =
	| 'wearables'
	| 'accessories'
	| 'toys'
	| 'home-and-decor'
	| 'tapestry'
	| 'motifs'
	| 'seasonal'
	| 'niche';

export type AppTheme = 'autumn';
export type CrochetTerm = 'US' | 'UK';
export type MeasurementSystem = 'metric' | 'imperial';
export type YarnWeight = 'lace' | 'fingering' | 'sport' | 'dk' | 'worsted' | 'bulky' | 'super-bulky' | 'jumbo';

export interface UserPreferences {
	// in-app preferences
	theme: AppTheme;
	measurementSystem: MeasurementSystem;
	crochetTerms: CrochetTerm;
	leftHandedMode: boolean;
	preferredYarnWeights: YarnWeight[];

	// craft preferences
	skillLevel: SkillLevel | null;
	preferredCraft: CraftType[];
	preferredPatternTypes: PatternType[];
	companionName: string;
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
