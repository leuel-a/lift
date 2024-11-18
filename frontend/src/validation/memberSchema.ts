import { z } from 'zod'

export const createMemberSchema = z.object({
  firstName: z
    .string({ message: 'First name is required' })
    .min(1, { message: 'First name cannot be empty' }),
  lastName: z
    .string({ message: 'Last name is required' })
    .min(1, { message: 'Last name can not be empty' }),
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Email is not valid' }),
  phoneNumber: z
    .string({ message: 'Phone number is required' })
    .min(10, { message: 'Please provide a valid phone number' }),
  membershipStartDate: z.date({ message: 'Membership start date is required' }),
  membershipType: z.enum(['monthly', 'quarterly', 'yearly'], {
    message: 'Membership type is required',
  }),
})

export type CreateMemberType = z.infer<typeof createMemberSchema>
