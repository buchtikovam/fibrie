import { redirect } from '@sveltejs/kit';

import { resolve } from '$app/paths';

import * as m from '$lib/paraglide/messages';
import { BookOpenText, Earth, Hammer, House, Rabbit } from '@lucide/svelte';

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
			{ id: 'home', label: m.components_dock_home(), href: '/app', icon: House },
			{ id: 'library', label: m.components_dock_library(), href: '/app/library', icon: BookOpenText },
			{ id: 'burrow', label: m.components_dock_burrow(), href: '/app/burrow', icon: Rabbit },
			{ id: 'tools', label: m.components_dock_tools(), href: '/app/tools', icon: Hammer },
			{ id: 'profile', label: m.components_dock_connect(), href: '/app/connect', icon: Earth },
		] as DockItem[],
	};
};
