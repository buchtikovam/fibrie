import { Preferences } from '@capacitor/preferences';

function structure(key: string) {
	return {
		get: async (): Promise<string | null> => (await Preferences.get({ key })).value,
		set: async (value: string): Promise<void> => await Preferences.set({ key, value }),
		exist: async (): Promise<boolean> => (await Preferences.get({ key })).value !== null,
		remove: async (): Promise<void> => await Preferences.remove({ key }),
	};
}

export const preferences = {
	new: structure('new'),
	tempPreferences: structure('tempPreferences'),
	session: structure('session'),
};
