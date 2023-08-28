import { Model, DataTypes } from "sequelize";
import sequelize from "../db/database";

class Service extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(256),
      allowNull: true,
    },
  },
  {
    tableName: "services",
    sequelize, // passing the `sequelize` instance is required
  }
);

export default Service;
