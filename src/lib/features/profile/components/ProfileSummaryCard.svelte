<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import SubHeading from '$lib/ui/components/typography/SubHeading.svelte';

	import { resolve } from '$app/paths';

	import { ChevronRight } from '$icons';
</script>

<a
	href={resolve('/profile/my-profile')}
	class="btn btn-ghost h-auto min-h-20 w-full flex-row items-center justify-between gap-4 p-2 no-underline"
>
	<div class="avatar">
		<div class="w-20 rounded-full">
			<img alt="profile_picture" src="https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp" />
		</div>
	</div>

	<div class="flex-1 flex-col items-start text-left">
		<SubHeading>Jane Doe</SubHeading>
		<span class="text-base-content/70 text-sm font-normal">
			{m.routes_profile_nav_my_profile()}
		</span>
	</div>

	<div class="text-base-content/50">
		<ChevronRight strokeWidth="3" />
	</div>
</a>
