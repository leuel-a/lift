require('dotenv').config()

import app from '.'
import env from './utils/env'
import { connectDB } from './lib/db'
import logger from './utils/logger'
import { seedLockers } from './utils/seedLockers'
import { countLockers } from './services/lockers.services'

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
