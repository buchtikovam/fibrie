<script lang="ts">
	import { Search, X } from '$icons';

	let {
		value = $bindable(''),
		placeholder = 'Search...',
		onSearch,
	}: {
		value: string;
		placeholder?: string;
		onSearch?: (term: string) => void;
	} = $props();

	let inputRef: HTMLInputElement | undefined = $state();

	$effect(() => {
		if (inputRef) inputRef.focus();
	});

	function clearSearch() {
		value = '';
	}
</script>

<label class="input-bordered input flex items-center gap-2">
	<Search class="size-4 opacity-50" />

	<input
		type="search"
		bind:this={inputRef}
		class="flex-1 grow pl-2 [&::-webkit-search-cancel-button]:hidden"
		{placeholder}
		bind:value
		onkeydown={(e) => e.key === 'Enter' && onSearch?.(value)}
	/>

	{#if value.length > 0}
		<button
			type="button"
			class="btn btn-circle text-primary btn-ghost btn-xs hover:bg-primary/10"
			onclick={clearSearch}
			aria-label="Clear search"
		>
			<X class="size-4 min-w-4" />
		</button>
	{/if}
</label>
