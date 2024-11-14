import { z } from 'zod'
import { parseISO, isValid } from 'date-fns'

const payload = {
  firstName: z.string({ message: 'first name is required' }),
  lastName: z.string({ message: 'last name is required' }),
  email: z
    .string({ message: 'email is required' })
    .email({ message: 'please provide a valid email address' }),
  phoneNumber: z.string({ message: 'phone number is required' }),
  membershipType: z.union([z.literal('monthly'), z.literal('quarterly'), z.literal('yearly')], {
    errorMap: (issue, _ctx) => {
      if (issue.code === 'invalid_type') {
        return { message: 'membership type is required' }
      }
      return { message: 'invalid input, valid inputs are: monthly, quarterly, yearly' }
    },
  }),
  membershipStartDate: z
    .string({ message: 'Membership start date is required' })
    .refine((value) => {
      const date = parseISO(value)
      return isValid(date)
    }),
}

const params = {
  id: z.string({ message: 'member id is required' }),
}

export const createMemberSchema = z.object({
  body: z.object({ ...payload }),
})

export const getMemberSchema = z.object({
  params: z.object({ ...params }),
})

export type GetMemberType = z.infer<typeof getMemberSchema>
export type CreateMemberType = z.infer<typeof createMemberSchema>
