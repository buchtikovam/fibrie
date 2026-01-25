import type { UserPreferences } from '$lib/features/preferences/types';

import { account } from '$lib/core/appwrite';

import { AppwriteException, ID, type Models } from 'appwrite';

import type { LoginPayload, RegisterPayload } from './types';

class AuthStore {
	user = $state<Models.User<UserPreferences> | null>(null);
	isLoading = $state(false);
	error = $state<string | null>(null);

	isAuthenticated = $derived(!!this.user);

	constructor() {}

	private handleError(err: unknown): { success: false; message: string } {
		const message = err instanceof AppwriteException ? err.message : 'An unexpected error occurred';

		this.error = message;
		this.isLoading = false;
		console.error('Auth Error:', err);

		return { success: false, message };
	}

	// 2. Initialization: Hydrate state, DO NOT redirect here.
	async init() {
		this.isLoading = true;
		this.error = null;
		try {
			// We only need the user to prove authentication
			this.user = await account.get();
		} catch (err: unknown) {
			// 401 is expected if not logged in. Don't treat it as a system error.
			if (err instanceof AppwriteException && err.code === 401) {
				this.user = null;
			} else {
				this.handleError(err);
			}
		} finally {
			this.isLoading = false;
		}
	}

	async register(payload: RegisterPayload) {
		this.isLoading = true;
		this.error = null;
		try {
			// 1. Create the account
			await account.create(ID.unique(), payload.email, payload.password, payload.name);

			// 2. Auto-login immediately for better UX
			return await this.login({ email: payload.email, password: payload.password });
		} catch (err) {
			return this.handleError(err);
		} finally {
			this.isLoading = false;
		}
	}

	async login(payload: LoginPayload) {
		this.isLoading = true;
		this.error = null;
		try {
			// 1. Create Session
			await account.createEmailPasswordSession(payload.email, payload.password);

			// 2. Fetch User immediately to update reactive state
			this.user = await account.get();

			return { success: true };
		} catch (err) {
			return this.handleError(err);
		} finally {
			this.isLoading = false;
		}
	}

	async logout() {
		this.isLoading = true;
		try {
			await account.deleteSession('current');
			this.user = null;
			return { success: true };
		} catch (err) {
			return this.handleError(err);
		} finally {
			this.isLoading = false;
		}
	}

	async requestPasswordRecovery(email: string, url: string) {
		this.isLoading = true;
		this.error = null;
		try {
			await account.createRecovery(email, url);
			return { success: true };
		} catch (err) {
			return this.handleError(err);
		} finally {
			this.isLoading = false;
		}
	}

	async completePasswordRecovery(userId: string, secret: string, password: string) {
		this.isLoading = true;
		this.error = null;
		try {
			await account.updateRecovery(userId, secret, password);
			return { success: true };
		} catch (err) {
			return this.handleError(err);
		} finally {
			this.isLoading = false;
		}
	}
}

// Export Singleton
export const authStore = new AuthStore();
