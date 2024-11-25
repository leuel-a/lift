import { RequestHandler } from 'express'

export const assignLockerHandler: RequestHandler = async (req, res, next) => {
  res.send('assign locker handler')
}

export const getManyLockerHandler: RequestHandler = async (req, res, next) => {
  res.send('get many locker handler')
}

export const freeLockerHandler: RequestHandler = async (req, res, next) => {
  res.send('free locker handler')
}
