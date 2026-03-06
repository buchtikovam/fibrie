import { error } from '@sveltejs/kit';

import { tablesDB } from '$appwrite/database';

import type { Pattern } from '$lib/types/user';

import { type Models, Query } from 'appwrite';

import type { PageLoad } from './$types';

interface ReviewRating extends Models.Row {
	$tableId: string;
	rating: number;
}

export const load: PageLoad = async ({ params, depends }) => {
	try {
		depends('app:pattern');

		const pattern: Pattern = await tablesDB.getRow<Pattern>({
			databaseId: 'database',
			tableId: 'patterns',
			rowId: params.patternId,
			queries: [Query.select(['*', 'profile.*', 'translations.*'])],
		});

		if (!pattern) {
			error(404, 'Pattern not found'); // TODO paraglide
		}

		const ratingsPromise = tablesDB
			.listRows<ReviewRating>({
				databaseId: 'database',
				tableId: 'reviews',
				queries: [Query.equal('pattern', params.patternId), Query.select(['rating']), Query.limit(5000)],
			})
			.then((res) => res.rows);

		return {
			pattern,
			lazy: {
				ratings: ratingsPromise,
			},
		};
	} catch {
		error(500, { message: 'Server error fetching pattern!' }); // TODO paraglide
	}
};
