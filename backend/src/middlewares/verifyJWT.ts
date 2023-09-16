import AuthService from "../services/authService";

export const verifyJWT = (req: any, res: any, next: any) => {
  const token = req.headers["authorization"];
  try {
    const decoded = AuthService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
