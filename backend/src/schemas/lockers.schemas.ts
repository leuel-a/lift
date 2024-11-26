import { z } from 'zod'

const query = {
  section: z.enum(['Male', 'Female']).optional(),
  isTaken: z.string().optional(),
}

const params = {
  id: z.string({ message: 'Locker Id is required' }),
}

export const getManyLockersSchema = z.object({
  query: z.object({
    ...query,
  }),
})

export const assignLockerSchema = z.object({
  params: z.object({
    ...params,
  }),
})

export const freeLockerSchema = z.object({
  params: z.object({
    ...params
  })
})

export type FreeLockerType = z.infer<typeof freeLockerSchema>
export type AssignLockerType = z.infer<typeof assignLockerSchema>
export type GetManyLockersType = z.infer<typeof getManyLockersSchema>
