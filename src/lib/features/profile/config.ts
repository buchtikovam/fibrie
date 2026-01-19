import type { ProfileNavItem } from '$lib/features/profile/types';

import * as m from '$lib/paraglide/messages';

import { resolve } from '$app/paths';

import { Eye, GraduationCap, Heart, LogOut, Mail, ScrollText, Settings, Share, Star, Watch } from '$icons';

export function getProfileMenuItems(): ProfileNavItem[] {
	return [
		{
			id: 'academy',
			label: m.routes_profile_nav_academy(),
			href: resolve('/profile/academy'),
			icon: GraduationCap,
		},
		{
			id: 'connect-to-watch',
			label: m.routes_profile_nav_connect_to_watch(),
			href: resolve('/profile/connect-to-watch'),
			icon: Watch,
		},
		{
			id: 'settings',
			label: m.routes_profile_nav_settings(),
			href: resolve('/profile/settings'),
			icon: Settings,
		},
		{
			id: 'preferences',
			label: m.routes_profile_nav_preferences(),
			href: resolve('/profile/preferences'),
			icon: Star,
		},
		{
			id: 'contact',
			label: m.routes_profile_nav_contact(),
			href: resolve('/profile/contact'),
			icon: Mail,
		},
		{
			id: 'share',
			label: m.routes_profile_nav_share(),
			href: resolve('/profile/share'),
			icon: Share,
		},
		{
			id: 'rating',
			label: m.routes_profile_nav_rating(),
			href: resolve('/profile/rating'),
			icon: Heart,
		},
		{
			id: 'privacy-policy',
			label: m.routes_profile_nav_privacy_policy(),
			href: resolve('/profile/privacy-policy'),
			icon: Eye,
		},
		{
			id: 'terms-and-conditions',
			label: m.routes_profile_nav_terms_and_conditions(),
			href: resolve('/profile/terms-and-conditions'),
			icon: ScrollText,
		},
		{
			id: 'logout',
			label: m.routes_profile_nav_logout(),
			href: resolve('/profile/logout'),
			icon: LogOut,
		},
	];
}
