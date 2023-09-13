import User from "../models/userModel";
import HttpError from "../utility/HttpError";

export default class UserService {
  static async createUser(data: any) {
    const newUser = await User.create(data);
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
