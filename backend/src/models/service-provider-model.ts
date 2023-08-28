import { Model, DataTypes } from "sequelize";
import sequelize from "../db/database";

class ServiceProvider extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public address!: string;
  public phone!: string;
  public email!: string;
  public website!: string;
  public facebook!: string;
  public instagram!: string;
}

ServiceProvider.init(
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
    address: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    phone: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    website: {
      type: new DataTypes.STRING(256),
      allowNull: true,
    },
    facebook: {
      type: new DataTypes.STRING(256),
      allowNull: true,
    },
    instagram: {
      type: new DataTypes.STRING(256),
      allowNull: true,
    },
  },
  {
    tableName: "service_providers",
    sequelize,
  }
);

export default ServiceProvider;
