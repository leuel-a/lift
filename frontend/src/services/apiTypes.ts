import { Member } from "@/types"

export interface ValidationError {
  path: string
  message: string
}

export type MembersResponse = Member[]
