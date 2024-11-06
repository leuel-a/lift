require('dotenv').config()

import app from '.'
import env from './utils/env'
import { connect } from './lib/db'
import logger from './utils/logger'

// listen on the specified port for the applicaiton
app.listen(env.PORT, async () => {
  // connect to the database
  await connect()

  logger.info(`Server running on port ${env.PORT}`)
})
