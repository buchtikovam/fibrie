<script lang="ts">
	import { resolve } from '$app/paths';

	import { Mail, Search } from '$icons';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex flex-col gap-6 p-6">
	<div class="flex items-center gap-4">
		<a href={resolve('/app/profile')} aria-label="View Profile" class="flex flex-1 items-center gap-4">
			<div class="avatar">
				<div class="flex w-10 items-center justify-center rounded-full bg-base-200">
					<img alt="temp_avatar" src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
				</div>
			</div>
			<div class="flex flex-col justify-center">
				<p class="text-md leading-tight">Welcome,</p>
				<p class="text-md leading-tight font-bold">{data.user.name}</p>
			</div>
		</a>

		<a class="btn btn-circle bg-base-300" href={resolve('/app/mail')} aria-label="Show Mail">
			<Mail class="size-5" />
		</a>
	</div>

	<a
		href={resolve('/app/search')}
		class="input-bordered input flex w-full cursor-pointer items-center gap-2 transition-colors hover:input-primary"
		aria-label="Search Patterns"
	>
		<Search class="mx-1 size-4 text-base-content/50" />

		<span class="grow text-base-content/50"> Search patterns </span>
	</a>

	<a href={resolve('/app/patterns/123')}>patterns</a>
</div>
