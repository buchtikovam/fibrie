import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: true,
		}),
		alias: {
			$appwrite: './src/lib/appwrite',
			$cache: './src/lib/cache',
			$account: './src/lib/appwrite/account',
			$collections: './src/lib/appwrite/database/collections',
			$buckets: './src/lib/appwrite/storage/buckets',
			$auth: './src/lib/auth/index.svelte',
			$animation: './src/lib/animation/index.svelte',
			$hooks: './src/lib/hooks',
			$locale: './src/lib/locale/index.svelte',
			$blocks: './src/lib/components/blocks',
			$elements: './src/lib/components/elements',
			$icons: './node_modules/@lucide/svelte/dist/icons',
			$ui: './src/lib/components/ui',
		},
	},
};

export default config;
