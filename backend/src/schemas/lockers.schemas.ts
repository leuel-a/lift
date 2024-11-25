import { z } from 'zod'

export const getManyLockersSchema = z.object({
  query: z.object({
    section: z.string().optional(),
    isTaken: z.coerce.boolean().optional()
  })
})

export type GetManyLockersType = z.infer<typeof getManyLockersSchema>
