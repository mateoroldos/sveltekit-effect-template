import { runLoader } from '$lib/server/run-loader';
import { Effect } from 'effect';
import { OkLoader } from '$lib/server/responses';
import { superValidateLoader } from '$lib/server/super-validate.server.js';
import { zod } from 'sveltekit-superforms/adapters';
import { loginActionSchema } from './_actions/login-action/login-action-schema.js';
import { runAction } from '$lib/server/run-action.js';
import { loginAction } from './_actions/login-action/login-action.js';

export const load = runLoader(
	Effect.gen(function* () {
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
