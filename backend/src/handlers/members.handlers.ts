import { parseISO } from 'date-fns'
import createHttpError from 'http-errors'
import { Request, Response, NextFunction } from 'express'

import logger from '../utils/logger'
import {
  createMember,
  findManyMembers,
  findMemberById,
  findMemberByIdAndUpdate,
} from '../services/members.services'
import type { CreateMemberType, GetMemberType, UpdateMemberType } from '../schemas/members.schemas'

export const createMemberHandler = async (
  req: Request<unknown, unknown, CreateMemberType['body']>,
  res: Response,
  next: NextFunction,
) => {
  const { email, firstName, lastName, membershipType, phoneNumber, membershipStartDate } = req.body

  try {
    // TODO: handle membership end date
    const member = await createMember({
      email,
      firstName,
      lastName,
      membershipType,
      phoneNumber,
      membershipStartDate: parseISO(membershipStartDate),
    })

    res.status(201).json(member)
  } catch (error) {
    console.log(error)
    logger.error('Unable to create member:', error)
    next(createHttpError(400, `unable to create member: ${error}`))
  }
}

export const getMemberHandler = async (
  req: Request<GetMemberType['params'], unknown, unknown>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params
  try {
    const member = await findMemberById(id)
    if (!member) {
      next(createHttpError(404, 'resource not found, check member id'))
    }

    res.status(200).json(member)
  } catch (error) {
    next(createHttpError(500, 'Server error please try again'))
  }
}

export const getManyMembersHandler = async (
  req: Request<unknown, unknown, unknown>,
  res: Response,
  next: NextFunction,
) => {
  try {
    // TODO: add pagination to the members
    const members = await findManyMembers({})

    res.status(200).send(members)
  } catch (error) {
    next(error)
  }
}

export const updateMemberHandler = async (
  req: Request<UpdateMemberType['params'], unknown, UpdateMemberType['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const { membershipStartDate, ...body } = req.body

    // TODO: handle the unwanted member details update
    const member = await findMemberByIdAndUpdate(
      id,
      {
        $set: {
          ...(membershipStartDate && { membershipStartDate: new Date(membershipStartDate) }),
          ...body,
        },
      },
      {
        new: true,
        lean: true,
        runValidators: true,
      },
    )
    res.status(200).json(member)
  } catch (error) {
    logger.error(error)
    next(error)
  }
}
