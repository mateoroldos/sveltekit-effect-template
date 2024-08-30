import { error, type RequestEvent } from '@sveltejs/kit';
import { Context, Effect, pipe, Exit } from 'effect';
import { fail, setError } from 'sveltekit-superforms';
import {
	matchActionResponse,
	matchActionResponseError,
	type ActionResponse,
	type ActionResponseError
} from './responses';
import { redirect } from 'sveltekit-flash-message/server';
import { setFlashError, setFlashSuccess } from '$lib/utils/set-flash.server';

export const ActionArgs = Context.GenericTag<RequestEvent>('ActionArgs');

type ActionEffect = Effect.Effect<ActionResponse, ActionResponseError, RequestEvent>;

export const runAction = (self: ActionEffect) => (event: RequestEvent) => {
	const runnable = pipe(
		self,
		Effect.tap(() => Effect.log('🚀 Running action')),
		Effect.provideService(ActionArgs, event)
	);

	return Effect.runPromiseExit(runnable).then(
		Exit.match({
			onFailure: (cause) => {
				console.error('🚨 Error in action', cause);
				if (cause._tag === 'Fail') {
					return pipe(
						cause.error,
						matchActionResponseError()({
							Redirect: ({ to, code, message }) => {
								if (message) {
									return redirect(
										code,
										to,
										{
											type: 'error',
											message
										},
										event.cookies
									);
								} else {
									return redirect(code, to);
								}
							},
							BadRequest: ({ message }) => {
								setFlashError(message ?? 'Bad Request', event.cookies);
								return fail(400);
							},
							ServerError: ({ message }) => {
								setFlashError(message ?? 'An error occurred. Please try again.', event.cookies);
								return fail(500);
							},
							Forbidden: ({ message }) => {
								setFlashError(message ?? 'Missing permissions.', event.cookies);
								return fail(401);
							},
							FormValidationError: ({ form }) => {
								return fail(400, form);
							},
							CustomInputError: ({ form, field, message }) => {
								return setError(form, field, message);
							}
						})
					);
				}

				return error(500);
			},
			onSuccess: matchActionResponse()({
				OkAction: ({ form, message }) => {
					if (message) {
						setFlashSuccess(message, event.cookies);
					}
					return { form };
				},
				Redirect: ({ to, code, message }) => {
					if (message) {
						return redirect(
							code,
							to,
							{
								type: 'success',
								message
							},
							event.cookies
						);
					} else {
						return redirect(code, to);
					}
				}
			})
		})
	);
};
