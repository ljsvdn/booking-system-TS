import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// extend the Request type to include a user property
interface RequestWithUser extends Request {
  user?: any;
}

dotenv.config();

export let invalidatedTokens: string[] = [];

export const authMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token || invalidatedTokens.includes(token)) {
    return res.status(401).json({ error: "You must be logged in." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Token is not valid." });
  }
};

export const requireRole = (...roles: string[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "You must be logged in." });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "You are not authorized." });
    }

    next();
  };
};
