import { apiClient } from './apiClient'
import { QueryFunction, MutationFunction } from '@tanstack/react-query'

// types
import type { Member } from '@/types'
import type { CreateMemberType } from '../validation/memberSchema'
import type { MembersResponse, PaginatedResponse } from './apiTypes'

export type SearchMembersResponse = PaginatedResponse<MembersResponse>
export type SearchPageParam = { page: number; search: string; limit?: number }

/**
 * Fetches a paginated list of members from the API.
 *
 * @returns - A promise that resolves to a paginated response containing members data.
 */
export const fetchMembers: QueryFunction<
  PaginatedResponse<MembersResponse>,
  [string, { page: number; limit?: number; search?: string }]
> = async ({ queryKey }): Promise<PaginatedResponse<MembersResponse>> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, { page, limit, search }] = queryKey

  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: limit ? limit.toString() : '10',
    search: search || '',
  })

  return (await apiClient.get<PaginatedResponse<MembersResponse>>(`/members?${searchParams.toString()}`)).data
}

/**
 * Searches for members based on the provided criteria.
 *
 * @returns - A promise that resolves to a paginated response containing members data.
 */
export const searchMembers: QueryFunction<SearchMembersResponse, [string, { search: string }], SearchPageParam> = async (
  {
    pageParam
  }) => {
  const { page, search, limit } = pageParam

  const searchParams = new URLSearchParams({
    search,
    page: page.toString(),
    ...(limit && { limit: limit.toString() })
  })
  return (await apiClient.get<SearchMembersResponse>(`/members?${searchParams.toString()}`)).data
}

/**
 * Adds a new member to the system.
 *
 * @param input - The member data to be added. It includes all member details and the membership start date.
 * @returns The newly created member data.
 */
export const addMember: MutationFunction<
  Member,
  CreateMemberType
> = async input => {
  const { membershipStartDate, ...data } = input
  return (
    await apiClient.post('/members', {
      ...data,
      membershipStartDate: membershipStartDate.toISOString(),
    })
  ).data
}

