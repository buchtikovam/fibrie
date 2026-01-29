import { redirect } from '@sveltejs/kit';

import { resolve } from '$app/paths';

import { account } from '$appwrite/account';

import { preferences } from '$lib/preferences';

import type { LayoutLoad } from './$types';

export const ssr = false;
export const prerender = true;

export const load: LayoutLoad = async ({ parent }) => {
	const { user } = await parent();

	if (user === undefined) {
		throw redirect(303, resolve('/auth'));
	}

	return {
		user: user,
	};
};
