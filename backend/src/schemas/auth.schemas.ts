import { z } from 'zod'

// register user schema
export const registerUserSchema = z.object({
  body: z.object({
    email: z.string({ message: 'Email is required' }).email({ message: 'Email is not valid' }),
    password: z
      .string({ message: 'Password is required' })
      .min(1, { message: 'Password must be a minimum of 6 characters' }),
  }),
})

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string({ message: 'Email is required' }).email({ message: 'Email is not valid' }),
    password: z.string({ message: 'Password is required' }),
  }),
})

export type LoginUserType = z.infer<typeof loginUserSchema>
export type RegisterUserType = z.infer<typeof registerUserSchema>
