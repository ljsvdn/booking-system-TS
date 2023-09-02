import { Booking, BookingInstance } from "../models/bookingModel";

import BookingTime from "../models/bookingTimeModel";
import User from "../models/userModel";
import HttpError from "../utility/HttpError";
import MailerService from "./mailerService";

export default class BookingService {
  static async createBooking(data: any) {
    const newBooking = await Booking.create(data);
    return newBooking;
  }

  static async getAllBookings(serviceId: number) {
    const bookings = await Booking.findAll({ where: { serviceId } });
    return bookings;
  }

  static async getBookingById(id: number) {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      throw new HttpError("Booking not found", 404);
    }
    return booking;
  }

  static async getBookingByUserId(userId: number) {
    const booking = await Booking.findAll({ where: { userId } });
    if (!booking) {
      throw new HttpError("Booking not found", 404);
    }
    return booking;
  }

  static async getBookingByDate(date: string) {
    const booking = await Booking.findAll({ where: { date } });
    if (!booking) {
      throw new HttpError("Booking not found", 404);
    }
    return booking;
  }

  static async updateBooking(id: number, data: any) {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      throw new HttpError("Booking not found", 404);
    }
    const updatedBooking = await booking.update(data);
    return updatedBooking;
  }

  static async deleteBooking(id: number) {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      throw new HttpError("Booking not found", 404);
    }
    await booking.destroy();
  }

  static async getBookingsByUserId(userId: number) {
    const bookings = await Booking.findAll({ where: { userId } });
    return bookings;
  }

  static async getBookingsByDate(date: Date) {
    const bookings = await Booking.findAll({
      include: [
        {
          model: BookingTime,
          as: "bookingTime",
          where: {
            time: date,
          },
        },
      ],
    });
    return bookings;
  }

  static async confirmBooking(id: number) {
    const booking = (await Booking.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    })) as BookingInstance;

    if (!booking) {
      throw new HttpError("Booking not found", 404);
    }

    const updatedBooking = await booking.update({ confirmed: true });

    if (booking.user && booking.user.email) {
      await MailerService.sendConfirmationEmail(booking.user.email, booking.id);
    }
  }
}
