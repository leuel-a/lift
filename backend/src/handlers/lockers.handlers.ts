import { RequestHandler } from 'express'
import { GetManyLockersType } from '../schemas/lockers.schemas'
import { findManyLockers } from '../services/lockers.services'

export const assignLockerHandler: RequestHandler = async (req, res, next) => {
  res.send('assign locker handler')
}

export const getManyLockerHandler: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetManyLockersType['query']
> = async (req, res, next) => {
  const { section } = req.query
  const isTaken =
    req.query.isTaken === 'true' ? true : req.query.isTaken === 'false' ? false : undefined

  const lockers = await findManyLockers({
    ...(section && { section }),
    ...(isTaken && { isTaken }),
  })

  res.status(200).send(lockers)
}

export const freeLockerHandler: RequestHandler = async (req, res, next) => {
  res.send('free locker handler')
}
