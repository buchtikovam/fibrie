import { Capacitor } from '@capacitor/core';
import { SystemBars, SystemBarsStyle } from '@capacitor/core';

// 🛡️ Strict Type Definitions
type HexColor = string;

export class DeviceManager {
	private static instance: DeviceManager;

	private constructor() {
		/* Singleton */
	}

	public static getInstance(): DeviceManager {
		if (!DeviceManager.instance) {
			DeviceManager.instance = new DeviceManager();
		}
		return DeviceManager.instance;
	}

	/**
	 * 🎨 Sets the Status Bar color using the new Capacitor 8 API.
	 * @param color - Hex code (e.g. #14b8a6)
	 * @param isDark - If true, text/icons will be dark (Style.Dark).
	 */
	public async setStatusBar(color: HexColor, isDark: boolean = false): Promise<void> {
		if (!Capacitor.isNativePlatform()) return;

		try {
			// New v8 API: Set style (Text color)
			await SystemBars.setStyle({
				style: isDark ? SystemBarsStyle.Dark : SystemBarsStyle.Light,
			});

			// New v8 API: Set background color
			// Note: v8 handles the "Edge-to-Edge" transparency automatically now!
			await SystemBars.setStatusBarColor({ color });
		} catch (error) {
			console.error('🔥 [DeviceManager] Status Bar Error:', error);
		}
	}

	/**
	 * 🌈 Sets the Navigation Bar color (Android specific).
	 */
	public async setNavigationBar(color: HexColor, isDark: boolean = false): Promise<void> {
		if (!Capacitor.isNativePlatform()) return;

		try {
			await SystemBars.setNavigationBarColor({ color });
		} catch (error) {
			console.error('🔥 [DeviceManager] Nav Bar Error:', error);
		}
	}

	/**
	 * 📱 Immersive Mode: Hides everything.
	 */
	public async enableImmersiveMode(): Promise<void> {
		if (!Capacitor.isNativePlatform()) return;

		try {
			await SystemBars.hide(); // Hides both by default in v8
			console.info('✨ [DeviceManager] Immersive Mode ON');
		} catch (error) {
			console.error('🔥 [DeviceManager] Hide Bars Error:', error);
		}
	}

	/**
	 * 🔙 Restore Bars
	 */
	public async disableImmersiveMode(): Promise<void> {
		if (!Capacitor.isNativePlatform()) return;

		try {
			await SystemBars.show();
			console.info('✨ [DeviceManager] Immersive Mode OFF');
		} catch (error) {
			console.error('🔥 [DeviceManager] Show Bars Error:', error);
		}
	}
}

export const device = DeviceManager.getInstance();
