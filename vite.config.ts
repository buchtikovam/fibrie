import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['cookie', 'url', 'globalVariable', 'baseLocale'],
		}),
	],
	optimizeDeps: {
		entries: ['src/routes/**/+*.{js,ts,svelte}', 'src/hooks*.{js,ts}]'],
	},
});
