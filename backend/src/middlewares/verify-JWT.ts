import { Request, Response, NextFunction } from "express";
import AuthService from "../features/auth/services/auth-service";

interface DecodedToken {
  userId: number;
  role: string;
  iat: number;
  exp: number;
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const authService = req.container.resolve<AuthService>("AuthService");
    const decoded = authService.verifyToken(token) as DecodedToken;
    req.user = decoded;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
