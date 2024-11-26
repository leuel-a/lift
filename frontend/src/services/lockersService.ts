import { apiClient } from './apiClient.ts'
import { QueryFunction } from '@tanstack/react-query'

// types
import type { Locker } from '../types.ts'

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
  console.log(`/lockers?${searchParams.toString()}`)

  return (await apiClient.get<GetManyLockersResponse>(`/lockers?${searchParams.toString()}`)).data
}
