<script lang="ts">
	import { resolve } from '$app/paths';

	import { Mail, Search } from '$icons';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let promos = [
		{ id: 0 },
		{ id: 1 },
		{ id: 2 },
	];
</script>

<div class="flex items-center gap-4">
	<a href={resolve('/app/profile')} aria-label="View Profile" class="flex flex-1 items-center gap-4">
		<div class="avatar">
			<div class="flex w-10 items-center justify-center rounded-full bg-base-200">
				<img alt="temp_avatar" src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
			</div>
		</div>
		<div class="flex flex-col justify-center">
			<p class="text-sm">Welcome,</p>
			<p class="text-sm font-bold">{data.user.name}</p>
		</div>
	</a>

	<a class="btn btn-circle" href={resolve('/app/mail')} aria-label="Show Mail">
		<Mail class="size-5" />
	</a>
</div>

<a
	href={resolve('/app/search')}
	class="input-bordered input flex w-full cursor-pointer items-center gap-2 transition-colors hover:input-primary"
	aria-label="Search Patterns"
>
	<Search class="mx-1 size-5 text-primary opacity-70" />

	<span class="grow text-base-content/50"> Search patterns </span>
</a>

<section class="">
	<div>
		<p class="font-bold">Continue project</p>
	</div>

	<div class="carousel w-full carousel-center space-x-4 pt-4">
		{#each promos as promo (promo.id)}
			<div class="carousel-item min-h-40 w-[85%] md:w-[60%]">
				<div class="card w-full overflow-visible bg-base-200">
					<div class="relative card-body flex-row items-center p-6"></div>
				</div>
			</div>
		{/each}
	</div>
</section>
