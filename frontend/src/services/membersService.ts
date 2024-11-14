import { apiClient } from './apiClient'
import { MembersResponse } from './apiTypes'

// TODO: check if I need to handle the errors here or where the function is called
export const fetchMembers = async (): Promise<MembersResponse> => {
  return (await apiClient.get<MembersResponse>('/members')).data
}
