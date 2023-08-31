import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// extend the Request type to include a user property
interface RequestWithUser extends Request {
  user?: any;
}

dotenv.config();

export const authMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
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

export default authMiddleware;
