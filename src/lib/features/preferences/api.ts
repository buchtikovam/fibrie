import type { UserPreferences } from '$lib/features/preferences/types';

import { account } from '$lib/core/appwrite';

export const preferencesApi = {
	update: async (prefs: UserPreferences) => {
		return await account.updatePrefs<UserPreferences>(prefs);
	},
};
