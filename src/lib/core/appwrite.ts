import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';

import { Account, Client, Databases } from 'appwrite';

export class AppwriteService {
	private static instance: AppwriteService;
	public client: Client;
	public account: Account;
	public databases: Databases;

	private constructor() {
		this.client = new Client().setEndpoint(PUBLIC_APPWRITE_ENDPOINT).setProject(PUBLIC_APPWRITE_PROJECT_ID);
		this.account = new Account(this.client);
		this.databases = new Databases(this.client);
	}

	public static getInstance(): AppwriteService {
		if (!AppwriteService.instance) {
			AppwriteService.instance = new AppwriteService();
		}
		return AppwriteService.instance;
	}
}

export const appwrite = AppwriteService.getInstance();
