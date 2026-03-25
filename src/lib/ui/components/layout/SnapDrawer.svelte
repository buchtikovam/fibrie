<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		background: Snippet;
		header: Snippet<[boolean]>;
		children: Snippet;
	}

	let { background, header, children }: Props = $props();

	let mainScrollRef = $state<HTMLElement | null>(null);
	let drawerRef = $state<HTMLElement | null>(null);
	let isDrawerAtTop = $state(false);

	function handleVerticalScroll() {
		if (!mainScrollRef || !drawerRef) return;
		isDrawerAtTop = mainScrollRef.scrollTop >= drawerRef.offsetTop - 2;
	}
</script>

<main
	bind:this={mainScrollRef}
	onscroll={handleVerticalScroll}
	class="relative h-screen w-full overflow-y-auto bg-base-200"
>
	{@render background()}

	<section
		bind:this={drawerRef}
		class="relative z-10 -mt-10 flex min-h-screen snap-start flex-col bg-primary shadow-2xl transition-[border-radius] duration-300 ease-in-out {isDrawerAtTop
          ? 'rounded-t-none'
          : 'rounded-t-[2.5rem]'}"
	>
		<article
			class="flex flex-1 flex-col bg-base-100 pb-32 transition-[border-radius] duration-300 ease-in-out {isDrawerAtTop
             ? 'rounded-t-none'
             : 'rounded-t-[2.5rem]'}"
		>
			{@render header(isDrawerAtTop)}

			<div class="px-8 h-full">
				{@render children()}
			</div>
		</article>
	</section>
</main>
