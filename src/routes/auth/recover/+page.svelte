<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as m from '$lib/paraglide/messages';
	import { Input } from '$lib/components/ui/input/index.js';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';

	import { schema } from './schema';

	const form = superForm(defaults(zod4(schema)), {
		validators: zod4(schema),
		SPA: true,
		onUpdate: ({ form: f }) => {
			if (f.valid) {
				// auth.create(f.data.email, f.data.password);
				console.log(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				console.log('Please fix the errors in the form.');
			}
		},
	});

	const { form: formData, enhance } = form;
</script>

<div class="w-full md:max-w-120">
	<Card.Root class="shadow-none ">
		<Card.Header class="text-center">
			<Card.Title class="text-xl">{m.auth_recover_title()}</Card.Title>
			<Card.Description>{m.auth_recover_description()}</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance>
				<div class="grid gap-6">
					<div class="grid gap-6">
						<div class="grid gap-3">
							<Form.Field {form} name="email">
								<Form.Control>
									{#snippet children({ props })}
										<Form.Label>{m.auth_register_email()}</Form.Label>
										<Input {...props} bind:value={$formData.email} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>

						<Form.Button>{m.auth_recover_submit()}</Form.Button>
					</div>
					<div class="text-center text-sm">
						{m.auth_recover_remember_password()}
						<a href="/auth/login" class="underline underline-offset-4">{m.auth_recover_login()}</a>
					</div>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>
