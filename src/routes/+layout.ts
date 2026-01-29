import { account } from '$appwrite/account';

// import { setLocale } from '../paraglide/runtime';
import type { LayoutLoad } from './$types';

export const ssr = false;
export const prerender = true;

export const load: LayoutLoad = async ({ depends }) => {
	// todo: paraglide load locale here from userPreferences or
	// setLocale((await Device.getLanguageCode()).value);

	depends('app:user');
	try {
		return {
			user: await account.get(),
		};
	} catch {
		return {
			user: undefined,
		};
	}
};
