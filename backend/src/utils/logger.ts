import path from 'path'
import winston from 'winston'

import env from './env'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.resolve(__dirname, '..', 'logs', 'errors.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.resolve(__dirname, '..', 'logs', 'all_logs.log'),
    }),
  ],
})

if (env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(
          ({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`,
        ),
      ),
      level: 'info',
    }),
  )
}

export default logger
