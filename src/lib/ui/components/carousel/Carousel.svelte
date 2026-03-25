<script lang="ts">
	import { storage } from '$appwrite/storage';

	interface Props {
		bucketId: string;
		imageIds: string[]|null;
		carouselRef: HTMLElement | null;
		currentImageIndex: number;
	}

	let { bucketId, imageIds, carouselRef = $bindable(), currentImageIndex = $bindable() }: Props = $props();

	let loadedStates = $state<Record<string, boolean>>({});

	let deviceWidth = $state(0);
	let optimizedUrls = $derived(
		deviceWidth === 0 || imageIds === null
			? []
			: imageIds.map((id) => storage.getFilePreview({ bucketId, fileId: id, width: deviceWidth })),
	);

	function handleCarouselScroll(e: Event & { currentTarget: HTMLElement }) {
		const target = e.currentTarget;
		currentImageIndex = Math.round(target.scrollLeft / target.clientWidth);
	}
</script>

<svelte:window bind:innerWidth={deviceWidth} />

<div
	class="absolute inset-0 carousel h-full w-full overflow-x-scroll overflow-y-hidden scroll-smooth bg-base-300"
	bind:this={carouselRef}
	onscroll={handleCarouselScroll}
>
	{#each imageIds as id, i (id)}
		<div class="relative carousel-item w-full shrink-0 snap-center bg-base-200">
			{#if deviceWidth === 0 || !loadedStates[i]}
				<div class="absolute inset-0 h-full w-full skeleton rounded-none"></div>
			{/if}

			{#if deviceWidth > 0}
				<img
					src={optimizedUrls[i]}
					alt="Preview {i + 1}"
					loading={i === 0 ? 'eager' : 'lazy'}
					onload={() => (loadedStates[i] = true)}
					class="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out {loadedStates[
						i
					]
						? 'opacity-100'
						: 'opacity-0'}"
				/>
			{/if}
		</div>
	{/each}

	<!-- TODO: placeholder if no img ids -->
</div>
