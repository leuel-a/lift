import logger from './logger'
import { createLocker, CreateLockerInput } from '../services/lockers.services'

/**
 * Seeds the database with initial locker data.
 */
export async function seedLockers() {
  const lockers: CreateLockerInput[] = []

  // populate male lockers section
  for (let i = 0; i < 50; i++) {
    const currLockerNumber = i + 1
    lockers.push({
      section: 'Male',
      lockerNumber: `M${currLockerNumber.toString().padStart(3, '0')}`
    })
  }

  // populate female lockers section
  for (let i = 0; i < 50; i++) {
    const currLockerNumber = i + 1
    lockers.push({
      section: 'Female',
      lockerNumber: `F${currLockerNumber.toString().padStart(3, '0')}`
    })
  }

  try {
    await createLocker(lockers)
    logger.info('Success: Lockers seeded successfully')
  } catch (error) {
    logger.error(`Error seeding lockers: ${error}`)
    process.exit(1)
  }
}
