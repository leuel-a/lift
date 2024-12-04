import type { RequestHandler } from 'express'
import type { UpdateUserType } from '../schemas/users.schemas'
import { findUserByIdAndUpdate } from '../services/users.services'
import _ from 'lodash'

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
