import { apiClient } from './apiClient'

// types
import type { Locker } from '../types.ts'
import type { QueryFunction, MutationFunction } from '@tanstack/react-query'

// custom request and response types
type FreeLockerRequest = { id: string }
type AssignLockerRequest = { id: string }
type GetManyLockersResponse = Locker[]

/**
 * Fetches lockers based on the provided query parameters.
 *
 * @returns - A promise that resolves to an array of lockers.
 */
export const fetchLockers: QueryFunction<
  GetManyLockersResponse,
  [
    string,
    {
      section?: string
      isTaken?: string
    },
  ]
> = async ({ queryKey }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, { section, isTaken }] = queryKey

  const searchParams = new URLSearchParams({
    ...(section && { section }),
    ...(isTaken && { isTaken }),
  })
  return (await apiClient.get<GetManyLockersResponse>(`/lockers?${searchParams.toString()}`)).data
}

/**
 * Assigns a locker to a user based on the provided locker ID.
 *
 * @returns - The assigned locker.
 */
export const assignLocker: MutationFunction<
  Locker,
  AssignLockerRequest
> = async ({ id }) => {
  return (await apiClient.put(`/lockers/${id}/assign`)).data
}

/**
 * Frees a locker based on the provided locker ID.
 *
 * @returns - The freed locker.
 */
export const freeLocker: MutationFunction<Locker, FreeLockerRequest> = async ({ id }) => {
  return (await apiClient.put(`/lockers/${id}/free`)).data
}