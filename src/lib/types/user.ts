import { type Models } from 'appwrite';

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

export interface Pattern extends Models.Row {
	$tableId: string;

	profile: Profile;
	translations: {
		locale: string;
		title: string;
		description: string | null;
	}[];

	project_type: 'knitting' | 'crochet';
	difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
	estimated_minutes: number;

	images: string[];
}

export interface Profile {
	$id: string;
	user_name: string;
	public_name: string | null;
}
