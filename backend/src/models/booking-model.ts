import { Model, DataTypes } from "sequelize";
import sequelize from "../db/database";

class Booking extends Model {
  public id!: number;
  public bookingTimeId!: number;
  public serviceId!: number;
  public serviceProviderId!: number;
  public customerId!: number;
  public numberOfGuests!: number;
  public foodPreferences!: string;

  public createdAt!: Date;
  public updatedAt!: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    bookingTimeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    serviceProviderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "bookings",
    sequelize,
  }
);

export default Booking;
