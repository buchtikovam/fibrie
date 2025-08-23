import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sentrySvelteKit } from '@sentry/sveltekit';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['cookie', 'url', 'globalVariable', 'baseLocale'],
		}),
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: 'fibrie',
				project: 'javascript-sveltekit',
			},
		}),
		tailwindcss(),
		sveltekit(),
	],
	optimizeDeps: {
		exclude: ['@fontsource-variable/outfit'],
		include: ['appwrite', '@sentry/sveltekit'],
	},
});
