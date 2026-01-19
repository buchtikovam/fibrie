import type { Component } from 'svelte';

export interface ProfileNavItem {
	id: string;
	label: string;
	href: string;
	icon: Component;
}
