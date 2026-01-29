import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';

import { Client } from '$appwrite';

export const client = new Client()
	.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
	.setProject(PUBLIC_APPWRITE_PROJECT_ID)
	.setLocale('en');
