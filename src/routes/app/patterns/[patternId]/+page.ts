import { error } from '@sveltejs/kit';

import { tables } from '$appwrite/database';

import type { PageLoad } from './$types';


export const load: PageLoad = async ({ params, depends }) => {
	try {
		depends('app:pattern');

		const pattern = await tables.patterns.getRow({
			rowId: params.patternId,
			queries: (query) => [
				query.select(['*', 'profile.*', "translations.*", "pattern_rating.*"]),
			],
		});

		if (!pattern) error(404);

		return {
			pattern,
		};
	} catch {
		error(500);
	}
};
