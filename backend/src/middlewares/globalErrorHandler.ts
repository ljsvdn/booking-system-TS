import { Request, Response, NextFunction } from "express";
import logger from "../logger";
import HttpError from "../utility/HttpError";

export const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  logger.error(`Error: ${message}, Status Code: ${statusCode}`);

  res.status(statusCode).json({ error: message });
};