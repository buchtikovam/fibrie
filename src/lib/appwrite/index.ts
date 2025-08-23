import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';

import * as Appwrite from 'appwrite';

const client: Appwrite.Client = new Appwrite.Client()
	.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
	.setProject(PUBLIC_APPWRITE_PROJECT_ID);
export { Appwrite, client };
