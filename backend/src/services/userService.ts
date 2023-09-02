import User from "../models/userModel";
import HttpError from "../utility/HttpError";

export default class UserService {
  static async createUser(data: any) {
    const newUser = await User.create(data);
    return newUser;
  }

  static async updateUser(id: number, data: any) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    const updatedUser = await user.update(data);
    return updatedUser;
  }

  static async subscribeToNewsletter(id: number) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    const updatedUser = await user.update({ subscribedToNewsletter: true });
    return updatedUser;
  }
}
