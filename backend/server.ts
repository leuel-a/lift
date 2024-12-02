require('dotenv').config()

import app from './src'
import env from './src/utils/env'
import { connectDB } from './src/lib/db'
import logger from './src/utils/logger'
import { seedLockers } from './src/utils/seedLockers'
import { countLockers } from './src/services/lockers.services'
import { lockersInUseJob } from './src/jobs/lockers.jobs'

const server = app.listen(env.PORT, async () => {
  // connect to db
  await connectDB()

  // only seed the lockers if the lockers collections is empty in production
  const count = await countLockers({})
  if (count == 0) {
    try {
      await seedLockers()
    } catch (error) {
      logger.error(`Error seeding lockers: ${error}`)
      process.exit(1)
    }
  }

  // start jobs
  lockersInUseJob.start()

  logger.info(`Server running on port ${env.PORT}`)
})

// graceful shutdown
const shutdown = () => {
  logger.info('Recieved shutdown signal, closing server...')
  server.close((err) => {
    if (err) {
      logger.error(`Error closing server: ${err}`)
      process.exit(1)
    }

    logger.info(`Server closed`)
    process.exit(0)
  })

  setTimeout(() => {
    logger.error('Forcing shutdown due to timeout')
    process.exit(1)
  }, 10000)
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
