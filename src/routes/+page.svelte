<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import LoginActionForm from './_actions/login-action/login-action-form.svelte';

	export let data;
</script>

<Card.Root>
	<Card.CardHeader>
		<Card.Title>Login</Card.Title>
	</Card.CardHeader>
	<Card.Content>
		<LoginActionForm data={data.loginActioForm} />
	</Card.Content>
</Card.Root>
