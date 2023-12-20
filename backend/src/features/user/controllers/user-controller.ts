import express from 'express'
import UserService from '../services/user-service'

const UserController = express
  .Router()
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
      const { email, name, role, password } = req.body
      const updatedUser = await userService.updateUser(Number(id), {
        email,
        name,
        role,
        password,
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

export default UserController
