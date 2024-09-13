import { runLoader } from '$lib/server/run-loader';
import { Effect } from 'effect';
import { OkLoader } from '$lib/server/responses';
import { superValidateLoader } from '$lib/server/super-validate.server.js';
import { zod } from 'sveltekit-superforms/adapters';
import { loginActionSchema } from './_actions/login-action/login-action-schema.js';
import { runAction } from '$lib/server/run-action.js';
import { loginAction } from './_actions/login-action/login-action.js';
import type { PageServerLoadEvent } from './$types.js';

export const load = (event: PageServerLoadEvent) =>
	runLoader(
		Effect.gen(function* () {
			Effect.log(event);

			return new OkLoader({
				data: {
					loginActioForm: yield* superValidateLoader(zod(loginActionSchema))
				}
			});
		})
	);

export const actions = {
	login: runAction(loginAction)
};
