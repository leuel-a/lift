import { z } from 'zod'

export const getMembersByMonthSchema = z.object({
  params: z.object({
    year: z.string({ message: 'year is required, please provide a year' })
  })
})

export type GetMembersByMonthType = z.infer<typeof getMembersByMonthSchema>