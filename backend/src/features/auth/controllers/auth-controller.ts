import express from 'express'
import AuthService from '../services/auth-service'

const AuthController = express
  .Router()
  .post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body
      const authService = req.container.resolve(AuthService)

      const token = await authService.login(email, password)
      res.json({ token })
    } catch (error) {
      next(error)
    }
  })

export default AuthController
