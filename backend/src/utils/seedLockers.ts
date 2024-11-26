import logger from './logger'
import { createLocker, CreateLockerInput } from '../services/lockers.services'

/**
 * Seeds the database with initial locker data.
 */
export async function seedLockers() {
  const lockers: CreateLockerInput[] = []

  // populate male lockers section
  for (let i = 0; i < 50; i++) {
    lockers.push({
      section: 'Male',
    })
  }

  // populate female lockers section
  for (let i = 0; i < 50; i++) {
    lockers.push({
      section: 'Female',
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
