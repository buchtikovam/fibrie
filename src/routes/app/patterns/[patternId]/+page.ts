import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	// const doc = await tablesDB.getRow({
	// 	databaseId: 'database',
	// 	tableId: 'patterns',
	// 	rowId: params.patternId,
	// 	queries: [Query.select(['*', 'profile.*'])],
	// });

	return {
		pattern: {
			$id: '69a47aa60014b7c6813b',
			title: 'Ribbed winter beanie',
			profile: 'Fibrie Developer',
			profileId: '697fa81e23fd1d2cbb42',
			prepTime: 3,
			difficulty: 'Beginner',
			rating: 4.7,
			reviews: 18,
			imageIds: ['appwrite-file-789', 'appwrite-file-790'],
			imageUrls: [
				'https://i.etsystatic.com/62155956/r/il/c4b6e8/7454391134/il_1588xN.7454391134_1kmm.jpg',
				'https://i.etsystatic.com/62155956/r/il/6cf577/7502323305/il_1588xN.7502323305_qpvj.jpg',
				'https://i.etsystatic.com/62155956/r/il/9a133c/7502331293/il_1588xN.7502331293_r54d.jpg',
			],
			ingredients: [
				{ id: 'ing-1', name: 'Pumpkin', weight: 1200 },
				{ id: 'ing-2', name: 'Heavy Cream', weight: 200 },
				{ id: 'ing-3', name: 'Vegetable Broth', weight: 500 },
				{ id: 'ing-4', name: 'Garlic Cloves', weight: 15 },
			],
		},
	};
};
