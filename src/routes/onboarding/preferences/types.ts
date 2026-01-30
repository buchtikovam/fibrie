export interface PreferenceStep {
	id: string;
	header: string;
	mode: 'single' | 'multiple';
	options: {
		label: string;
		description?: string;
		value: string;
		icon?: string;
	}[];
}
