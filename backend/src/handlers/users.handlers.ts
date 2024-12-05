import _ from 'lodash'
import type { RequestHandler } from 'express'
import type { UpdateUserType, GetManyUsersType } from '../schemas/users.schemas'
import { findUserByIdAndUpdate, findManyUsers, countUsers } from '../services/users.services'

export const getManyUsersHandler: RequestHandler<unknown, unknown, unknown, GetManyUsersType['params']> = async (req, res, next) => {
  try {
    const search = req.query.search ? req.query.search : ''
    const page = req.query.page ? parseInt(req.query.page) : 1
    const limit = req.query.limit ? parseInt(req.query.limit) : 10
    const query = {
      $or: [
        ...(search.length > 0 ? [{ firstName: { $regex: new RegExp(`^${search}`) } }] : []),
        ...(search.length > 0 ? [{ lastName: { $regex: new RegExp(`^${search}`) } }] : [])
      ]
    }

    const [users, totalCount] = await Promise.all([
      findManyUsers({
        ...query
      }, {
        lean: true,
        limit,
        skip: (page - 1) * limit
      }),
      countUsers({ ...query })
    ])

    res.status(200).send({
      data: users,
      page,
      limit,
      totalCount
    })

  } catch (e) {
    next(e)
  }
}

export const updateUserHandler: RequestHandler<UpdateUserType['params'], unknown, UpdateUserType['body']> = async (req, res, next) => {
  try {
    const { id } = req.params
    const { firstName, lastName, phoneNumber, gender } = req.body

    const user = await findUserByIdAndUpdate(id, { $set: { firstName, lastName, gender, phoneNumber } }, {
      new: true,
      lean: true
    })
    res.status(200).json(_.omit(user, ['password', 'role']))
  } catch (error) {
    next(error)
  }
}
