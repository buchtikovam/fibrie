import { preferences } from '$lib/preferences';

import { redirect } from '@sveltejs/kit';

import { resolve } from '$app/paths';

import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	if (await preferences.new.exist()) {
		throw redirect(303, resolve('/auth'));
	}
};
