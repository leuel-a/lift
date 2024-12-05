import _ from 'lodash'
import createHttpError from 'http-errors'
import type { Request, Response, NextFunction } from 'express'

import { signJwt } from '../utils/jwt'
import { createUser, findUser } from '../services/users.services'
import { hashPassword, validatePassword } from '../utils/password'
import type { LoginUserType, RegisterUserType } from '../schemas/users.schemas'

export const registerUserHandler = async (
  req: Request<unknown, unknown, RegisterUserType['body']>,
  res: Response,
  next: NextFunction,
) => {
  const { email, password, role, firstName, lastName, phoneNumber } = req.body
  const passwordHash = await hashPassword(password)

  try {
    const user = await createUser({ email, password: passwordHash, role, firstName, lastName, phoneNumber })
    res.status(201).send(_.omit(user.toJSON(), ['password', 'role']))
  } catch (error) {
    next(error)
  }
}

export const loginUserHandler = async (
  req: Request<unknown, unknown, LoginUserType['body']>,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body
  const user = await findUser({ email }, {lean: false})

  if (!user) {
    next(createHttpError(400, 'Email or Password not correct'))
    return
  }

  const isMatch = await validatePassword(user.password, password)
  if (!isMatch) {
    next(createHttpError(400, 'Email or Password is not correct'))
    return
  }

  const payload = {
    sub: user._id,
    email: user.email,
  }

  user.lastLogin = new Date()
  await user.save()

  const accessToken = signJwt(payload, 'accessToken')
  const refreshToken = signJwt(payload, 'refreshToken')

  res.status(200).json({ accessToken, refreshToken })
}

export const getAuthenticatedUserHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(_.omit(req.user, ['password']))
}

