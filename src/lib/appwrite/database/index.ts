import { TablesDB } from '$appwrite';
import { client } from '$appwrite/client';

export const tablesDB = new TablesDB(client);
