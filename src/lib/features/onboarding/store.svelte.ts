// import { type UserPreferences } from '$lib/features/preferences/types';
// import { Preferences } from '@capacitor/preferences';
//
// import { goto } from '$app/navigation';
// import { resolve } from '$app/paths';
//
// import { STORAGE_KEYS } from './types';
//
// class OnboardingStore {
// 	public isFirstLaunch = $state<boolean | undefined>(undefined);
// 	public isLoading = $state(true);
//
// 	public currentIndex = $state(0);
//
// 	constructor() {
// 		this.init().catch(console.error);
// 	}
//
// 	async init() {
// 		try {
// 			const { value } = await Preferences.get({ key: STORAGE_KEYS.HAS_LAUNCHED });
// 			this.isFirstLaunch = value === null;
// 		} catch (e) {
// 			console.error('[Onboarding] Init Error:', e);
// 			this.isFirstLaunch = false;
// 		} finally {
// 			this.isLoading = false;
// 		}
// 	}
//
// 	async persistTempPrefs(tempPrefs: UserPreferences) {
// 		await Preferences.set({
// 			key: STORAGE_KEYS.TEMP_PREFS,
// 			value: JSON.stringify(tempPrefs),
// 		});
// 	}
//
// 	async getAndClearTempPrefs(): Promise<UserPreferences | null> {
// 		const { value } = await Preferences.re({ key: STORAGE_KEYS.TEMP_PREFS });
//
// 		if (value) {
// 			await Preferences.remove({ key: STORAGE_KEYS.TEMP_PREFS });
// 			return JSON.parse(value);
// 		}
// 		return null;
// 	}
//
// 	async completeOnboarding(tempPrefs: UserPreferences) {
// 		try {
// 			await onboardingStore.persistTempPrefs(tempPrefs);
//
// 			await Preferences.set({ key: STORAGE_KEYS.HAS_LAUNCHED, value: 'true' });
// 			this.isFirstLaunch = false;
//
// 			goto(resolve('/auth')).catch(console.error);
// 		} catch (e) {
// 			console.error('[Onboarding] Completion Error:', e);
// 		}
// 	}
// }
//
// export const onboardingStore = new OnboardingStore();
