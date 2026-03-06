import { client } from '$appwrite/client';

import { Storage } from 'appwrite';

export const storage = new Storage(client);
