import express from "express";
import UserService from "../../user/services/user-service";
import AuthService from "../services/auth-service";

const AuthController = express.Router();

AuthController.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.getUserByEmail(email);
    const isValidPassword = await AuthService.verifyPassword(
      password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = AuthService.generateToken({ userId: user.id });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

export default AuthController;
