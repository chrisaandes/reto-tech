import { z } from 'zod';

export const AttendeeSchema = z.object({
  id: z.string().uuid().optional(),
  eventId: z.string().uuid(),
  userId: z.string().uuid(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});