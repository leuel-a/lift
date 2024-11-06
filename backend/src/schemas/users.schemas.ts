import { z } from 'zod'

export const registerUserSchema = z.object({
  body: z.object({
    email: z.string({ message: 'Email is required' }).email({ message: 'Email is not valid' }),
    password: z
      .string({ message: 'Password is required' })
      .min(1, { message: 'Password must be a minimum of 6 characters' }),
  }),
})

export const updateUserSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    gender: z.string().optional(),
    phoneNumber: z.string().optional()
  })
})

export type UpdateUserType = z.infer<typeof updateUserSchema>
export type RegisterUserType = z.infer<typeof registerUserSchema>
