import { z } from 'zod'

export const registerUserSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Email is not valid' }),
    password: z.string().min(1, { message: 'Password must be a minimum of 6 characters' }),
  }),
})

export type RegisterUserType = z.infer<typeof registerUserSchema>
