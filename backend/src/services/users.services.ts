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