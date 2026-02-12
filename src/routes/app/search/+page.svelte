<script lang="ts">
	import BackButton from '$ui/components/buttons/BackButton.svelte';
	import SearchInput from '$ui/components/input/SearchInput.svelte';

	let searchValue = $state<string>('');
</script>

<div class="flex items-center gap-4">
	<BackButton />

	<SearchInput bind:value={searchValue} />
</div>
