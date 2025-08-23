import { PUBLIC_ENDPOINT } from '$env/static/public';
import { clearIntervalAsync, setIntervalAsync } from 'set-interval-async';

import { goto } from '$app/navigation';

import { account } from '$account';

import { Appwrite } from '../index';

const auth = () => {
	const auth = $state({
		user: <null | Appwrite.Models.User<Appwrite.Models.Preferences>>null,
		session: <null | Appwrite.Models.Session>null,
		loading: <boolean>true,
		error: <null | Appwrite.AppwriteException>null,
		oauth: {
			async create(provider: Appwrite.OAuthProvider, scopes?: string[]) {
				try {
					account.createOAuth2Session(
						provider,
						PUBLIC_ENDPOINT + '/auth/oauth/success',
						PUBLIC_ENDPOINT + '/auth/oauth/failure',
						scopes,
					);
				} catch (exception: unknown) {
					await auth.exception(exception);
				}
			},
			async success() {
				try {
					await auth.get();
					await goto('/account');
				} catch (exception: unknown) {
					await auth.exception(exception);
				}
			},
			async failure() {
				try {
					await auth.logout();
				} catch (exception: unknown) {
					await auth.exception(exception);
				}
			},
		},
		async get() {
			try {
				auth.session = auth.session ?? (await account.getSession('current'));
				auth.user = auth.user ?? (await account.get());
			} catch (exception: unknown) {
				await auth.exception(exception);
			}
		},
		authenticated() {
			return auth.session !== null && auth.user !== null;
		},
		async guard(pathname: string | undefined, cancel: undefined | (() => void)) {
			let url = null;
			if (pathname?.startsWith('/account')) {
				if (!auth.authenticated()) url = '/auth';
			} else if (pathname?.startsWith('/auth/finish')) {
				if (!auth.authenticated()) url = '/auth';
			} else if (pathname?.startsWith('/auth')) {
				if (auth.authenticated()) url = '/account';
			}

			if (url && pathname !== url) {
				if (cancel) cancel();
				await goto(url);
			}
		},
		async update() {
			try {
				if (auth.session) auth.session = await account.updateSession(auth.session.$id);
			} catch (exception: unknown) {
				await auth.exception(exception);
			}
		},
		async create(email: string, password: string, url: null | string = '/account') {
			try {
				auth.user = await account.create(Appwrite.ID.unique(), email, password);
				await auth.createEmailPasswordSession(email, password, url);
				await goto('/auth/finish');
			} catch (exception: unknown) {
				await auth.exception(exception);
			}
		},
		async createEmailPasswordSession(email: string, password: string, url: null | string = '/account') {
			try {
				await auth.logout(null);
			} catch (exception: unknown) {
				await auth.exception(exception);
			}

			try {
				auth.session = await account.createEmailPasswordSession(email, password);
				await auth.get();
				if (url) await goto(url);
			} catch (exception: unknown) {
				await auth.exception(exception);
			}
		},
		async logout(url: null | string = '/auth') {
			try {
				if (auth.error?.type !== 'general_rate_limit_exceeded') {
					if (auth.session) await account.deleteSession(auth.session.$id);
				}
			} catch (exception: unknown) {
				await auth.exception(exception);
			} finally {
				auth.session = null;
				auth.user = null;
				if (url) await goto(url);
			}
		},
		expiring(): boolean | undefined {
			if (auth.session) {
				return auth.session.providerAccessTokenExpiry !== ''
					? Date.now() > new Date(auth.session.providerAccessTokenExpiry).getTime() - 1000 * 10
					: Date.now() > new Date(auth.session.expire).getTime() - 1000 * 10;
			}

			return undefined;
		},
		expired(): boolean | undefined {
			if (auth.session) {
				return auth.session.providerAccessTokenExpiry !== ''
					? Date.now() > new Date(auth.session.providerAccessTokenExpiry).getTime()
					: Date.now() > new Date(auth.session.expire).getTime();
			}

			return undefined;
		},
		async exception(exception: unknown) {
			if (exception instanceof Appwrite.AppwriteException) {
				auth.error = exception;
				if (exception.type === 'general_rate_limit_exceeded') {
					await this.logout();
					return;
				}
			} else {
				throw exception;
			}
		},
		async initialize() {
			await auth.get();
			await auth.guard(window.location.pathname, undefined);

			if (window.session !== undefined) await clearIntervalAsync(window.session);
			window.session = setIntervalAsync(async () => {
				if (auth.expired() === true) {
					await auth.logout(null);
					return;
				}

				if (auth.expiring() === true) {
					await auth.update();
					return;
				}
			}, 1000);
		},
	});

	return auth;
};

export default auth();
