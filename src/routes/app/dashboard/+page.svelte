<script lang="ts">
	import { Search } from '$icons';

	import * as m from '$lib/paraglide/messages';
	import Heading from '$lib/ui/components/typography/Heading.svelte';
</script>

<Heading>{m.routes_explore_heading()}</Heading>

<label class="input w-full">
	<Search class="h-[1em] opacity-50" stroke="currentColor" />
	<input type="search" class="w-full grow" placeholder="Search" />
</label>
