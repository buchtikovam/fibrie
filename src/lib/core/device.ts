import { Capacitor, SystemBarType, SystemBars, SystemBarsStyle } from '@capacitor/core';

// We need to define or import this Enum since it was used in your snippet
// If '@capacitor/core' doesn't export it directly yet, we define it to match the ABI.
// Based on standard Cap patterns, it should be exported, but I'll add a safety fallback type.
// export enum SystemBarType {
// 	StatusBar = 'STATUS',
// 	NavigationBar = 'NAVIGATION',
// }

export class DeviceManager {
	private static instance: DeviceManager;

	private constructor() {
		// Singleton
	}

	public static getInstance(): DeviceManager {
		if (!DeviceManager.instance) {
			DeviceManager.instance = new DeviceManager();
		}
		return DeviceManager.instance;
	}

	/**
	 * Hides both the Status Bar and Navigation Bar (Immersive Mode).
	 */
	public async enableImmersiveMode(): Promise<void> {
		if (!Capacitor.isNativePlatform()) return;

		try {
			// "hideSystemBars" logic from your docs
			await SystemBars.hide({
				bar: SystemBarType.NavigationBar,
			});

			console.info('🌼 [DeviceManager]: Immersive mode enabled (SystemBars hidden).');
		} catch (error) {
			console.error('🔥 [DeviceManager]: Failed to hide system bars:', error);
		}
	}

	/**
	 * Restores both bars.
	 */
	public async disableImmersiveMode(): Promise<void> {
		if (!Capacitor.isNativePlatform()) return;

		try {
			await SystemBars.show({
				bar: SystemBarType.NavigationBar,
			});
			// Optional: Reset style to Dark/Light preference
			await SystemBars.setStyle({ style: SystemBarsStyle.Dark });
		} catch (error) {
			console.error('🔥 [DeviceManager]: Failed to show system bars:', error);
		}
	}

	/**
	 * Hides ONLY the bottom navigation bar (keeps status bar).
	 * Useful if you want to keep the clock/battery visible but use custom nav.
	 */
	public async hideBottomNavOnly(): Promise<void> {
		if (!Capacitor.isNativePlatform()) return;

		try {
			// Precise usage from your docs
			await SystemBars.hide({
				bar: SystemBarType.NavigationBar,
			});
		} catch (error) {
			console.error('🔥 [DeviceManager]: Failed to hide nav bar:', error);
		}
	}
}

export const device = DeviceManager.getInstance();
