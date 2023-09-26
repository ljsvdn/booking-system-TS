import { Model, DataTypes } from "sequelize";
import sequelize from "../../../db/database";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public phoneNumber!: string;
  public preferences!: string;
  public subscribedToNewsletter!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      defaultValue: "customer",
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    phoneNumber: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    preferences: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    subscribedToNewsletter: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },

  {
    tableName: "users",
    sequelize,
  }
);

export default User;
