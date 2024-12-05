import { apiClient } from '@/services/apiClient'

// types
import type { User } from '@/types'
import type { AxiosResponse } from 'axios'
import type { MutationFunction, QueryFunction } from '@tanstack/react-query'
import { LoginUserType, RegisterUserType } from '@/validation/authSchema'

export interface LoginResponseSuccess {
  accessToken: string
  refreshToken: string
}

export interface LoginResponseError {
  error: {
    message: string
  }
}

export const loginUser = (credentials: LoginUserType): Promise<AxiosResponse<LoginResponseSuccess>> => {
  return apiClient.post<LoginResponseSuccess>('/auth/login', credentials)
}

/**
 * Fetches the authenticated user's data.
 * @returns A promise that resolves to the authenticated user's data.
 */
export const getAuthenticatedUser: QueryFunction<User, [string]> = async () => {
  return (await apiClient.get<User>('/auth/me')).data
}

/**
 * Registers a new user.
 * @param input - The registration data for the new user.
 * @returns A promise that resolves to the registered user's data.
 */
export const registerUser: MutationFunction<User, RegisterUserType> = async input => {
  return (
    await apiClient.post('/auth/register', {
      ...input,
    })
  ).data
}
