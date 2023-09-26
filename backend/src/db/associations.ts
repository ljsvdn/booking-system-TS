import sequelize from "./database";
import { Booking } from "../booking/models/booking-model";
import BookingTime from "../bookingtime/models/booking-time-model";
import Service from "../service/models/service-model";
import User from "../user/models/user-model";

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
