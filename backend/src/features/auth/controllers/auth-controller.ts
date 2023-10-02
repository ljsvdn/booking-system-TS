import express from "express";
import UserService from "../../user/services/user-service";
import AuthService from "../services/auth-service";

const AuthController = express.Router();

AuthController.post("/login", async (req, res, next) => {
  try {
    const authService = req.container.resolve<AuthService>("AuthService");
    const userService = req.container.resolve<UserService>("UserService");
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    const isValidPassword = await authService.verifyPassword(
      password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = authService.generateToken({ userId: user.id });
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

export default AuthController;
