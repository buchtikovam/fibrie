import type { DockItem } from '$lib/features/navigation/types';

import * as m from '$lib/paraglide/messages';
import { BookOpenText, Hammer, Rabbit, Search, User } from '@lucide/svelte';

import { resolve } from '$app/paths';

export function getDockItems(): DockItem[] {
	return [
		{ id: 'explore', label: m.components_dock_explore(), href: resolve('/app/dashboard'), icon: Search },
		{ id: 'library', label: m.components_dock_library(), href: resolve('/app/library'), icon: BookOpenText },
		{ id: 'assistant', label: m.components_dock_assistant(), href: resolve('/app/assistant'), icon: Rabbit },
		{ id: 'tools', label: m.components_dock_tools(), href: resolve('/app/tools'), icon: Hammer },
		{ id: 'profile', label: m.components_dock_profile(), href: resolve('/app/profile'), icon: User },
	];
}
