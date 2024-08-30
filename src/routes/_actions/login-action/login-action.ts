import { superValidateActionForm } from '$lib/server/super-validate.server';
import { Effect } from 'effect';
import { loginActionSchema } from './login-action-schema';
import { CustomInputError, Redirect, ServerError } from '$lib/server/responses';

export const loginAction = Effect.gen(function* () {
	const form = yield* superValidateActionForm(loginActionSchema);

	yield* Effect.tryPromise(() => new Promise((resolve) => setTimeout(resolve, 1000)));

	const randomNumber = Math.floor(Math.random() * 3);

	switch (randomNumber) {
		case 0:
			yield* Effect.fail(
				new ServerError({
					errors: ["Don't worry, this is error was on purpouse"],
					message: 'This is a simulated error, try again.'
				})
			);
			break;
		case 1:
			yield* Effect.fail(
				new CustomInputError({
					form,
					field: 'username',
					message: 'This is a custom error message'
				})
			);
	}

	const { username } = form.data;

	return new Redirect({ to: '/welcome', message: `Welcome ${username}` });
});
