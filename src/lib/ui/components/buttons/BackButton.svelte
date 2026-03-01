<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	import { ArrowLeft } from '$icons';

	interface Props {
		classes?: string;
	}

	let { classes }: Props = $props();

	function handleBack() {
		const historyState = window.history.state as Record<string, any> | null;
		const appHistoryIndex = historyState?.['svelte-kit-index'] ?? 0;

		if (appHistoryIndex > 0 || window.history.length > 1) {
			history.back();
		} else {
			goto(resolve('/app'), { replaceState: true });
		}
	}
</script>

<button class="btn btn-circle {classes}" onclick={handleBack} aria-label="Go back">
	<ArrowLeft class="size-5" />
</button>
