import { PUBLIC_APPWRITE_DEV_KEY, PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';

import { Client } from '$appwrite';

import { getLocale } from '$lib/paraglide/runtime';

const client = new Client()
	.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
	.setProject(PUBLIC_APPWRITE_PROJECT_ID)
	.setLocale(getLocale());

if (PUBLIC_APPWRITE_DEV_KEY && PUBLIC_APPWRITE_DEV_KEY !== '') {
	client.setDevKey(PUBLIC_APPWRITE_DEV_KEY);
}

export { client };
