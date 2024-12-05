import { apiClient } from './apiClient'

import { type User } from '@/types'
import { type PaginatedResponse } from './apiTypes'
import { type QueryFunction } from '@tanstack/react-query'

/**
 * Fetches a paginated list of users.
 *
 * @param context - The query current query context
 * @returns The paginated response containing users.
 */
export const fetchUsers: QueryFunction<
  PaginatedResponse<User[]>,
  [
    string,
    {
      page?: number
      limit?: number
      search?: string
    },
  ]
> = async ({ queryKey }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, { page, limit, search }] = queryKey

  const searchParams = new URLSearchParams({
    ...(page && { page: page.toString() }),
    ...(limit && { limit: limit.toString() }),
    ...(search && { search: search.toString() }),
  })

  return (await apiClient.get<PaginatedResponse<User[]>>(`/users?${searchParams.toString()}`)).data
}
