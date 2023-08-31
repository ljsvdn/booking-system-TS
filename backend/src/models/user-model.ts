import { Model, DataTypes } from "sequelize";
import sequelize from "../db/database";
import bcrypt from "bcrypt";

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public role!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },

  {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
    tableName: "users",
    sequelize,
  }
);

export default User;
