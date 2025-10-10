<script lang="ts">
	import { page } from '$app/state';

	import { Frown } from '$icons';

	import { Button } from '$ui/button';
	import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '$ui/empty';
</script>

<div class="h-full flex items-center">
	<Empty>
		<EmptyHeader>
			<EmptyMedia variant="icon" class="bg-primary">
				<Frown class="text-background" strokeWidth="2.5" />
			</EmptyMedia>
			<EmptyTitle>{page.status} - {page.error?.message}</EmptyTitle>
			<EmptyDescription>Something unexpected happened! We are sorry about that.</EmptyDescription>
		</EmptyHeader>
		<EmptyContent>
			<Button variant="outline" size="sm">Navigate back</Button>

			<EmptyDescription>
				Need help? <a href="/app">Contact support</a>
			</EmptyDescription>
		</EmptyContent>
	</Empty>
</div>
