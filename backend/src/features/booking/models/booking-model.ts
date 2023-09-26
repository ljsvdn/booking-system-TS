import { Model, DataTypes, Association } from "sequelize";
import sequelize from "../../db/database";
import User from "../../user/models/user-model";
import BookingTime from "../../bookingtime/models/booking-time-model";

export interface BookingInstance extends Model {
  id: number;
  bookingTimeId: number;
  serviceId: number;
  customerId: number;
  numberOfGuests: number;
  foodPreferences: string;
  confirmed: boolean;
  date: Date;

  user?: User;
  bookingTime?: BookingTime;
}

export class Booking extends Model implements BookingInstance {
  public id!: number;
  public bookingTimeId!: number;
  public serviceId!: number;
  public customerId!: number;
  public numberOfGuests!: number;
  public foodPreferences!: string;
  public confirmed!: boolean;
  public date!: Date;

  public static associations: {
    user: Association<Booking, User>;
    bookingTime: Association<Booking, BookingTime>;
  };
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
    numberOfGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    foodPreferences: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "bookings",
    sequelize,
  }
);
