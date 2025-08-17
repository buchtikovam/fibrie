import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'app.fibrie',
	appName: 'fibrie',
	webDir: 'build',
	server: {
		url: 'http://172.16.2.146:5173',
		cleartext: true,
	},
};

export default config;
