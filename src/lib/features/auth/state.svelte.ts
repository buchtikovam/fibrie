import type { UserPreferences } from '$lib/features/preferences/types';

import { goto } from '$app/navigation';
import { resolve } from '$app/paths';

// Ensure this is available in your SvelteKit version
import { authApi } from './api';
import type { AuthState } from './types';

// Svelte 5 Rune State
const state = $state<AuthState>({
	user: null,
	isLoading: true,
	error: null,
});

// Helper to safely extract error messages
function getErrorMessage(error: unknown): string {
	if (error instanceof Error) return error.message;
	return String(error);
}

export const authStore = {
	get user() {
		return state.user;
	},

	get isLoading() {
		return state.isLoading;
	},

	get error() {
		return state.error;
	},

	get preferences() {
		return state.user?.prefs;
	},

	init: async () => {
		console.log('init');

		state.isLoading = true;
		try {
			// 1. Try to get the user
			state.user = await authApi.getCurrentUser();
		} catch (error: unknown) {
			console.error(error);
			state.user = null;
		} finally {
			state.isLoading = false;

			// 3. Handle Navigation AFTER loading is done
			const currentPath = window.location.pathname; // Simple client-side check

			// Don't redirect if we are already on the login page or a public page!
			// const isPublicRoute = currentPath.startsWith('/auth') || currentPath === '/';

			if (!state.user) {
				//  && !isPublicRoute
				await goto('/onboarding');
			}

			// Optional: Redirect logged-in users away from auth page
			if (state.user && currentPath.startsWith('/auth')) {
				await goto('/dashboard');
			}
		}
	},

	login: async (email: string, pass: string) => {
		state.isLoading = true;
		state.error = null;
		try {
			await authApi.login(email, pass);
			await authStore.init();

			if (!state.user?.prefs?.isOnboarded) {
				goto(resolve('/auth/onboarding'));
			} else {
				goto(resolve('/app/dashboard'));
			}
		} catch (e: unknown) {
			state.error = getErrorMessage(e);
		} finally {
			state.isLoading = false;
		}
	},

	register: async (email: string, pass: string, name: string) => {
		state.isLoading = true;
		state.error = null;
		try {
			await authApi.register(email, pass, name);
			await authStore.init();
			goto(resolve('/auth/onboarding'));
		} catch (e: unknown) {
			state.error = getErrorMessage(e);
		} finally {
			state.isLoading = false;
		}
	},

	logout: async () => {
		await authApi.logout();
		state.user = null;
		goto('/auth');
	},

	updatePreferences: async (newPrefs: Partial<UserPreferences>) => {
		if (!state.user) return;

		// Optimistic UI Update
		const previousPrefs = { ...state.user.prefs };
		const mergedPrefs = { ...previousPrefs, ...newPrefs };

		// We force cast here because Appwrite types might say 'readonly'
		// but we need to update the local store for UI reactivity.
		state.user.prefs = mergedPrefs;

		try {
			await authApi.updatePreferences(mergedPrefs);
		} catch (e: unknown) {
			// Revert on failure
			state.user.prefs = previousPrefs;
			state.error = 'Failed to save preferences: ' + getErrorMessage(e);
		}
	},
};
