import { Model, DataTypes } from "sequelize";
import sequelize from "../db/database";

class BookingTime extends Model {
  public id!: number;
  public time!: Date;
}

BookingTime.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    time: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    tableName: "booking_times",
    sequelize,
  }
);

export default BookingTime;
