import { NextFunction, Request, Response } from 'express'
import logger from '../utils/logger'

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(
    `HTTP Request: ${req.method} ${req.url}, Params: ${JSON.stringify(
      req.params
    )}, Body: ${JSON.stringify(req.body)}`
  )
  next()
}
