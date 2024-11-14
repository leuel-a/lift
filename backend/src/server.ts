require('dotenv').config()

import app from '.'
import env from './utils/env'
import { connect } from './lib/db'
import logger from './utils/logger'

// listen on the specified port for the applicaiton
const server = app.listen(env.PORT, async () => {
  // connect to the database
  await connect()

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
