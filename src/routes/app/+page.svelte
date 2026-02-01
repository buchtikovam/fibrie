<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { resolve } from '$app/paths';

	import { account } from '$appwrite/account';

	import { Search } from '$icons';

	import Heading from '$ui/components/typography/Heading.svelte';

	import * as m from '$lib/paraglide/messages';
</script>

<Heading>{m.routes_explore_heading()}</Heading>

<label class="input w-full">
	<Search class="h-[1em] opacity-50" stroke="currentColor" />
	<input type="search" class="w-full grow" placeholder="Search" />
</label>

<button
	onclick={async () => {
		await account.deleteSession({ sessionId: 'current' });
		await invalidate('app:user');
		await goto(resolve('/auth'));
	}}>logout</button
>
