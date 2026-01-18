import { getRemotePreferences, updateRemotePreferences } from './api';
import { DEFAULT_PREFERENCES, type UserPreferences } from './types';

class Preferences {
	state = $state<UserPreferences>(DEFAULT_PREFERENCES);
	isLoading = $state(false);

	constructor() {
		this.init().catch((e) => console.error(e));
	}

	async init() {
		this.isLoading = true;
		const remotePrefs = await getRemotePreferences();
		if (remotePrefs) {
			// Merge allows us to add new preference keys later without breaking old users
			this.state = { ...DEFAULT_PREFERENCES, ...remotePrefs };
		}
		this.isLoading = false;
	}

	// Generic update for simple values
	update = async <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
		const original = this.state[key];
		this.state[key] = value;

		try {
			await updateRemotePreferences(this.state);
		} catch (e) {
			this.state[key] = original;
			console.error('Sync failed');
		}
	};

	// Specific action for array toggling (Yarn Weights)
	toggleYarnWeight = async (weight: string) => {
		// Type 'string' casting inside
		const w = weight as import('./types').YarnWeight;
		const current = new Set(this.state.favoriteYarnWeights);

		if (current.has(w)) current.delete(w);
		else current.add(w);

		await this.update('favoriteYarnWeights', Array.from(current));
	};

	syncTheme = $effect.root(() => {
		$effect(() => {
			if (typeof document !== 'undefined') {
				document.documentElement.setAttribute('data-theme', this.state.theme);
			}
		});
	});
}

export const preferences = new Preferences();
