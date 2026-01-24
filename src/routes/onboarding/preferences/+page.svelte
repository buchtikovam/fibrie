<script lang="ts">
	// State management using Runes
	import SelectionCard from '$ui/cards/SelectionCard.svelte';

	let selectedPressure = $state('high');
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-base-100 p-4">
	<div class="w-full max-w-md space-y-3">
		<h2 class="mb-4 text-xl font-bold">Select Pressure Level</h2>

		<SelectionCard icon="" label="High performance pressure" value="high" bind:group={selectedPressure} />

		<SelectionCard icon="" label="Low performance pressure" value="low" bind:group={selectedPressure} />
	</div>

	<pre class="mt-8 rounded-lg bg-neutral p-4 text-neutral-content">
Selected: {selectedPressure}
	</pre>
</div>
