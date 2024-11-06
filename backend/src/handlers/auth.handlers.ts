import { Request, Response, NextFunction } from 'express'
import type { RegisterUserType } from '../schemas/users.schemas'

export const registerUserHandler = (
  req: Request<unknown, unknown, RegisterUserType['body']>,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body
  res.json({email, password})
}
