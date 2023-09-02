import sequelize from "./database";
import { Booking } from "../models/bookingModel";
import BookingTime from "../models/bookingTimeModel";
import Service from "../models/serviceModel";
import User from "../models/userModel";

// set up associations
Booking.belongsTo(BookingTime, {
  foreignKey: "bookingTimeId",
  as: "bookingTime",
});

Booking.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

Booking.belongsTo(User, {
  foreignKey: "customerId",
  as: "user",
});

BookingTime.hasMany(Booking, {
  foreignKey: "bookingTimeId",
  as: "bookings",
});

Service.hasMany(Booking, {
  foreignKey: "serviceId",
  as: "bookings",
});

User.hasMany(Booking, {
  foreignKey: "customerId",
  as: "bookings",
});

// sync database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced");
  } catch (error) {
    console.log("Error syncing database:", error);
  }
};

syncDatabase();
