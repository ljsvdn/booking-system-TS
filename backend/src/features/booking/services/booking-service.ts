import { Booking, BookingInstance } from "../models/booking-model";
import User from "../../user/models/user-model";
import BookingTime from "../../bookingtime/models/booking-time-model";
import Service from "../../service/models/service-model";
import HttpError from "../../../utility/http-error";
import MailerService from "../../../utility/mailer-service";

interface BookingPayload {
  bookingTimeId: number;
  serviceId: number;
  customerId: number;
  numberOfGuests: number;
  foodPreferences: string;
  date: Date;
  confirmed: false;
}

export default class BookingService {
  static async createBooking(payload: BookingPayload) {
    const service = await Service.findByPk(payload.serviceId);

    if (!service) {
      throw new HttpError("Service not found", 404);
    }

    let bookingTimeId = payload.bookingTimeId;

    if (service.booking_type === "predefined") {
      const bookingTime = await BookingTime.findByPk(bookingTimeId);

      if (!bookingTime) {
        throw new HttpError("Booking time not found", 404);
      }
    } else {
      // Create a new booking time
      const newBookingTime = await BookingTime.create({ time: payload.date });
      bookingTimeId = newBookingTime.id;
    }

    const existingBooking = await Booking.findOne({
      where: {
        serviceId: payload.serviceId,
        bookingTimeId: bookingTimeId,
        date: payload.date,
      },
    });

    if (existingBooking) {
      throw new HttpError("Booking already exists", 409);
    }

    const newBooking = await Booking.create({
      ...payload,
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

  static async updateBooking(id: number, payload: BookingPayload) {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      throw new HttpError("Booking not found", 404);
    }

    const updatedBooking = await booking.update(payload);
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
