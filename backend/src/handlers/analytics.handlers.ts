import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import { getMembersByMonth } from '../services/analytics.services'
import { GetMembersByMonthType } from '../schemas/analytics.schemas'

export const getMembersByMonthHandler: RequestHandler<GetMembersByMonthType['params']> = async (req, res, next) => {
  try {
    const year = parseInt(req.params.year) || null
    if (!year) {
      next(createHttpError(400, 'Year must be provided'))
      return
    }
    const dbStats = await getMembersByMonth(year)
    const membersByMonth = Array.from({ length: 12 }, (_, x) => (
      {
        count: 0,
        month: x + 1
      }
    ))

    dbStats.forEach(stat => {
      const { month, count } = stat
      membersByMonth[month-1] = {count, month}
    })

    res.status(200).json(membersByMonth)
  } catch (e) {
    next(e)
  }
}
