<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import LoginActionForm from './_actions/login-action/login-action-form.svelte';

	export let data;
</script>

<section class="space-y-6">
	<div class="space-y-1 text-center">
		<h1 class="mb-3 text-3xl font-bold">SvelteKit Effect Template</h1>
		<p>Run Effects in your SvelteKit loaders and form actions.</p>
		<p>Handle errors and redirections in a simple way.</p>
	</div>
	<Card.Root>
		<Card.CardHeader>
			<Card.Title>Fake Login</Card.Title>
		</Card.CardHeader>
		<Card.Content>
			<LoginActionForm data={data.loginActioForm} />
		</Card.Content>
	</Card.Root>
</section>
