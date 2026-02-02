import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'fallback.html',
			precompress: false,
			strict: true,
		}),
		alias: {
			$appwrite: './src/lib/appwrite',
			$assets: './src/lib/assets',
			$preferences: './src/lib/preferences',
			$icons: './node_modules/@lucide/svelte/dist/icons',
			$ui: './src/lib/ui',
		},
		paths: {
			relative: false, // Required for PostHog session replay to work correctly
		},
	},
};

export default config;
