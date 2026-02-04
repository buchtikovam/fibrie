<script lang="ts">
	import { resolve } from '$app/paths';

	import { ArrowLeftFromLine, Search } from '$icons';

	import { onMount } from 'svelte';

	let searchInput: HTMLInputElement;

	onMount(() => {
		searchInput?.focus();
	});
</script>

<div class="flex items-center gap-2">
	<label class="input-bordered input flex items-center gap-2">
		<Search class="mx-1 size-5 text-primary opacity-70" />

		<input
			bind:this={searchInput}
			type="search"
			required
			placeholder="Search"
			class="grow pl-0 text-sm placeholder:text-base-content/50 focus:ring-0"
		/>
	</label>

	<a href={resolve('/app')} class="btn btn-square btn-ghost btn-sm"><ArrowLeftFromLine class="size-5" /></a>
</div>
