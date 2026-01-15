import type { DockItem } from '$lib/features/navigation/types';

import * as m from '$lib/paraglide/messages';
import { BookOpenText, Earth, Hammer, Rabbit, Search } from '@lucide/svelte';

export function getDockItems(): DockItem[] {
	return [
		{ id: 'explore', label: m.components_dock_explore(), href: '/explore', icon: Search },
		{ id: 'library', label: m.components_dock_library(), href: '/library', icon: BookOpenText },
		{ id: 'tools', label: m.components_dock_tools(), href: '/tools', icon: Hammer },
		{ id: 'assistant', label: m.components_dock_assistant(), href: '/assistant', icon: Rabbit },
		{ id: 'connect', label: m.components_dock_connect(), href: '/connect', icon: Earth },
	];
}
