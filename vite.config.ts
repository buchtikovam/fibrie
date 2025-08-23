import { sentrySvelteKit } from "@sentry/sveltekit";
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';

// import pkg from './package.json';

export default defineConfig({
	plugins: [sentrySvelteKit({
        sourceMapsUploadOptions: {
            org: "fibrie",
            project: "javascript-sveltekit"
        }
    }), tailwindcss(), sveltekit()],
	optimizeDeps: {
		exclude: ['@fontsource-variable/outfit'],
		// include: [...Object.keys(pkg.dependencies)],
	},
});