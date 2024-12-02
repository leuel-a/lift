import LockerUsageModel, { ILockerUsage } from '../models/lockerUsage.model'

/**
 * Creates a new locker usage entry in the database.
 *
 * @param input - The locker usage data to be created.
 * @returns The created locker usage entry.
 */
export const createLockerUsage = async (input: ILockerUsage): Promise<ILockerUsage> => {
  return await LockerUsageModel.create(input)
}