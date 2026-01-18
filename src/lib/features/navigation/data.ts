import type { DockItem } from '$lib/features/navigation/types';

import * as m from '$lib/paraglide/messages';
import { BookOpenText, Hammer, Rabbit, Search, User } from '@lucide/svelte';

export function getDockItems(): DockItem[] {
	return [
		{ id: 'explore', label: m.components_dock_explore(), href: '/dashboard', icon: Search },
		{ id: 'library', label: m.components_dock_library(), href: '/library', icon: BookOpenText },
		{ id: 'assistant', label: m.components_dock_assistant(), href: '/assistant', icon: Rabbit },
		{ id: 'tools', label: m.components_dock_tools(), href: '/tools', icon: Hammer },
		{ id: 'profile', label: m.components_dock_profile(), href: '/profile', icon: User },
	];
}
