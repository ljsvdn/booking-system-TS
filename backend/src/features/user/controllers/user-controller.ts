import express from 'express'
import { isAdmin } from '../../../middlewares/is-admin'
import { MailerService } from '../../../utility/mailer-service'
import UserService from '../services/user-service'

const UserController = express
  .Router()
  // new user
  .post('/create', async (req, res, next) => {
    try {
      const userService = req.container.resolve(UserService)
      const {
        email,
        name,
        password,
        role,
        phoneNumber,
        preferences,
        subscribedToNewsletter,
      } = req.body
      const newUser = await userService.createUser({
        email,
        name,
        password,
        role,
        phoneNumber,
        preferences,
        subscribedToNewsletter,
      })

      // Send welcome email
      await MailerService.sendEmail(
        email,
        'Welcome to Our Service',
        `Hello ${name},\n\nThank you for registering. We're excited to have you on board!`
      )

      res.status(201).json(newUser)
    } catch (error) {
      next(error)
    }
  })
  // get all users
  .get('/', isAdmin, async (req, res, next) => {
    try {
      const userService = req.container.resolve(UserService)
      const users = await userService.getAllUsers()
      res.json(users)
    } catch (error) {
      next(error)
    }
  })
  // get user by id
  .get('/:id', async (req, res, next) => {
    try {
      const userService = req.container.resolve(UserService)
      const { id } = req.params
      if (req.user!.userId !== Number(id)) {
        return res.status(403).json({ message: 'Forbidden' })
      }
      const user = await userService.getUserById(Number(id))
      res.json(user)
    } catch (error) {
      next(error)
    }
  })
  // update user
  .put('/:id', async (req, res, next) => {
    try {
      const userService = req.container.resolve(UserService)
      const { id } = req.params
      const {
        email,
        name,
        role,
        phoneNumber,
        preferences,
        subscribedToNewsletter,
      } = req.body
      const updatedUser = await userService.updateUser(Number(id), {
        email,
        name,
        role,
        phoneNumber,
        preferences,
        subscribedToNewsletter,
      })
      res.json(updatedUser)
    } catch (error) {
      next(error)
    }
  })
  // delete user
  .delete('/:id', async (req, res, next) => {
    try {
      const userService = req.container.resolve(UserService)
      const { id } = req.params
      await userService.deleteUser(Number(id))
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  })
  // subscribe to newsletter
  .put('/:id/subscribe', async (req, res, next) => {
    try {
      const userService = req.container.resolve(UserService)
      const { id } = req.params
      const updatedUser = await userService.subscribeToNewsletter(Number(id))
      res.json(updatedUser)
    } catch (error) {
      next(error)
    }
  })
  // unsubscribe from newsletter
  .put('/:id/unsubscribe', async (req, res, next) => {
    try {
      const userService = req.container.resolve(UserService)
      const { id } = req.params
      const updatedUser = await userService.unsubscribeFromNewsletter(
        Number(id)
      )
      res.json(updatedUser)
    } catch (error) {
      next(error)
    }
  })

export default UserController
