import mongoose from 'mongoose'

import env from '../utils/env'
import logger from '../utils/logger'

export async function connectDB() {
  try {
    await mongoose.connect(env.DATABASE_URI)
    logger.info('Connection to the database successful')
  } catch (e) {
    logger.error('Unable to connect to the database: ', e)
    process.exit(1)
  }
}
