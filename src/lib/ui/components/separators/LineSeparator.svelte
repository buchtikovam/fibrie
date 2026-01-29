<script lang="ts">
	interface Props {
		label: string;
	}

	let { label }: Props = $props();
</script>

<div class="my-4 flex items-center gap-4">
	<div class="h-px w-full bg-secondary"></div>
	<p class="text-secondary">{label}</p>
	<div class="h-px w-full bg-secondary"></div>
</div>
