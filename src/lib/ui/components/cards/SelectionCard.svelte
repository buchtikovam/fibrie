<script lang="ts" generics="T">
	interface Props {
		label: string;
		description?: string;
		icon?: string;
		name: string;
		value: string;
		group: T;
		type?: 'radio' | 'checkbox';
	}

	let { label, description, icon, name, value, group = $bindable(), type = 'radio' }: Props = $props();

	let isChecked = $derived.by(() => {
		if (type === 'checkbox' && Array.isArray(group)) {
			return group.includes(value);
		}
		return group === value;
	});

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const isSelected = target.checked;

		if (type === 'radio') {
			group = value as T;
		} else {
			const currentArray = Array.isArray(group) ? group : [];

			if (isSelected) {
				group = [...currentArray, value] as T;
			} else {
				group = currentArray.filter((item) => item !== value) as T;
			}
		}
	}
</script>

<label
	class="flex cursor-pointer items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-4 transition-all active:scale-[0.98]
    {isChecked ? 'border-primary bg-primary/5' : ''}"
>
	<span class="flex items-center gap-4">
		{#if icon}
			<div class="flex h-12 w-12 min-w-12 items-center justify-center rounded-2xl bg-base-100 text-2xl">
				{icon}
			</div>
		{/if}

		<span class="flex flex-col pr-4">
			<span class="font-bold text-base-content/90">{label}</span>
			{#if description}
				<span class="text-sm text-base-content/60">{description}</span>
			{/if}
		</span>
	</span>

	{#if type === 'checkbox'}
		<input
			type="checkbox"
			{name}
			{value}
			checked={isChecked}
			onchange={handleChange}
			class="checkbox h-6 w-6 rounded-lg border-2 checkbox-primary"
		/>
	{:else}
		<input
			type="radio"
			{name}
			{value}
			checked={isChecked}
			onchange={handleChange}
			class="radio h-6 w-6 border-2 radio-primary"
		/>
	{/if}
</label>
