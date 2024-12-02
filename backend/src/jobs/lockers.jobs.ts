import cron from 'node-cron'
import logger from '../utils/logger'
import { type ILockerUsage } from '../models/lockerUsage.model'
import { checkLockersInUse } from '../services/analytics.services'
import { createLockerUsage } from '../services/lockerUsage.services'

export const lockersInUseJob = cron.schedule('1 * * * *', async () => {
  try {
    const usage: ILockerUsage = {
      maleTakenCount: 0,
      femaleTakenCount: 0
    }
    const result = await checkLockersInUse()

    result.map(({ isTaken, count, section }) => {
      if (section === 'Male' && isTaken) {
        usage.maleTakenCount += count
      }
      if (section === 'Female' && isTaken) {
        usage.femaleTakenCount += count
      }
    })

    // add the currently create usage of the lockers to the database
    await createLockerUsage(usage)

    logger.info(`Collected info of the lockers at ${new Date(Date.now()).toLocaleDateString()}`)
  } catch (error) {
    logger.error(`Unable to collect info of the lockers at ${new Date(Date.now()).toLocaleDateString()}`)
  }
}, {
  scheduled: false
})