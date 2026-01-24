import { appwrite } from '$lib/core/appwrite';
import { DEFAULT_PREFERENCES, type UserPreferences } from '$lib/features/preferences/types';

import { ID } from 'appwrite';

export const authApi = {
	register: async (email: string, pass: string, name: string) => {
		// create account
		const account = await appwrite.account.create(ID.unique(), email, pass, name);
		// auto-login right away
		await appwrite.account.createEmailPasswordSession(email, pass);
		// set default preferences
		await appwrite.account.updatePrefs(DEFAULT_PREFERENCES);
		return account;
	},

	login: async (email: string, pass: string) => {
		return await appwrite.account.createEmailPasswordSession(email, pass);
	},

	logout: async () => {
		return await appwrite.account.deleteSession('current');
	},

	getCurrentUser: async () => {
		try {
			const user = await appwrite.account.get();
			// merge with users preferences to avoid missing keys
			const prefs = { ...DEFAULT_PREFERENCES, ...user.prefs } as UserPreferences;
			return { ...user, prefs };
		} catch {
			return null;
		}
	},

	updatePassword: async (oldPass: string, newPass: string) => {
		return await appwrite.account.updatePassword(newPass, oldPass);
	},

	updatePreferences: async (prefs: Partial<UserPreferences>) => {
		// assume the store passes the full object, otherwise need to fetch-merge
		return await appwrite.account.updatePrefs(prefs);
	},
};
