import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'El nombre no puede estar vacío'),
  email: z.string().email('Correo electrónico inválido'),
  password: z.string(),
  phone: z.string(),
  role: z.enum(['admin', 'visitor']),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});