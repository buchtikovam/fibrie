import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'app.fibrie',
	appName: 'fibrie',
	webDir: 'build',
	server: {
		url: 'http://172.16.2.160:5173',
		cleartext: true,
	},
	plugins: {
		SystemBars: {
			insetsHandling: 'css',
			style: 'DARK',
			hidden: false,
			animation: 'NONE',
		},
	},
};

export default config;
