import createHttpError from 'http-errors'
import { IUser } from '../models/users.model'
import type { RequestHandler } from 'express'

export const requireAdmin: RequestHandler = (req, res, next) => {
  if ((req.user as IUser).role !== 'admin') {
    next(createHttpError(403, 'forbidden'))
  }
  next()
}