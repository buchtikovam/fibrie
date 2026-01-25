<script lang="ts">
	interface Props {
		label: string;
		description?: string;
		icon?: string; // Changed to string for emojis, strictly typed
		name: string; // Essential for grouping radios
		value: string;
		// Group can be a single string (radio) or an array (checkbox)
		group: string | string[];
		type?: 'radio' | 'checkbox';
	}

	let { label, description, icon, name, value, group = $bindable(), type = 'radio' }: Props = $props();

	// 1. Explicitly derive checked state based on type
	let isChecked = $derived.by(() => {
		if (type === 'checkbox' && Array.isArray(group)) {
			return group.includes(value);
		}
		return group === value;
	});

	// 2. The Logic: Manual State Mutation
	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const isSelected = target.checked;

		if (type === 'radio') {
			// Simple replacement
			group = value;
		} else {
			// Checkbox: Array operations (Immutable pattern)
			// We cast group as string[] because we know it must be an array for checkboxes
			const currentArray = Array.isArray(group) ? group : [];

			if (isSelected) {
				// Add to array
				group = [...currentArray, value];
			} else {
				// Remove from array
				group = currentArray.filter((item) => item !== value);
			}
		}
	}
</script>

<label
	class="flex cursor-pointer items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-4 transition-all active:scale-[0.98]
    {isChecked ? 'border-primary bg-primary/5' : ''}"
>
	<div class="flex items-center gap-4">
		{#if icon}
			<div class="flex h-12 w-12 min-w-12 items-center justify-center rounded-2xl bg-base-100 text-2xl">
				{icon}
			</div>
		{/if}

		<div class="flex flex-col pr-4">
			<span class="font-bold text-base-content/90">{label}</span>
			{#if description}
				<span class="text-sm text-base-content/60">{description}</span>
			{/if}
		</div>
	</div>

	{#if type === 'checkbox'}
		<input
			type="checkbox"
			{name}
			{value}
			checked={isChecked}
			onchange={handleChange}
			class="checkbox checkbox-primary rounded-lg h-6 w-6 border-2"
		/>
	{:else}
		<input
			type="radio"
			{name}
			{value}
			checked={isChecked}
			onchange={handleChange}
			class="radio radio-primary h-6 w-6 border-2"
		/>
	{/if}
</label>
