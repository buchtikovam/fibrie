import { redirect } from '@sveltejs/kit';

import { resolve } from '$app/paths';

import * as m from '$lib/paraglide/messages';
import { BookOpenText, Hammer, Rabbit, Search, User } from '@lucide/svelte';

import type { LayoutLoad } from './$types';
import type { DockItem } from './types';

export const ssr = false;
export const prerender = true;

export const load: LayoutLoad = async ({ parent }) => {
	const { user } = await parent();

	if (user === undefined) {
		throw redirect(303, resolve('/auth'));
	}

	return {
		user: user,
		dock: [
			{ id: 'explore', label: m.components_dock_explore(), href: '/app/dashboard', icon: Search },
			{ id: 'library', label: m.components_dock_library(), href: '/app/library', icon: BookOpenText },
			{ id: 'assistant', label: m.components_dock_assistant(), href: '/app/assistant', icon: Rabbit },
			{ id: 'tools', label: m.components_dock_tools(), href: '/app/tools', icon: Hammer },
			{ id: 'profile', label: m.components_dock_profile(), href: '/app/profile', icon: User },
		] as DockItem[],
	};
};
