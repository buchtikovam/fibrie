import { PUBLIC_POSTHOG_HOST, PUBLIC_POSTHOG_KEY } from '$env/static/public';

import { redirect } from '@sveltejs/kit';

import { browser } from '$app/environment';
import { resolve } from '$app/paths';

import * as m from '$lib/paraglide/messages';
import { BookOpenText, Earth, Hammer, House, Rabbit } from '@lucide/svelte';
import posthog from 'posthog-js';

import type { LayoutLoad } from './$types';
import type { DockItem } from './types';

export const ssr = false;
export const prerender = true;

export const load: LayoutLoad = async ({ parent }) => {
	if (browser) {
		posthog.init(PUBLIC_POSTHOG_KEY, {
			api_host: PUBLIC_POSTHOG_HOST,
			capture_pageview: false,
			capture_pageleave: false,
			capture_exceptions: true,
		});
	}

	const { user } = await parent();

	if (user === undefined) {
		throw redirect(303, resolve('/auth'));
	}

	return {
		user,
		dock: [
			{ id: 'home', label: m.components_dock_home(), href: '/app', icon: House },
			{ id: 'library', label: m.components_dock_library(), href: '/app/library', icon: BookOpenText },
			{ id: 'burrow', label: m.components_dock_burrow(), href: '/app/burrow', icon: Rabbit },
			{ id: 'tools', label: m.components_dock_tools(), href: '/app/tools', icon: Hammer },
			{ id: 'profile', label: m.components_dock_connect(), href: '/app/connect', icon: Earth },
		] as DockItem[],
	};
};
