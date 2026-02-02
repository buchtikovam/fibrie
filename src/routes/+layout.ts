import { PUBLIC_POSTHOG_HOST, PUBLIC_POSTHOG_KEY } from '$env/static/public';

import { browser } from '$app/environment';

import { account } from '$appwrite/account';

import posthog from 'posthog-js';

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
	if (browser) {
		posthog.init(PUBLIC_POSTHOG_KEY, {
			api_host: PUBLIC_POSTHOG_HOST,
			capture_pageview: false,
			capture_pageleave: false,
			capture_exceptions: true, // This enables capturing exceptions using Error Tracking, set to false if you don't want this
		});
	}

	depends('app:user');

	try {
		const user = await account.get<Appwrite.Preferences>();

		posthog.identify(user.$id, {
			email: user.email,
			name: user.name,
		});

		return {
			user,
		};
	} catch {
		return {
			user: undefined,
		};
	}
};
