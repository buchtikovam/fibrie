<script lang="ts">
	import { page } from '$app/stores';

	import { authStore } from '../store.svelte';

	let email = $state('');
	let sent = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		// The URL the user returns to after clicking the email link
		// We usually redirect them to a page that handles the verification
		const resetUrl = `${$page.url.origin}/auth/verify-recovery`;

		const res = await authStore.requestPasswordRecovery(email, resetUrl);
		if (res.success) sent = true;
	}
</script>

<div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
	<div class="card-body">
		<h2 class="card-title text-2xl font-bold justify-center mb-2">Recovery 🔐</h2>

		{#if sent}
			<div class="text-center py-4">
				<div class="text-success text-5xl mb-4">✉️</div>
				<p>Check your email! We sent a link to reset your password.</p>
				<a href="/auth/login" class="btn btn-ghost mt-4">Back to Login</a>
			</div>
		{:else}
			<p class="text-center text-gray-500 mb-4">Enter your email to receive a reset link.</p>
			<form onsubmit={handleSubmit}>
				<div class="form-control">
					<label class="label" for="email"><span class="label-text">Email</span></label>
					<input type="email" id="email" bind:value={email} class="input input-bordered" required />
				</div>

				{#if authStore.error}
					<div role="alert" class="alert alert-error mt-4 text-sm"><span>{authStore.error}</span></div>
				{/if}

				<div class="form-control mt-6">
					<button class="btn btn-primary" disabled={authStore.isLoading}>Send Link</button>
				</div>

				<div class="text-center mt-4">
					<a href="/auth/login" class="link link-hover text-sm">Back to Login</a>
				</div>
			</form>
		{/if}
	</div>
</div>
