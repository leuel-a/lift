import { AnyZodObject, ZodError } from 'zod'
import { Request, Response, NextFunction } from 'express'

import { transformZodErrors } from '../utils/transformZodErrors'

const validateResource =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
      })
      next()
    } catch (error) {
      const e = transformZodErrors(error as ZodError)
      res.status(400).json(e)
    }
  }

export default validateResource
