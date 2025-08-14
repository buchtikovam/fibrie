import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';

// import pkg from './package.json';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	optimizeDeps: {
		exclude: ['@fontsource-variable/outfit'],
		include: [
			// ...Object.keys(pkg.dependencies),
		],
	},
});
