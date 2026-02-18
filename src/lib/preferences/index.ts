import type { FibriePrefs } from '$lib/types/user';

import { Preferences } from '@capacitor/preferences';

function structure<T>(key: string) {
	return {
		get: async (): Promise<T | null> => {
			const { value } = await Preferences.get({ key });
			if (value === null) return null;

			try {
				return JSON.parse(value) as T;
			} catch {
				return value as unknown as T;
			}
		},

		set: async (value: T): Promise<void> => {
			await Preferences.set({ key, value: typeof value === 'string' ? value : JSON.stringify(value) });
		},

		exist: async (): Promise<boolean> => {
			const { value } = await Preferences.get({ key });
			return value !== null;
		},

		remove: async (): Promise<void> => {
			await Preferences.remove({ key });
		},
	};
}

export const preferences = {
	boarded: structure<string>('boarded'),
	prefs: structure<Partial<FibriePrefs>>('preferences'),
	session: structure(<string>'session'),
};
