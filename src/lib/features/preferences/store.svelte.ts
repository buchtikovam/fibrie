import { authStore } from '$lib/features/auth/state.svelte';

import { preferencesApi } from './api';
import { DEFAULT_PREFERENCES, type UserPreferences } from './types';

class PreferencesStore {
	isLoading = $state(false);

	// 1. Reactive Getter: Automatically stays in sync with Auth User
	// If authStore.user is null, we fall back to defaults safely.
	current = $derived<UserPreferences>(authStore.user?.prefs || DEFAULT_PREFERENCES);

	// 2. The Logic
	async update(newPrefs: Partial<UserPreferences>) {
		if (!authStore.user) return; // Guard clause

		this.isLoading = true;

		// Merge current state with updates
		const mergedPrefs = { ...this.current, ...newPrefs };

		try {
			// A. Call API
			// B. Sync back to AuthStore (Single Source of Truth)
			// We update the user object inside AuthStore so the rest of the app knows.
			authStore.user = await preferencesApi.update(mergedPrefs);
		} catch (error) {
			console.error('Failed to update preferences:', error);
			// Optionally set an error state here
		} finally {
			this.isLoading = false;
		}
	}
}

export const prefsStore = new PreferencesStore();
