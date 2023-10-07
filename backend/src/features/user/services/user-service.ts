import { inject, injectable } from 'tsyringe'
import HttpError from '../../../utility/http-error'
import AuthService from '../../auth/services/auth-service'
import User from '../models/user-model'

interface UserPayload {
  name: string
  email: string
  password: string
  role: string
  phoneNumber: string
  preferences: string
  subscribedToNewsletter: boolean
}

@injectable()
export default class UserService {
  constructor(@inject('AuthService') private authService: AuthService) {}

  async createUser(user: UserPayload) {
    user.password = await this.authService.hashPassword(user.password)

    const newUser = await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      subscribedToNewsletter: user.subscribedToNewsletter,
    })
    return newUser
  }

  async getAllUsers() {
    const users = await User.findAll()
    return users
  }

  async getUserById(id: number) {
    const user = await User.findByPk(id)
    if (!user) {
      throw new HttpError('User not found', 404)
    }
    return user
  }

  async getUserByEmail(email: string) {
    console.log('lofasz:', email)
    const user = await User.findOne({ where: { email } })
    console.log('emil:', email, user)
    if (!user) {
      throw new HttpError('User not found', 404)
    }
    return user
  }

  async updateUser(id: number, payload: Partial<UserPayload>) {
    const user = await User.findByPk(id)
    if (!user) {
      throw new HttpError('User not found', 404)
    }

    if (payload.password) {
      payload.password = await this.authService.hashPassword(payload.password)
    }

    const updatedUser = await user.update(payload)
    return updatedUser
  }

  async updateUserPassword(id: number, newPassword: string) {
    const user = await User.findByPk(id)
    if (!user) {
      throw new HttpError('User not found', 404)
    }

    user.password = newPassword
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

  async subscribeToNewsletter(id: number) {
    const user = await User.findByPk(id)
    if (!user) {
      throw new HttpError('User not found', 404)
    }
    const updatedUser = await user.update({ subscribedToNewsletter: true })
    return updatedUser
  }

  async unsubscribeFromNewsletter(id: number) {
    const user = await User.findByPk(id)
    if (!user) {
      throw new HttpError('User not found', 404)
    }
    const updatedUser = await user.update({ subscribedToNewsletter: false })
    return updatedUser
  }
}
