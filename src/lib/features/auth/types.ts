export interface RegisterPayload {
	email: string;
	password: string;
	name: string;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface AuthState {
	isLoading: boolean;
	error: string | null;
}
