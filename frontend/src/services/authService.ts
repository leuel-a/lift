import { apiClient } from '@/services/apiClient'

// types
import type { User } from '@/types'
import type { AxiosResponse } from 'axios'
import type { QueryFunction } from '@tanstack/react-query'
import type { LoginUserType } from '@/validation/authSchema'

export const loginUser = (credentials: LoginUserType): Promise<AxiosResponse<LoginResponseSuccess>> => {
  return apiClient.post<LoginResponseSuccess>('/auth/login', credentials)
}

/**
 * Fetches the authenticated user's data.
 * @returns A promise that resolves to the authenticated user's data.
 */
export const getAuthenticatedUser: QueryFunction<User, [string]> = async () => {
  return (await apiClient.get('/auth/me')).data
}
export interface LoginResponseSuccess {
  accessToken: string
  refreshToken: string
}

export interface LoginResponseError {
  error: {
    message: string
  }
}
