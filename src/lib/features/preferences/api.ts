import { account } from '$lib/core/appwrite';

import { type Models } from 'appwrite';

import type { UserPreferences } from './types';

export async function updateRemotePreferences(prefs: UserPreferences): Promise<Models.User<UserPreferences>> {
	try {
		return await account.updatePrefs(prefs);
	} catch (error) {
		console.error('Daisy says: Appwrite sync failed!', error);
		throw error;
	}
}

export async function getRemotePreferences(): Promise<UserPreferences | null> {
	try {
		const user = await account.get();
		// Return null if empty so store uses defaults
		return Object.keys(user.prefs).length > 0 ? (user.prefs as unknown as UserPreferences) : null;
	} catch (error) {
		return null;
	}
}
