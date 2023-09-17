import { Booking, BookingInstance } from "../models/bookingModel";
import User from "../models/userModel";
import BookingTime from "../models/bookingTimeModel";
import Service from "../models/serviceModel";
import HttpError from "../utility/HttpError";
import MailerService from "./mailerService";

export default class BookingService {
  static async createBooking(data: any) {
    const service = await Service.findByPk(data.serviceId);

    if (!service) {
      throw new HttpError("Service not found", 404);
    }

    let bookingTimeId = data.bookingTimeId;

    if (service.booking_type === "predefined") {
      const bookingTime = await BookingTime.findByPk(bookingTimeId);

      if (!bookingTime) {
        throw new HttpError("Booking time not found", 404);
      }
    } else {
      // Create a new booking time
      const newBookingTime = await BookingTime.create({ time: data.date });
      bookingTimeId = newBookingTime.id;
    }

    const existingBooking = await Booking.findOne({
      where: {
        serviceId: data.serviceId,
        bookingTimeId: bookingTimeId,
        date: data.date,
      },
    });

    if (existingBooking) {
      throw new HttpError("Booking already exists", 409);
    }

    const newBooking = await Booking.create({
      ...data,
      bookingTimeId,
    });

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
        { model: User, as: "user" },
        { model: BookingTime, as: "bookingTime" },
      ],
    })) as BookingInstance;

    if (!booking) {
      throw new HttpError("Booking not found", 404);
    }
    const updatedBooking = await booking.update({ confirmed: true });

    if (booking.user) {
      await MailerService.sendConfirmationEmail(
        booking.user.email,
        booking.user.name,
        booking.date.toString()
      );
    }

    return updatedBooking;
  }
}
