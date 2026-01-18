import type { Models } from 'appwrite';

export type AuthStatus = 'loading' | 'authenticated' | 'guest';

export interface AuthState {
	user: Models.User<any> | null;
	status: AuthStatus;
	error: string | null;
}
