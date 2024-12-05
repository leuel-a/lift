import { z } from 'zod'

export const loginUserSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Please provide a valid email' }),
  password: z.string({ message: 'Password is required' }),
})

export const registerUserSchema = z.object({
  firstName: z.string({ message: 'First name is required' }),
  lastName: z.string({ message: 'Last name is required' }),
  email: z.string({ message: 'Email is required' }).email({ message: 'Please provide a valid email address' }),
  password: z
    .string({ message: 'Password is required' })
    .min(8, { message: 'Password must be a minimum of 8 characters' }),
  phoneNumber: z.string({ message: 'Phone number is required' }),
  role: z.enum(['admin', 'employee'], { message: 'Role is required' }),
})

export type LoginUserType = z.infer<typeof loginUserSchema>
export type RegisterUserType = z.infer<typeof registerUserSchema>
