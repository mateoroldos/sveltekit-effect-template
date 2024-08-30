<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { loginActionSchema, type LoginActionSchema } from './login-action-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { LoaderCircle } from 'lucide-svelte';

	export let data: SuperValidated<Infer<LoginActionSchema>>;

	const form = superForm(data, {
		validators: zodClient(loginActionSchema)
	});

	const { form: formData, enhance, submitting } = form;
</script>

<form method="POST" use:enhance action="?/login">
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input {...attrs} bind:value={$formData.username} />
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button disabled={$submitting} class="mt-2 w-full">
		{#if $submitting}
			<LoaderCircle class="w-4 animate-spin" />
		{:else}
			Submit
		{/if}
	</Form.Button>
</form>
