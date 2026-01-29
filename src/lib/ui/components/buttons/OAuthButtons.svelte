<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import AppleIcon from '$lib/ui/icons/AppleIcon.svelte';
	import GoogleIcon from '$lib/ui/icons/GoogleIcon.svelte';

	interface Props {
		usage: 'login' | 'register';
	}

	let { usage }: Props = $props();
</script>

<button class="btn flex w-full gap-2 btn-outline">
	<AppleIcon />
	{#if usage === 'register'}
		{m.routes_auth_register_oauth_button_apple()}
	{:else}
		{m.routes_auth_login_oauth_button_apple()}
	{/if}
</button>

<button class="btn flex w-full gap-3 btn-outline">
	<GoogleIcon />
	{#if usage === 'register'}
		{m.routes_auth_register_oauth_button_google()}
	{:else}
		{m.routes_auth_login_oauth_button_google()}
	{/if}
</button>
