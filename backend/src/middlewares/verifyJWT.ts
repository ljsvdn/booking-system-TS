import AuthService from "../services/authService";

export const verifyJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  console.log("Received Token:", token);

  try {
    const decoded = AuthService.verifyToken(token);
    console.log("Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Token Verification Error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
