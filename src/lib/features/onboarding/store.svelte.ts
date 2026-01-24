import { DEFAULT_PREFERENCES, type UserPreferences } from '$lib/features/preferences/types';
import { Preferences } from '@capacitor/preferences';

import { STORAGE_KEYS } from './types';

class OnboardingStore {
	public isFirstLaunch = $state<boolean | undefined>(undefined);
	public isLoading = $state(true);

	public tempPrefs = $state<UserPreferences>(DEFAULT_PREFERENCES);
	public currentIndex = $state(0);

	constructor() {
		this.init().catch(console.error);
	}

	async init() {
		try {
			const { value } = await Preferences.get({ key: STORAGE_KEYS.HAS_LAUNCHED });
			this.isFirstLaunch = value === null;

			const storedPrefs = await Preferences.get({ key: STORAGE_KEYS.TEMP_PREFS });
			if (storedPrefs.value) {
				this.tempPrefs = JSON.parse(storedPrefs.value);
			}
		} catch (e) {
			console.error('[Onboarding] Init Error:', e);
			this.isFirstLaunch = false;
		} finally {
			this.isLoading = false;
		}
	}
	public updateTempPref(key: keyof UserPreferences, value: unknown) {
		this.tempPrefs = { ...this.tempPrefs, [key]: value };
		this.persistTempPrefs().catch(console.error);
	}

	private async persistTempPrefs() {
		await Preferences.set({
			key: STORAGE_KEYS.TEMP_PREFS,
			value: JSON.stringify(this.tempPrefs),
		});
	}

	async completeOnboarding() {
		try {
			await Preferences.set({ key: STORAGE_KEYS.HAS_LAUNCHED, value: 'true' });
			this.isFirstLaunch = false;
		} catch (e) {
			console.error('[Onboarding] Completion Error:', e);
		}
	}

	async getAndClearTempPrefs(): Promise<UserPreferences | null> {
		const { value } = await Preferences.get({ key: STORAGE_KEYS.TEMP_PREFS });

		if (value) {
			await Preferences.remove({ key: STORAGE_KEYS.TEMP_PREFS });
			this.tempPrefs = DEFAULT_PREFERENCES;
			return JSON.parse(value);
		}
		return null;
	}
}

export const onboardingStore = new OnboardingStore();
