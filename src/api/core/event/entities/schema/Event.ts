import { z } from 'zod';

export const EventSchema = z.object({
	id: z.string().optional(), // UUID
	title: z.string().min(1, 'El título no puede estar vacío'),
	description: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	location: z.string(),
	latitude: z.string(),
	longitude: z.string(),
	userId: z.string(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional()
});
