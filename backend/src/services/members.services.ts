import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import MemberModel, { IMember, MemberDocument } from '../models/members.model'

/**
 * Creates a new member with the appropriate values
 * @param input - input values of the member
 * @returns - the newly created member
 */
export const createMember = async (input: IMember) => {
  return MemberModel.create(input)
}

/**
 * Find a member by their id
 * @param id - the id of the member to be looked up from the databse
 * @returns - the user from the database
 */
export const findMemberById = async (id: string) => {
  return MemberModel.findById(id)
}

/**
 * Finds many members based on specific query
 * @param query - query filters for the members to be retrieved from db
 * @param options - query options for the members to be retrieved from db
 * @returns - a list of members
 */
export const findManyMembers = async (
  query: FilterQuery<MemberDocument>,
  options: QueryOptions<MemberDocument> = { lean: true },
) => {
  return MemberModel.find(query, null, options)
}

/**
 * Finds a member by id and update the member
 * @param id - id of the member
 * @param query - update query similar to mongoose.UpdateQuery
 * @param options - query options for the members to be retrieved from db
 * @returns - the updated member
 */
export const findMemberByIdAndUpdate = (
  id: string,
  query: UpdateQuery<MemberDocument>,
  options: QueryOptions<MemberDocument> = { lean: true },
) => {
  return MemberModel.findByIdAndUpdate(id, query, options)
}

/**
 * Counts the members based on the specified conditions
 * @param query - query filter for the members
 * @returns - the number of members
 */
export const countMembers = async (query: FilterQuery<MemberDocument>) => {
  return MemberModel.countDocuments(query)
}
