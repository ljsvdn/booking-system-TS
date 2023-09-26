import User from "../models/user-model";
import AuthService from "../../auth/services/auth-service";
import HttpError from "../../../utility/http-error";

interface UserPayload {
  name: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  preferences: string;
  subscribedToNewsletter: boolean;
}

export default class UserService {
  static async createUser(user: UserPayload) {
    user.password = await AuthService.hashPassword(user.password);

    const newUser = await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      subscribedToNewsletter: user.subscribedToNewsletter,
    });
    return newUser;
  }

  static async getAllUsers() {
    const users = await User.findAll();
    return users;
  }

  static async getUserById(id: number) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    return user;
  }

  static async getUserByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    return user;
  }

  static async updateUser(id: number, payload: Partial<UserPayload>) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new HttpError("User not found", 404);
    }

    if (payload.password) {
      payload.password = await AuthService.hashPassword(payload.password);
    }

    const updatedUser = await user.update(payload);
    return updatedUser;
  }

  static async updateUserPassword(id: number, newPassword: string) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new HttpError("User not found", 404);
    }

    user.password = newPassword;
    await user.save();

    return user;
  }

  static async deleteUser(id: number) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    await user.destroy();
    return { message: "User deleted successfully" };
  }

  static async subscribeToNewsletter(id: number) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    const updatedUser = await user.update({ subscribedToNewsletter: true });
    return updatedUser;
  }

  static async unsubscribeFromNewsletter(id: number) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    const updatedUser = await user.update({ subscribedToNewsletter: false });
    return updatedUser;
  }
}
