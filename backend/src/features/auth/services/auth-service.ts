import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { JWT_SECRET } = process.env;

interface AuthPayload {
  userId: number;
  role?: string;
}

export default class AuthService {
  static generateToken(payload: AuthPayload) {
    return jwt.sign(
      { userId: payload.userId, role: payload.role },
      JWT_SECRET as string,
      { expiresIn: "24h" }
    );
  }

  static verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET as string);
  }

  static async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  static async verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
