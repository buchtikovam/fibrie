import { goto, invalidateAll } from '$app/navigation';
import { resolve } from '$app/paths';

import { account } from '$appwrite/account';

import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		await account.deleteSession({ sessionId: 'current' });
		await invalidateAll();
		await goto(resolve('/auth'), { replaceState: true });
	} catch {
		await goto(resolve('/auth'), { replaceState: true });
	}
};
