<script lang="ts">
	interface Props {
		label: string;
	}

	let { label }: Props = $props();
</script>

<div class="flex gap-4 items-center my-4">
	<div class="h-px bg-secondary w-full"></div>
	<p class="text-secondary">{label}</p>
	<div class="h-px bg-secondary w-full"></div>
</div>
