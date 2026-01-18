<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="card w-full bg-base-100 card-xs btn btn-ghost">
	<button class="card-body flex flex-row items-center gap-4 ">
		{@render children?.()}
	</button>
</div>
