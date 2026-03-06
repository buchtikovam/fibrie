import { PUBLIC_POSTHOG_HOST, PUBLIC_POSTHOG_KEY } from '$env/static/public';

import { browser } from '$app/environment';

import { account } from '$appwrite/account';

import type { FibriePrefs } from '$lib/types/user';

import posthog from 'posthog-js';

import type { LayoutLoad } from './$types';

export const ssr = false;
export const prerender = true;

export const load: LayoutLoad = async ({ depends }) => {
	if (browser) {
		posthog.init(PUBLIC_POSTHOG_KEY, {
			api_host: PUBLIC_POSTHOG_HOST,
			capture_pageview: false,
			capture_pageleave: false,
			capture_exceptions: true,
		});
	}

	depends('app:user');

	try {
		const user = await account.get<FibriePrefs>();

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
