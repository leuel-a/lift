import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Please provide a valid email address' }),
  password: z.string({ message: 'Password is required' }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
