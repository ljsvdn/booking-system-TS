import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import logger from "../logger";
import {
  authMiddleware,
  requireRole,
  invalidatedTokens,
} from "../middlewares/authMiddleware";
import HttpError from "../utility/HttpError";
import User from "../models/user-model";

dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new HttpError("Email and password are required", 400);
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new HttpError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    logger.info(`New user registered: ${newUser.email}`);
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof HttpError) {
      logger.error(`Error during registration: ${error.message}`);
      res.status(error.statusCode).json({ error: error.message });
    } else {
      if (error instanceof Error) {
        logger.error(
          `An unexpected error occurred during registration: ${error.message}`
        );
      }
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpError("User not found", 404);
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new HttpError("Password is incorrect", 401);
    }

    if (!process.env.JWT_SECRET) {
      throw new HttpError("JWT_SECRET not defined", 500);
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.error(`Error during login: ${error.message}`);
      res.status(error.statusCode).json({ error: error.message });
    } else {
      logger.error(`An unexpected error occurred during login: ${error}`);
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
});

router.post("/logout", authMiddleware, (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new HttpError("Token missing from request", 401);
    }
    invalidatedTokens.push(token);

    res.json({ message: "You have been logged out." });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.error(`Error during logout: ${error.message}`);
      res.status(error.statusCode).json({ error: error.message });
    } else {
      logger.error(`An unexpected error occurred during logout: ${error}`);
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
});

// TBA role specific routes
/*
router.get("/admin", authMiddleware, requireRole("Admin"), (req, res) => {
  res.json({ message: "You are an admin!" });
});
*/
