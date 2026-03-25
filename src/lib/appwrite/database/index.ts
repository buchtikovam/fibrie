import { TablesDB } from '$appwrite';
import { client } from '$appwrite/client';

import { Tables } from './tables.ts';

export const tablesDB = new TablesDB(client);

export const tables= Tables(tablesDB);
