import { account } from '$appwrite/account';

// import { setLocale } from '$lib/paraglide/runtime';
// import { Device } from '@capacitor/device';

import type { LayoutLoad } from './$types';

export const ssr = false;
export const prerender = true;

// function isValidLocale(lang: string): lang is Appwrite.AppPreferences['language'] {
// 	const supported = ['cs', 'sk', 'en', 'es', 'fr', 'de'];
// 	return supported.includes(lang);
// }

export const load: LayoutLoad = async ({ depends }) => {
	// set default locale based on user device
	// const { value } = await Device.getLanguageCode();
	// const validatedLang = isValidLocale(value) ? value : 'en';
	// setLocale(validatedLang, { reload: false });

	depends('app:user');

	try {
		return {
			user: await account.get<Appwrite.Preferences>(),
		};
	} catch {
		return {
			user: undefined,
		};
	}
};
