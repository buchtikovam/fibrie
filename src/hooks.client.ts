import * as Sentry from '@sentry/sveltekit';
import { PUBLIC_SENTRY_DNS } from '$env/static/public';

import type { HandleClientError, ServerInit } from '@sveltejs/kit';

export const init: ServerInit = async () => {
	Sentry.init({
		environment: import.meta.env.MODE,
		dsn: PUBLIC_SENTRY_DNS,
		tracesSampleRate: 1,
		replaysSessionSampleRate: 1,
		replaysOnErrorSampleRate: 1,
		integrations: [
			Sentry.replayIntegration({
				maskAllText: false,
				maskAllInputs: false,
				blockAllMedia: false,
			}),
		],
	});
};

export const handleError: HandleClientError = Sentry.handleErrorWithSentry(async ({ error, status, message }) => {
	console.log(error);
	return {
		status: status,
		message: message,
	};
});
