<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<div class="relative flex h-full flex-col pt-[env(safe-area-inset-top)]">
	<main
		style="view-transition-name: content;"
		class="relative flex h-full min-h-0 flex-col gap-6 bg-base-100 p-6 pb-0"
	>
		{@render children?.()}
	</main>
</div>
