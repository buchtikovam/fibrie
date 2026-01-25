<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import OAuthButtons from '$lib/features/auth/components/OAuthButtons.svelte';
	import { authStore } from '$lib/features/auth/store.svelte';
	import LineSeparator from '$lib/ui/components/separators/LineSeparator.svelte';

	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let email = $state('');
	let password = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const { success } = await authStore.login({ email, password });

		if (success) {
			await goto(resolve('/app/dashboard'));
		}
	}
</script>

<div class="card max-w-sm bg-base-100 w-full">
	<form onsubmit={handleSubmit} class="card-body">
		<h1 class="card-title text-2xl mb-4 font-bold justify-center">{m.routes_auth_login_heading()} 👋</h1>

		<OAuthButtons usage="login" />
		<LineSeparator label={m.routes_auth_line_separator_label()} />

		<div class="mb-2">
			<label class="label" for="email">{m.routes_auth_login_input_email_label()}</label>
			<input
				type="email"
				placeholder={m.routes_auth_login_input_email_placeholder()}
				id="email"
				bind:value={email}
				class="input input-bordered w-full"
				required
			/>
		</div>

		<div>
			<label class="label flex items-center justify-between" for="password">
				<span class="label-text">{m.routes_auth_login_input_password_label()}</span>
				<a href="/auth/password-request" class="link">{m.routes_auth_login_input_password_lost()}</a>
			</label>
			<input
				type="password"
				id="password"
				placeholder="••••••••"
				bind:value={password}
				class="input input-bordered w-full"
				required
			/>
		</div>

		{#if authStore.error}
			<div role="alert" class="alert alert-error mt-4 text-sm"><span>{authStore.error}</span></div>
		{/if}

		<div class=" mt-6 flex flex-col gap-4">
			<button class="btn btn-primary w-full" disabled={authStore.isLoading}>
				{m.routes_auth_login_submit()}
			</button>

			<div class="text-center text-sm">
				{m.routes_auth_login_is_new_account()}
				<a href="/auth/register" class="link font-bold">{m.routes_auth_login_redirect_register()}</a>
			</div>
		</div>
	</form>
</div>
