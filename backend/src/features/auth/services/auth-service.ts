import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { injectable } from 'tsyringe'
import HttpError from '../../../utils/http-error'
import UserService from '../../user/services/user-service'

const { JWT_SECRET } = process.env

export interface AuthPayload {
  userId: number
  role?: string
}

@injectable()
export default class AuthService {
  constructor(private userService: UserService) {}

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

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email)

    if (!user) {
      throw new HttpError('User not found', 404)
    }

    const isValidPassword = await this.verifyPassword(password, user.password)

    if (!isValidPassword) {
      throw new HttpError('Invalid credentials', 401)
    }

    return this.generateToken({ userId: user.id })
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10)
  }

  async verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
  }
}
