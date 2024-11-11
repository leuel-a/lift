import { apiClient } from '@/services/apiClient'
import { LoginUserType } from '@/validation/authSchema'
import { AxiosResponse } from 'axios'

export const loginUser = (
  credentials: LoginUserType,
): Promise<AxiosResponse<LoginResponseSuccess>> => {
  return apiClient.post<LoginResponseSuccess>('/auth/login', credentials)
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
