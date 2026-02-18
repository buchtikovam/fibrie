import type { FibriePrefs } from '$lib/types/user';

export interface PreferenceStep {
	id: keyof FibriePrefs;
	header: string;
	mode: 'single' | 'multiple';
	options: {
		label: string;
		description?: string;
		value: string;
		icon?: string;
	}[];
}
