import { isHttpError } from 'http-errors'
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let errorMessage = 'An unknown error occurred'

  if (isHttpError(err)) {
    statusCode = err.status
    errorMessage = err.message
  }

  res.status(statusCode).json({
    error: {
      message: errorMessage,
    },
  })
}

export default errorHandler
