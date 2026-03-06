<script lang="ts">
	interface Props {
		imageIds: string[];
		currentImageIndex: number;
		carouselRef: HTMLElement | null;
	}

	let { imageIds, currentImageIndex = $bindable(), carouselRef }: Props = $props();

	function jumpToImage(index: number) {
		if (!carouselRef) return;
		currentImageIndex = index;
		carouselRef.scrollTo({
			left: carouselRef.clientWidth * index,
			behavior: 'smooth',
		});
	}
</script>

{#if imageIds && imageIds.length > 1}
	<div
		class="relative z-10 mx-auto mb-10 flex items-center gap-2 rounded-full border border-base-100 bg-base-300/60 px-4 py-2"
	>
		{#each imageIds as _, i (_)}
			<button
				class="h-2.5 rounded-full transition-all duration-300 {i === currentImageIndex
					? 'w-6 bg-primary'
					: 'w-2.5 bg-base-content/30 hover:bg-base-content/50'}"
				onclick={() => jumpToImage(i)}
				aria-label="View image {i + 1}"
			></button>
		{/each}
	</div>
{/if}
