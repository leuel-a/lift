import { z } from 'zod'

export const registerUserSchema = z.object({
  body: z.object({
    firstName: z.string({ message: 'First name is required' }),
    lastName: z.string({ message: 'Last name is required' }),
    phoneNumber: z.string({ message: 'Phone number is required' }),
    email: z.string({ message: 'Email is required' }).email({ message: 'Email is not valid' }),
    password: z
      .string({ message: 'Password is required' })
      .min(1, { message: 'Password must be a minimum of 6 characters' }),
    role: z.enum(['admin', 'employee'])
  }),
})

export const updateUserSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    gender: z.string().optional(),
    phoneNumber: z.string().optional()
  }).strict({ message: 'Only firstName, lastName, gender, and phoneNumber can be updated here.' }),
  params: z.object({
    id: z.string({ message: 'user id is required' })
  })
})

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string({ message: 'Email is required' }).email({ message: 'Email is not valid' }),
    password: z.string({ message: 'Password is required' })
  })
})

export type LoginUserType = z.infer<typeof loginUserSchema>
export type UpdateUserType = z.infer<typeof updateUserSchema>
export type RegisterUserType = z.infer<typeof registerUserSchema>
