import { z } from 'zod';

export const CreateUserDTO = z.object({
	title: z.string().min(1, 'El título es requerido'),
	description: z.string().optional(),
	startDate: z.string(),
	endDate: z.string(),
	location: z.string().optional(),
	latitude: z.number().optional(),
	longitude: z.number().optional(),
	userId: z.string()
});
