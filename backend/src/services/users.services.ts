import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import UserModel, { IUser, UserDocument } from '../models/users.model'

/**
 * Creates a new user.
 * @param input - The user data to create.
 * @returns The created user document.
 */
export async function createUser(input: IUser) {
  return UserModel.create(input)
}

/**
 * Finds a user based on the given query.
 * @param query - The filter query to find the user.
 * @param options - Query options.
 * @returns The found user document or null if not found.
 */
export async function findUser(
  query: FilterQuery<UserDocument>,
  options: QueryOptions<UserDocument> = { lean: true },
) {
  return UserModel.findOne(query, undefined, options)
}

/**
 * Finds a user by their ID.
 * @param id - The ID of the user to find.
 * @param options - Query options.
 * @returns The found user document or null if not found.
 */
export async function findUserById(
  id: string,
  options: QueryOptions<UserDocument> = { lean: true },
) {
  return UserModel.findById(id, undefined, options)
}

/**
 * Finds a user by their ID and updates their information.
 * @param id - The ID of the user to update.
 * @param query - The update query containing the new data.
 * @param options - Query options.
 * @returns The updated user document or null if not found.
 */
export async function findUserByIdAndUpdate(id: string, query: UpdateQuery<UserDocument>, options: QueryOptions<UserDocument>) {
  return UserModel.findByIdAndUpdate(id, query, options)
}

/**
 * Finds users based on the query provided
 * @param query - filter query for the users
 * @param options - query options to change the behaviour of the query
 * @returns A list of users that match the given query
 */
export async function findManyUsers(query: FilterQuery<UserDocument>, options: QueryOptions<UserDocument>) {
  return UserModel.find(query, null, options)
}

/**
 * Counts the number of users that match the given query.
 * @param query - The filter query to count the users.
 * @returns The number of users that match the query.
 */
export const countUsers = async (query: FilterQuery<UserDocument>) => {
  return UserModel.countDocuments(query)
}