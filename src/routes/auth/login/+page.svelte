<script lang="ts">
	import { goto } from '$app/navigation';
	import { invalidate } from '$app/navigation';
	import { resolve } from '$app/paths';

	import { account } from '$appwrite/account';

	import OAuthButtons from '$ui/components/buttons/OAuthButtons.svelte';
	import LineSeparator from '$ui/components/separators/LineSeparator.svelte';

	import * as m from '$lib/paraglide/messages';
	import { helper } from '$lib';

	let email = $state('');
	let password = $state('');
	// let error = $state<string | undefined>(undefined);

	async function createEmailPasswordSession() {
		try {
			await account.createEmailPasswordSession({ email, password });
		} catch (error: unknown) {
			console.error(helper.error.toString(error));
			return;
		}

		await invalidate('app:user');
		await goto(resolve('/app/dashboard'));
	}
</script>

<div class="card w-full max-w-sm bg-base-100">
	<form onsubmit={createEmailPasswordSession} class="card-body">
		<h1 class="mb-4 card-title justify-center text-2xl font-bold">{m.routes_auth_login_heading()} 👋</h1>

		<OAuthButtons usage="login" />
		<LineSeparator label={m.routes_auth_line_separator_label()} />

		<div class="mb-2">
			<label class="label" for="email">{m.routes_auth_login_input_email_label()}</label>
			<input
				type="email"
				placeholder={m.routes_auth_login_input_email_placeholder()}
				id="email"
				bind:value={email}
				class="input-bordered input w-full"
				required
			/>
		</div>

		<div>
			<label class="label flex items-center justify-between" for="password">
				<span class="label-text">{m.routes_auth_login_input_password_label()}</span>
				<a href={resolve('/auth/password-request')} class="link">{m.routes_auth_login_input_password_lost()}</a>
			</label>
			<input
				type="password"
				id="password"
				placeholder="••••••••"
				bind:value={password}
				class="input-bordered input w-full"
				required
			/>
		</div>

		<!--{#if authStore.error}-->
		<!--			<div role="alert" class="mt-4 alert text-sm alert-error"><span>{authStore.error}</span></div>-->
		<!--		{/if}-->

		<div class=" mt-6 flex flex-col gap-4">
			<button class="btn w-full btn-primary">
				{m.routes_auth_login_submit()}
			</button>

			<div class="text-center text-sm">
				{m.routes_auth_login_is_new_account()}
				<a href={resolve('/auth/register')} class="link font-bold">{m.routes_auth_login_redirect_register()}</a>
			</div>
		</div>
	</form>
</div>
