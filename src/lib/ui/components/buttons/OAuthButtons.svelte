<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import AppleIcon from '$lib/ui/icons/AppleIcon.svelte';
	import GoogleIcon from '$lib/ui/icons/GoogleIcon.svelte';

	interface Props {
		usage: 'login' | 'register';
	}

	let { usage }: Props = $props();
</script>

<button class="btn btn-outline w-full flex gap-2">
	<AppleIcon />
	{#if usage === 'register'}
		{m.routes_auth_register_oauth_button_apple()}
	{:else}
		{m.routes_auth_login_oauth_button_apple()}
	{/if}
</button>

<button class="btn btn-outline w-full flex gap-3">
	<GoogleIcon />
	{#if usage === 'register'}
		{m.routes_auth_register_oauth_button_google()}
	{:else}
		{m.routes_auth_login_oauth_button_google()}
	{/if}
</button>
