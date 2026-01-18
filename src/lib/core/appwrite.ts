import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';

import { Account, Client, Databases } from 'appwrite';

// initialize client
export const client = new Client();

client.setEndpoint(PUBLIC_APPWRITE_ENDPOINT).setProject(PUBLIC_APPWRITE_PROJECT_ID);

// export services
export const account = new Account(client);
export const databases = new Databases(client);

// helper for error parsing
export function getErrorMessage(error: unknown): string {
	if (error && typeof error === 'object' && 'message' in error) {
		return String((error as any).message);
	}
	return 'An unexpected error occurred.';
}
