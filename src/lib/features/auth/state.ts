import { account, getErrorMessage } from '$lib/core/appwrite';
import { preferences } from '$lib/features/preferences/state';

import { goto } from '$app/navigation';
import { resolve } from '$app/paths';

import type { AuthState } from './types';

// Connects Auth to Prefs

class Auth {
	state = $state<AuthState>({
		user: null,
		status: 'loading',
		error: null,
	});

	constructor() {
		this.init();
	}

	// Check session on app load
	async init() {
		try {
			const user = await account.get();
			this.state.user = user;
			this.state.status = 'authenticated';

			// 🌼 Daisy Note: Immediately load preferences when user is found
			await preferences.init();
		} catch {
			this.state.user = null;
			this.state.status = 'guest';
		}
	}

	async login(email: string, pass: string) {
		this.state.error = null;
		try {
			await account.createEmailPasswordSession(email, pass);
			await this.init(); // Refresh user state
			await goto(resolve('/dashboard'));
		} catch (e) {
			this.state.error = getErrorMessage(e);
		}
	}

	async register(email: string, pass: string, name: string) {
		this.state.error = null;
		try {
			// 1. Create Account
			await account.create('unique()', email, pass, name);

			// 2. Auto Login
			await account.createEmailPasswordSession(email, pass);
			await this.init();

			// 3. Redirect to Onboarding instead of Dashboard
			await goto(resolve('/onboarding'));
		} catch (e) {
			this.state.error = getErrorMessage(e);
		}
	}

	async logout() {
		await account.deleteSession('current');
		this.state.user = null;
		this.state.status = 'guest';
		await goto(resolve('/login'));
	}
}

export const auth = new Auth();
