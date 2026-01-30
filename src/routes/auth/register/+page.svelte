<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { resolve } from '$app/paths';

	import { account } from '$appwrite/account';

	import { preferences } from '$preferences';

	import OAuthButtons from '$ui/components/buttons/OAuthButtons.svelte';
	import LineSeparator from '$ui/components/separators/LineSeparator.svelte';

	import * as m from '$lib/paraglide/messages';
	import { helper } from '$lib';
	import { ID } from 'appwrite';

	let name = $state('');
	let email = $state('');
	let password = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		try {
			const prefs = await preferences.prefs.get();
			if (prefs === null) return;

			await account.create({ userId: ID.unique(), email, password, name });
			await account.createEmailPasswordSession({ email, password });
			await account.updatePrefs<Appwrite.Preferences>({ prefs });

			await preferences.prefs.remove();
		} catch (error: unknown) {
			console.error(helper.error.toString(error));
			return;
		}

		await invalidate('app:user');
		await goto(resolve('/app/dashboard'));
	}
</script>

<div class="card w-full max-w-sm bg-base-100">
	<form onsubmit={handleSubmit} class="card-body">
		<h1 class="mb-4 card-title justify-center text-2xl font-bold">{m.routes_auth_register_heading()} 🫶</h1>

		<OAuthButtons usage="register" />
		<LineSeparator label={m.routes_auth_line_separator_label()} />

		<div class="mb-2">
			<label class="label" for="name">{m.routes_auth_register_input_name_label()}</label>
			<input
				type="text"
				placeholder={m.routes_auth_register_input_name_placeholder()}
				id="name"
				bind:value={name}
				class="input-bordered input w-full"
				required
			/>
		</div>

		<div class="mb-2">
			<label class="label" for="email">{m.routes_auth_register_input_email_label()}</label>
			<input
				type="email"
				placeholder={m.routes_auth_register_input_email_placeholder()}
				id="email"
				bind:value={email}
				class="input-bordered input w-full"
				required
			/>
		</div>

		<div>
			<label class="label" for="password">
				<span class="label-text">{m.routes_auth_register_input_password_label()}</span>
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
		<!--			<div role="alert" class="alert alert-error mt-4 text-sm"><span>{authStore.error}</span></div>-->
		<!--		{/if}-->

		<div class=" mt-6 flex flex-col gap-4">
			<button class="btn w-full btn-primary">
				{m.routes_auth_register_submit()}
			</button>

			<div class="text-center text-sm">
				{m.routes_auth_register_has_account()}
				<a href={resolve('/auth/login')} class="link font-bold">{m.routes_auth_register_redirect_login()}</a>
			</div>
		</div>
	</form>
</div>
