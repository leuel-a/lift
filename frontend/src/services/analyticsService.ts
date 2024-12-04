import { apiClient } from './apiClient'
import type { QueryFunction } from '@tanstack/react-query'

export type GetMembersByMonthResponse = { count: number; month: number }

/**
 * Fetches the number of members by month.
 *
 * @returns A promise that resolves to the response data containing the count and month.
 */
export const getMembersByMonth: QueryFunction<GetMembersByMonthResponse[], [string, { year: number }]> = async () => {
  return (await apiClient.get<GetMembersByMonthResponse[]>(`/analytics/members/2024`)).data
}
