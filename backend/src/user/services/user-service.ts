import User from "../models/user-model";
import AuthService from "../../auth/services/auth-service";
import HttpError from "../../utility/http-error";

export default class UserService {
  static async createUser(user: any) {
    user.password = await AuthService.hashPassword(user.password);

    const newUser = await User.create(user);
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

  static async updateUser(id: number, data: any) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    const updatedUser = await user.update(data);
    return updatedUser;
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
