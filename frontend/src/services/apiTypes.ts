import { Member } from "@/types"

export interface ValidationError {
  path: string
  message: string
}

export interface PaginatedResponse<TData> {
  data: TData,
  page: number
  limit: number
  totalCount: number
}

export type MembersResponse = Member[]
