import { parseISO } from 'date-fns'
import logger from '../utils/logger'
import createHttpError from 'http-errors'
import { Request, Response, NextFunction, RequestHandler } from 'express'

import type {
  CreateMemberType,
  GetMemberType,
  UpdateMemberType,
  GetManyMembersType,
} from '../schemas/members.schemas'
import {
  createMember,
  findManyMembers,
  findMemberById,
  findMemberByIdAndUpdate,
  countMembers,
} from '../services/members.services'

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
    next(createHttpError(500, 'server error please try again'))
  }
}

export const getManyMembersHandler: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetManyMembersType['query']
> = async (req, res, next) => {
  try {
    // get the current page and limit for the current query
    const page = req.query.page ?? 1
    const limit = req.query.limit ?? 10
    const asc = req.query.asc ? req.query.asc === 'true' : false
    const active = req.query.active ? req.query.active === 'true' : undefined

    // get the members with the count for the current query
    const [members, totalCount] = await Promise.all([
      findManyMembers(
        { ...(active && { active }) },
        {
          lean: true,
          limit,
          skip: (page - 1) * limit,
          sort: { createdAt: asc === false ? -1 : 1 },
        },
      ),
      countMembers({ ...(active && { active }) }),
    ])

    res.status(200).send({
      data: members,
      page,
      limit,
      totalCount,
    })
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
