import BookingTime from "../models/booking-time-model";

export default class BookingTimeService {
  static async createBookingTime(time: Date) {
    const newBookingTime = await BookingTime.create({ time });
    return newBookingTime;
  }

  static async getAllBookingTimes() {
    const bookingTimes = await BookingTime.findAll();
    return bookingTimes;
  }

  static async getBookingTimeById(id: number) {
    const bookingTime = await BookingTime.findByPk(id);
    return bookingTime;
  }

  static async updateBookingTime(id: number, time: Date) {
    const bookingTime = await BookingTime.findByPk(id);

    if (!bookingTime) {
      throw new Error("Booking time not found");
    }

    bookingTime.time = time;
    await bookingTime.save();

    return bookingTime;
  }

  static async deleteBookingTime(id: number) {
    const bookingTime = await BookingTime.findByPk(id);

    if (!bookingTime) {
      throw new Error("Booking time not found");
    }

    await bookingTime.destroy();
  }
}
