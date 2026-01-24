// onboarding
export type CraftType = 'knitting' | 'crochet' | 'machine-knitting' | 'tunisian-crochet' | 'tapestry-crochet';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type PatternType = 'wearables' | 'accessories' | 'toys' | 'decor' | 'motifs' | 'niche' | 'other';
export type YarnWeight = 'lace' | 'fingering' | 'sport' | 'dk' | 'worsted' | 'bulky' | 'super-bulky' | 'jumbo';

// in-app
export type AppTheme = 'autumn';
export type CrochetTerm = 'US' | 'UK';
export type MeasurementSystem = 'metric' | 'imperial';

export interface UserPreferences {
	theme: AppTheme;
	measurementSystem: MeasurementSystem;
	crochetTerms: CrochetTerm;
	leftHandedMode: boolean;

	// craft preferences
	preferredCraft: CraftType[];
	skillLevel: SkillLevel;
	preferredYarnWeights: YarnWeight[];
	preferredPatternTypes: PatternType[];
	companionName: string;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
	theme: 'autumn',
	measurementSystem: 'metric',
	crochetTerms: 'US',
	leftHandedMode: false,

	preferredCraft: [],
	skillLevel: 'beginner',
	preferredYarnWeights: [],
	preferredPatternTypes: [],
	companionName: '',
};
