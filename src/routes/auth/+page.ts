import { redirect } from '@sveltejs/kit';

import { resolve } from '$app/paths';

import { preferences } from '$preferences';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { user } = await parent();

	console.log(user);

	if (await preferences.prefs.exist()) {
		throw redirect(303, resolve('/auth/register'));
	}

	if (user === undefined) {
		throw redirect(303, resolve('/auth/login'));
	}

	throw redirect(303, resolve('/app/dashboard'));
};
