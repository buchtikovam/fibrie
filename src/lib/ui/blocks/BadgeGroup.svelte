<script lang="ts">
	import SubHeading from '$ui/components/typography/SubHeading.svelte';

	type Mode = 'single' | 'multi';

	interface Props {
		title: string;
		options: { field: string; label: string }[];
		mode?: Mode;
		value: string | string[] | null;
	}

	let { title, options, mode = 'multi', value = $bindable() }: Props = $props();

	function toggleSelection(field: string) {
		if (mode === 'single') {
			value = field;
		} else {
			const currentList = Array.isArray(value) ? value : [];

			if (currentList.includes(field)) {
				value = currentList.filter((item) => item !== field);
			} else {
				value = [...currentList, field];
			}
		}
	}

	function checkActive(field: string, currentVal: string | string[] | null): boolean {
		if (currentVal === null) return false;

		if (mode === 'single') {
			return currentVal === field;
		}
		return Array.isArray(currentVal) && currentVal.includes(field);
	}
</script>

<div class="flex flex-col gap-4">
	<SubHeading>{title}</SubHeading>

	<div class="flex flex-wrap gap-2">
		{#each options as option (option.field)}
			{@const isSelected = checkActive(option.field, value)}
			<button
				type="button"
				class="badge cursor-pointer py-4 badge-lg transition-all duration-200 select-none
                {isSelected ? 'badge-secondary' : 'badge-outline badge-neutral hover:badge-neutral'}"
				onclick={() => toggleSelection(option.field)}
				aria-pressed={isSelected}
			>
				{option.label}
			</button>
		{/each}
	</div>
</div>
