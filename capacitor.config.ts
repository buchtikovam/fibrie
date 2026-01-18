import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'app.fibrie',
	appName: 'fibrie',
	webDir: 'build',
	server: {
		// url: 'http://172.16.2.160:5173', // pouze pro live-preview
		// cleartext: true, // pouze pro live-preview
		errorPath: 'error.html',
	},
	android: {
		minWebViewVersion: 113,
	},
};

export default config;
