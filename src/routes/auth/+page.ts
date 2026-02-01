import { redirect } from '@sveltejs/kit';

import { resolve } from '$app/paths';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { user } = await parent();

	if (user) {
		throw redirect(303, resolve('/app'));
	}
};
