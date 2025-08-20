import { Account, Client } from 'appwrite';

export const client = new Client();

client.setEndpoint('https://fra.cloud.appwrite.io/v1').setProject('68a0bb1e00330ac90739');

export const account = new Account(client);
export { ID } from 'appwrite';
