import { PUBLIC_ENDPOINT } from '$env/static/public';
import { clearIntervalAsync, setIntervalAsync } from 'set-interval-async';

import { browser } from '$app/environment';
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
				if (!browser) return;

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
				if (!browser) return;

				try {
					await auth.get();
					await goto('/app');
				} catch (exception: unknown) {
					await auth.exception(exception);
				}
			},
			async failure() {
				if (!browser) return;

				try {
					await auth.logout();
				} catch (exception: unknown) {
					await auth.exception(exception);
				}
			},
		},
		async get() {
			if (!browser) return;

			try {
				auth.session = auth.session ?? (await account.getSession('current'));
				auth.user = auth.user ?? (await account.get());
			} catch (exception: unknown) {
				await auth.exception(exception);
			}
		},
		authenticated() {
			if (!browser) return;

			return auth.session !== null && auth.user !== null;
		},
		async guard(pathname: string | undefined, cancel: undefined | (() => void)) {
			if (!browser) return;

			let url = null;

			console.log(pathname);
			if (pathname?.startsWith('/app')) {
				if (!auth.authenticated()) url = '/auth/login';
			} else if (pathname?.startsWith('/auth')) {
				console.log('case2');
				console.log(auth.authenticated());
				if (auth.authenticated()) url = '/app';
			}

			if (url && pathname !== url) {
				console.log('if');
				if (cancel) cancel();
				await goto(url);
			}
		},
		async update() {
			if (!browser) return;

			try {
				if (auth.session) auth.session = await account.updateSession(auth.session.$id);
			} catch (exception: unknown) {
				await auth.exception(exception);
			}
		},
		async create(email: string, password: string, url: null | string = '/app') {
			if (!browser) return;

			try {
				auth.user = await account.create(Appwrite.ID.unique(), email, password);
				await auth.createEmailPasswordSession(email, password, url);
				await goto('/app');
			} catch (exception: unknown) {
				await auth.exception(exception);
			}
		},
		async createEmailPasswordSession(email: string, password: string, url: null | string = '/app') {
			if (!browser) return;

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
		async logout(url: null | string = '/auth/login') {
			if (!browser) return;

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
			if (!browser) return;

			if (auth.session) {
				return auth.session.providerAccessTokenExpiry !== ''
					? Date.now() > new Date(auth.session.providerAccessTokenExpiry).getTime() - 1000 * 10
					: Date.now() > new Date(auth.session.expire).getTime() - 1000 * 10;
			}

			return undefined;
		},
		expired(): boolean | undefined {
			if (!browser) return;

			if (auth.session) {
				return auth.session.providerAccessTokenExpiry !== ''
					? Date.now() > new Date(auth.session.providerAccessTokenExpiry).getTime()
					: Date.now() > new Date(auth.session.expire).getTime();
			}

			return undefined;
		},
		async exception(exception: unknown) {
			if (!browser) return;

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
			if (!browser) return;

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
