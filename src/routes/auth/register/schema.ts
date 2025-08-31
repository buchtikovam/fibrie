import { z } from 'zod/v4';

export const schema = z
	.object({
		email: z.email().min(1),
		password: z.string().trim().min(8, 'must be at least 8 characters').trim(),
		passwordConfirm: z.string().trim().min(8, 'must be at least 8 characters').trim(),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords do not match',
		path: ['passwordConfirm'],
	});
