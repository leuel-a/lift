import { FilterQuery, QueryOptions } from 'mongoose'
import UserModel, { IUser, UserDocument } from '../models/users.model'

export async function createUser(input: IUser) {
  return UserModel.create(input)
}

export async function findUser(
  query: FilterQuery<UserDocument>,
  options: QueryOptions<UserDocument> = { lean: true },
) {
  return UserModel.findOne(query, undefined, options)
}

export async function findUserById(
  id: string,
  options: QueryOptions<UserDocument> = { lean: true },
) {
  return UserModel.findById(id, undefined, options)
}
