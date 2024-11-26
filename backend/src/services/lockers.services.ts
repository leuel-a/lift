import { QueryOptions, FilterQuery, RootFilterQuery } from 'mongoose'
import LockerModel, { LockerDocument } from '../models/lockers.model'

export type CreateLockerInput = Pick<LockerDocument, 'section' | 'isTaken' | 'lockerNumber'>

/**
 * Creates a new locker with the provided input data.
 *
 * @param input - The data to create a new locker.
 * @returns A promise that resolves to the created locker.
 */
export const createLocker = async (input: CreateLockerInput | CreateLockerInput[]) => {
  return LockerModel.create(input)
}

/**
 * Finds a locker by its ID.
 *
 * @param id - The ID of the locker to find.
 * @param options - Optional query options.
 * @returns A promise that resolves to the locker document if found, or null if not found.
 */
export const findLockerById = async (
  id: string,
  options: QueryOptions<LockerDocument> = { lean: true },
) => {
  return LockerModel.findById(id, null, options)
}

/**
 * Finds multiple lockers based on the provided query and options.
 *
 * @param query - The query to filter lockers.
 * @param options - The options for the query.
 * @returns A promise that resolves to an array of locker documents.
 */
export const findManyLockers = async (
  query: FilterQuery<LockerDocument>,
  options: QueryOptions<LockerDocument> = { lean: true },
) => {
  return LockerModel.find(query, null, options)
}

/**
 * Assigns a locker by updating its status to taken.
 *
 * @param id - The unique identifier of the locker to be assigned.
 * @returns A promise that resolves to the updated locker document.
 */
export const assignLocker = async (id: string) => {
  return LockerModel.findByIdAndUpdate(id, { isTaken: true }, { new: true })
}

/**
 * Frees a locker by updating its status to not taken.
 *
 * @param id - The unique identifier of the locker to be freed.
 * @returns A promise that resolves to the updated locker document, or null if no locker was found with the given id.
 */
export const freeLocker = async (id: string) => {
  return LockerModel.findByIdAndUpdate(id, { isTaken: false }, { new: true })
}

/**
 * Counts the number of lockers that match the specified query.
 *
 * @param query - The filter criteria to apply when counting lockers.
 * @returns The total number of lockers that match the query.
 */
export const countLockers = async (query: RootFilterQuery<LockerDocument>) => {
  return LockerModel.countDocuments(query)
}
