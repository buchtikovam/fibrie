export type MeasurementSystem = 'metric' | 'imperial';
export type CrochetTerm = 'US' | 'UK';
export type AppTheme = 'light' | 'dark' | 'cupcake' | 'dracula' | 'system';

export type CraftType = 'knitting' | 'crochet' | 'both';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'couture';

export type YarnWeight = 'lace' | 'fingering' | 'sport' | 'dk' | 'worsted' | 'bulky' | 'super-bulky' | 'jumbo';

export interface UserPreferences {
	// general
	theme: AppTheme;
	keepScreenAwake: boolean;
	hapticFeedback: boolean;
	highContrastMode: boolean;

	// technical specs
	measurementSystem: MeasurementSystem;
	crochetTerms: CrochetTerm;
	leftHandedMode: boolean;

	// craft preferences
	primaryCraft: CraftType;
	skillLevel: SkillLevel;
	favoriteYarnWeights: YarnWeight[];
}

export const DEFAULT_PREFERENCES: UserPreferences = {
	theme: 'cupcake',
	keepScreenAwake: true,
	hapticFeedback: true,
	highContrastMode: false,
	measurementSystem: 'metric',
	crochetTerms: 'US',
	leftHandedMode: false,
	primaryCraft: 'both',
	skillLevel: 'intermediate',
	favoriteYarnWeights: ['dk', 'worsted'], // Most common default
};
