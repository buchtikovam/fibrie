export interface PreferenceStep {
	id: keyof Appwrite.Preferences;
	header: string;
	mode: 'single' | 'multiple';
	options: {
		label: string;
		description?: string;
		value: string;
		icon?: string;
	}[];
}
