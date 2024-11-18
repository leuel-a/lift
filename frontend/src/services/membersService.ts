import { apiClient } from './apiClient'
import { QueryFunction, MutationFunction } from '@tanstack/react-query'

// types
import type { CreateMemberType } from '../validation/memberSchema'
import type { MembersResponse, PaginatedResponse } from './apiTypes'
import { Member } from '@/types'

/**
 * Fetches a paginated list of members from the API.

 * @returns A promise that resolves to a paginated response containing members data.
 * @throws Will throw an error if the API request fails.
 */
export const fetchMembers: QueryFunction<
  PaginatedResponse<MembersResponse>,
  [string, { page: number; limit?: number }]
> = async ({ queryKey }): Promise<PaginatedResponse<MembersResponse>> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, { page, limit }] = queryKey

  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: limit ? limit.toString() : '10',
  })

  return (
    await apiClient.get<PaginatedResponse<MembersResponse>>(
      `/members?${searchParams.toString()}`,
    )
  ).data
}

/**
 * Adds a new member to the system.
 *
 * @param input - The member data to be added. It includes all member details and the membership start date.
 * @returns The newly created member data.
 *
 * @template CreateMemberType - The type of the input data for creating a member.
 * @template Member - The type of the member data returned by the API.
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
