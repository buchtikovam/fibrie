<script lang="ts">
	import { goto } from '$app/navigation';
	import { invalidate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import { account } from '$appwrite/account';

	import { preferences } from '$preferences';

	import LineSeparator from '$ui/components/separators/LineSeparator.svelte';
	import AppleIcon from '$ui/icons/AppleIcon.svelte';
	import GoogleIcon from '$ui/icons/GoogleIcon.svelte';

	import * as m from '$lib/paraglide/messages';
	import * as v from 'valibot';
	import { helper } from '$lib';
	import { ID, type Models, OAuthProvider } from 'appwrite';

	const EmailSchema = v.pipe(
		v.string(),
		v.trim(),
		v.nonEmpty(m.routes_auth_input_email_error_required()),
		v.email(m.routes_auth_input_email_error_invalid()),
	);

	const SecretSchema = v.pipe(
		v.string(),
		v.trim(),
		v.length(6, m.routes_auth_input_secret_error_length({ secretLength: 6 })),
	);

	let email = $state('');
	let secret = $state<string>('');
	let token = $state<Models.Token>();
	let errors = $state<{ email?: string; secret?: string }>({});

	let countdown = $state(0);
	const COOLDOWN_SECONDS = 30;
	let timer: ReturnType<typeof setInterval> | null = null;
	const canResend = $derived(countdown === 0);

	$effect(() => {
		return () => {
			if (timer) clearInterval(timer);
		};
	});

	function startCooldown() {
		countdown = COOLDOWN_SECONDS;
		if (timer) clearInterval(timer);

		timer = setInterval(() => {
			if (countdown > 0) {
				countdown--;
			} else {
				if (timer) clearInterval(timer);
			}
		}, 1000);
	}

	function validate<T>(
		schema: v.BaseSchema<unknown, T, v.BaseIssue<unknown>>,
		value: unknown,
		field: 'email' | 'secret',
	): boolean {
		const result = v.safeParse(schema, value);

		if (result.success) {
			errors[field] = undefined;
			return true;
		} else {
			errors[field] = result.issues[0].message;
			return false;
		}
	}

	async function createOAuth2(provider: OAuthProvider) {
		try {
			account.createOAuth2Session({
				provider: provider,
				success: new URL('auth/callback/success', page.url).href,
				failure: new URL('auth/callback/failure', page.url).href,
			});
		} catch (error: unknown) {
			alert(error);
		}
	}

	async function createEmailToken() {
		if (!validate(EmailSchema, email, 'email')) return;

		try {
			token = await account.createEmailToken({ userId: ID.unique(), email });
			startCooldown();
		} catch (error: unknown) {
			alert(error);
			// 	console.error(helper.error.toString(error));
			// 	return;
		}
	}

	async function createSession(token: Models.Token) {
		if (!validate(SecretSchema, secret, 'secret')) return;

		try {
			await account.createSession({ userId: token.userId, secret });

			const prefs: Partial<typeof preferences.prefs.get> | null = await preferences.prefs.get();
			if (prefs) {
				await account.updatePrefs({ prefs });
				await preferences.prefs.remove();
			}
		} catch (error: unknown) {
			errors['secret'] = m.routes_auth_session_error({ type: helper.error.type(error) ?? '' });
			return;
		}

		await invalidate('app:user');
		await goto(resolve('/app'));
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center bg-primary/25 p-6">
	<div class="card w-full max-w-sm bg-base-100">
		<form
			onsubmit={(e) => {
				e.preventDefault();
				if (token) {
					createSession(token);
				} else {
					createEmailToken();
				}
			}}
			class="card-body"
		>
			<h1 class="mb-4 card-title justify-center text-2xl font-bold">{m.routes_auth_heading()} 👋</h1>

			<button
				type="button"
				class="btn flex w-full gap-2 btn-outline"
				onclick={() => createOAuth2(OAuthProvider.Apple)}
			>
				<AppleIcon />
				{m.routes_auth_oauth_button_apple()}
			</button>

			<button
				type="button"
				class="btn flex w-full gap-3 btn-outline"
				onclick={() => createOAuth2(OAuthProvider.Google)}
			>
				<GoogleIcon />
				{m.routes_auth_oauth_button_google()}
			</button>

			<LineSeparator label={m.routes_auth_line_separator_label()} />

			{#if !token}
				<fieldset class="fieldset">
					<label class="fieldset-label h-5" for="email">{m.routes_auth_input_email_label()}</label>
					<input
						type="email"
						placeholder={m.routes_auth_input_email_placeholder()}
						id="email"
						bind:value={email}
						onblur={() => validate(EmailSchema, email, 'email')}
						class="input w-full {errors.email ? 'input-error' : ''}"
						required
					/>
					{#if errors.email}
						<p class="fieldset-label text-error">{errors.email}</p>
					{/if}
				</fieldset>
			{:else}
				<fieldset class="fieldset">
					<div class=" flex items-center justify-between">
						<label class="fieldset-label h-5" for="secret">
							{m.routes_auth_input_secret_label()}
						</label>

						{#if !canResend}
							<span class="h-5 font-mono text-xs text-base-content/50">
								Resend in {countdown}s
							</span>
						{:else}
							<button
								type="button"
								class="btn h-5 px-0 text-primary btn-ghost btn-xs"
								onclick={createEmailToken}
							>
								Resend Code
							</button>
						{/if}
					</div>

					<input
						type="text"
						placeholder="123456"
						id="secret"
						bind:value={secret}
						onblur={() => validate(SecretSchema, secret, 'secret')}
						maxlength="6"
						class="input w-full {errors.secret ? 'input-error' : ''}"
						required
					/>
					{#if errors.secret}
						<p class="fieldset-label text-error">{errors.secret}</p>
					{/if}
				</fieldset>
			{/if}

			<div class=" mt-6 flex flex-col gap-4">
				<button class="btn w-full btn-primary">
					{m.routes_auth_submit()}
				</button>
			</div>
		</form>
	</div>
</div>
