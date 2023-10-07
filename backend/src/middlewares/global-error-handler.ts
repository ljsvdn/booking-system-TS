import { NextFunction, Request, Response } from 'express'
import HttpError from '../utility/http-error'
import logger from '../utility/logger'

export const globalErrorHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next?: NextFunction
) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  logger.error(`Error: ${message}, Status Code: ${statusCode}`)

  res.status(statusCode).json({ error: message })
}
