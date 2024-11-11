import { z } from 'zod'

export const loginUserSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Please provide a valid email' }),
  password: z.string({ message: 'Password is required' }),
})

export type LoginUserType = z.infer<typeof loginUserSchema>
