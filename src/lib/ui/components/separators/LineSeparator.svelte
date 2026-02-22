<script lang="ts">
	interface Props {
		label: string;
	}

	let { label }: Props = $props();
</script>

<div class="my-4 flex items-center gap-4">
	<div class="h-0.5 w-full bg-secondary"></div>
	<p class="font-bold text-secondary">{label}</p>
	<div class="h-0.5 w-full bg-secondary"></div>
</div>
