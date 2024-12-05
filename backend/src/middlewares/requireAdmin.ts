import createHttpError from 'http-errors'
import logger from '../utils/logger'
import { type UserDocument } from '../models/users.model'
import type { RequestHandler } from 'express'

export const requireAdmin: RequestHandler = (req, res, next) => {
  const user = req.user as UserDocument
  if (user.role !== 'admin') {
    logger.info(`user ${user._id} has requested an admin resource`)
    next(createHttpError(403, 'forbidden'))
  }
  next()
}