import { inject, injectable } from 'tsyringe'
import HttpError from '../../../utils/http-error'
import AuthService from '../../auth/services/auth-service'
import User from '../models/user-model'

interface UserPayload {
  name: string
  email: string
  password: string
  role: string
}

@injectable()
export default class UserService {
  constructor(@inject('AuthService') private authService: AuthService) {}

  async getUserById(id: number) {
    const user = await User.findByPk(id)
    if (!user) {
      throw new HttpError('User not found', 404)
    }

    return user
  }

  async getUserByEmail(email: string) {
    const user = await User.findOne({ where: { email } })
    return user
  }

  async updateUser(id: number, payload: UserPayload) {
    const user = await User.findByPk(id)
    if (!user) {
      throw new HttpError('User not found', 404)
    }

    user.name = payload.name
    user.email = payload.email
    user.password = payload.password
    user.role = payload.role

    await user.save()

    return user
  }

  async deleteUser(id: number) {
    const user = await User.findByPk(id)
    if (!user) {
      throw new HttpError('User not found', 404)
    }
    await user.destroy()
    return { message: 'User deleted successfully' }
  }
}
