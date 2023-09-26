import { Model, DataTypes } from "sequelize";
import sequelize from "../../db/database";

class Service extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public booking_type!: string;
}

Service.init(
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
    description: {
      type: new DataTypes.STRING(256),
      allowNull: true,
    },
    booking_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "predefined",
    },
  },
  {
    tableName: "services",
    sequelize,
  }
);

export default Service;
