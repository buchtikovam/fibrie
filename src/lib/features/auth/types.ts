import { type Models } from 'appwrite';

import type { UserPreferences } from '../preferences/types';

export type AppUser = Models.User<UserPreferences>;

export interface AuthState {
	user: AppUser | null;
	isLoading: boolean;
	error: string | null;
}
