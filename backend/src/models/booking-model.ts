import { Model, DataTypes } from "sequelize";
import sequelize from "../db/database";

class Booking extends Model {
  public id!: number;
  public bookingTimeId!: number;
  public serviceId!: number;
  public customerId!: number;
  public numberOfGuests!: number;
  public foodPreferences!: string;

  public createdAt!: Date;
  public updatedAt!: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    bookingTimeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "bookings",
    sequelize,
  }
);

export default Booking;
