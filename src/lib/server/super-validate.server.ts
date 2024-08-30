import { Data, Effect } from 'effect';
import { superValidate, type SuperValidated } from 'sveltekit-superforms';
import { zod, type ValidationAdapter } from 'sveltekit-superforms/adapters';
import { FormValidationError, ServerError } from './responses';
import type { ZodObject } from 'zod';
import { ActionArgs } from './run-action';

export class Os extends Data.TaggedClass('Os') {}

export type SuperValidateData<In extends Record<string, unknown>> = In;

export const superValidateLoader = <
	Out extends Record<string, unknown>,
	In extends Record<string, unknown> = Out
>(
	adapter: ValidationAdapter<Out, In>
): Effect.Effect<SuperValidated<Out, In>, ServerError> =>
	Effect.gen(function* () {
		return yield* Effect.tryPromise({
			try: () => superValidate(adapter),
			catch: () =>
				new ServerError({
					errors: ['An error occurred while validating the form']
				})
		});
	});

export const superValidateLoaderWithData = <
	Out extends Record<string, unknown>,
	In extends Record<string, unknown> = Out
>(
	data: SuperValidateData<In>,
	adapter: ValidationAdapter<Out, In>,
	options?: any
): Effect.Effect<SuperValidated<Out, In>, ServerError> =>
	Effect.gen(function* () {
		return yield* Effect.tryPromise({
			try: () => superValidate(data, adapter, options),
			catch: () =>
				new ServerError({
					errors: ['An error occurred while validating the form']
				})
		});
	});

export const superValidateActionForm = <
	Out extends Record<string, unknown>,
	In extends Record<string, unknown> = Out
>(
	schema: ZodObject<In>,
	options?: any
) =>
	Effect.gen(function* () {
		const event = yield* ActionArgs;

		const form = yield* superValidateLoaderWithData(event, zod(schema), options);

		if (!form.valid) {
			yield* Effect.fail(new FormValidationError({ form }));
		}

		return form;
	});
