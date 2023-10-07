import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { injectable } from 'tsyringe'

const { JWT_SECRET } = process.env

interface AuthPayload {
  userId: number
  role?: string
}

@injectable()
export default class AuthService {
  generateToken(payload: AuthPayload) {
    return jwt.sign(
      { userId: payload.userId, role: payload.role },
      JWT_SECRET as string,
      { expiresIn: '24h' }
    )
  }

  verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET as string)
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10)
  }

  async verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
  }
}
