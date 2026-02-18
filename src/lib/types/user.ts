export interface FibriePrefs {
	// basics
	onboardingComplete: boolean;
	bunnyName: string;

	craft: 'knit' | 'crochet' | 'both';

	// technical
	skill: 'beginner' | 'intermediate' | 'advanced' | 'expert';
	units: 'metric' | 'imperial'; // cm vs inches
	crochetTerms?: 'US' | 'UK'; // Optional (only if crochet/both)

	// gamification
	reminderFrequency: 'none' | 'weekly' | 'daily';
	reminderTime: string;
}
