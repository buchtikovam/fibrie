<script lang="ts">
	import SubHeading from '$lib/ui/components/typography/SubHeading.svelte';

	import { resolve } from '$app/paths';

	import { ChevronRight } from '$icons';

	const href = resolve('/');
</script>

<a
	{href}
	class="btn btn-primary text-primary-content shadow-lg w-full h-auto min-h-[7.5rem] p-6 my-2 flex flex-row items-center justify-between gap-4 rounded-3xl no-underline"
>
	<div class="flex-1 flex flex-col items-start text-left">
		<SubHeading>Unlock all features with 14-day free trial</SubHeading>
	</div>

	<div class="text-secondary-content">
		<ChevronRight strokeWidth="3" />
	</div>
</a>
