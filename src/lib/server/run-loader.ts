import { error, redirect } from '@sveltejs/kit';
import { Effect, Exit, pipe } from 'effect';
import {
	matchLoaderResponse,
	matchLoaderResponseError,
	type LoaderResponse,
	type LoaderResponseError
} from './responses';

export const runLoader = <T>(self: Effect.Effect<LoaderResponse<T>, LoaderResponseError>) => {
	const runnable = pipe(
		self,
		Effect.tap(() => Effect.log('🚀 Running loader'))
	);

	return Effect.runPromiseExit(runnable).then(
		Exit.match({
			onFailure: (cause) => {
				console.error('🚨 Error in loader', cause);
				if (cause._tag === 'Fail') {
					return pipe(
						cause.error,
						matchLoaderResponseError()({
							Redirect: ({ to }) => {
								return redirect(307, to);
							},
							BadRequest: () => {
								return error(400);
							},
							ServerError: () => {
								return error(500);
							},
							Forbidden: () => {
								return error(401);
							}
						})
					);
				}

				return error(500);
			},
			onSuccess: matchLoaderResponse<T>()({
				OkLoader: ({ data }) => {
					return { ...data };
				},
				Redirect: ({ to, code }) => {
					return redirect(code, to);
				}
			})
		})
	);
};
