<script>
	import { RotateCcw } from '$icons';

	import Header from '$ui/blocks/Header.svelte';

	import * as m from '$lib/paraglide/messages.js';
</script>

<Header title={m.routes_profile_preferences_heading()}>
	<button class="btn btn-circle">
		<RotateCcw class="size-5" />
	</button>
</Header>
