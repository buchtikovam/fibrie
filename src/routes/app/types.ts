import type { Component } from 'svelte';

export interface DockItem {
	id: string;
	label: string;
	href: string | any;
	icon: Component;
}
