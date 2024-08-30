import { z } from 'zod';

export const loginActionSchema = z.object({
	username: z.string().min(2).max(50)
});

export type LoginActionSchema = typeof loginActionSchema;
