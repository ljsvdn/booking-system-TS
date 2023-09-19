import AuthService from "../services/authService";

interface DecodedToken {
  userId: number;
  role: string;
  iat: number;
  exp: number;
}

export const verifyJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = AuthService.verifyToken(token) as DecodedToken;
    req.user = decoded;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
