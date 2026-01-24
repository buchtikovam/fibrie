<script lang="ts">
	import { type Component } from 'svelte';

	interface Props {
		label: string;
		icon: Component;
		name?: string;
		value: string;
		group: string;
	}

	let {
		label,
		icon,
		name = "selection-group",
		value,
		group = $bindable()
	}: Props = $props();

	let isChecked = $derived(group === value);
</script>

<label
	class="flex cursor-pointer items-center justify-between rounded-[24px] border  bg-white p-3 transition-all active:scale-[0.98] border-primary has-[:checked]:bg-primary-content"
>
	<span class="flex items-center gap-4">
		<span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-base-200/60 text-2xl">
			{icon}
		</span>

		<span class="font-medium text-base-content/90">
			{label}
		</span>
	</span>

	<input
		type="radio"
		{name}
		{value}
		bind:group
		class="radio radio-primary h-6 w-6 border-2"
	/>
</label>
