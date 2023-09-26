import express from "express";
import UserService from "../services/user-service";
import MailerService from "../../utility/mailer-service";
import { isAdmin } from "../../middlewares/is-admin";

const UserController = express.Router();

// new user
UserController.post("/create", async (req, res, next) => {
  try {
    const {
      email,
      name,
      password,
      phoneNumber,
      preferences,
      subscribedToNewsletter,
    } = req.body;
    const newUser = await UserService.createUser({
      email,
      name,
      password,
      phoneNumber,
      preferences,
      subscribedToNewsletter,
    });

    // Send welcome email
    await MailerService.sendEmail(
      email,
      "Welcome to Our Service",
      `Hello ${name},\n\nThank you for registering. We're excited to have you on board!`
    );

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// get all users
UserController.get("/", isAdmin, async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// get user by id
UserController.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user!.userId !== Number(id)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const user = await UserService.getUserById(Number(id));
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// update user
UserController.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, name, phoneNumber, preferences, subscribedToNewsletter } =
      req.body;
    const updatedUser = await UserService.updateUser(Number(id), {
      email,
      name,
      phoneNumber,
      preferences,
      subscribedToNewsletter,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// delete user
UserController.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserService.deleteUser(Number(id));
    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
});

// subscribe to newsletter
UserController.put("/:id/subscribe", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserService.subscribeToNewsletter(Number(id));
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// unsubscribe from newsletter
UserController.put("/:id/unsubscribe", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserService.unsubscribeFromNewsletter(Number(id));
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

export default UserController;
