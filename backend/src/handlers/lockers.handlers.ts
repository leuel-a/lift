import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import type { FilterQuery } from 'mongoose'
import type { LockerDocument } from '../models/lockers.model'

import logger from '../utils/logger'
import { findLockerById, findManyLockers, assignLocker, freeLocker } from '../services/lockers.services'
import type { GetManyLockersType, GetSingleLockerType, FreeLockerType } from '../schemas/lockers.schemas'

export const assignLockerHandler: RequestHandler = async (req, res, next) => {
  try {
    const locker = await assignLocker(req.params.id)
    if (!locker) {
      next(createHttpError(404, 'resource not found'))
    }
    res.status(200).json(locker)
  } catch (e) {
    logger.error('Something went wrong: ', e)
    next(e)
  }
}

export const getManyLockerHandler: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetManyLockersType['query']
> = async (req, res, next) => {
  const { section, isTaken: qTaken } = req.query

  const isTaken =
    qTaken === 'true' ? true : qTaken === 'false' ? false : undefined

  const lockers = await findManyLockers({
    ...(section && { section }),
    ...(isTaken !== undefined && { isTaken }),
  }, { sort: { lockerNumber: 1 } })
  res.status(200).send(lockers)
}

export const getSingleLockerHandler: RequestHandler<GetSingleLockerType['params'], unknown, unknown> = async (req, res, next) => {
  try {
    const locker = await findLockerById(req.params.id)
    if (!locker) {
      next(createHttpError(404, 'resource not found'))
    }
    res.status(200).json(locker)
  } catch (error) {
    logger.error('Something went wrong: ', error)
    next(error)
  }
}

export const freeLockerHandler: RequestHandler<FreeLockerType['params'], unknown, unknown> = async (req, res, next) => {
  try {
    const locker = await freeLocker(req.params.id)
    if (!locker) {
      next(createHttpError(404, 'resource not found'))
    }
    res.status(200).json(locker)
  } catch (error) {
    logger.error('Something went wrong: ', error)
    next(error)
  }
}
