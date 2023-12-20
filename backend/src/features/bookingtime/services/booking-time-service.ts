import HttpError from '../../../utils/http-error'
import BookingTime from '../models/booking-time-model'

interface BookingTimePayload {
  date: Date
  startTime: string
}

export default class BookingTimeService {
  async createBookingTime(payload: BookingTimePayload) {
    const newBookingTime = await BookingTime.create({
      date: payload.date,
      startTime: payload.startTime,
    })
    return newBookingTime
  }

  async getAllBookingTimes() {
    const bookingTimes = await BookingTime.findAll()
    return bookingTimes
  }

  async getBookingTimeById(id: number) {
    const bookingTime = await BookingTime.findByPk(id)
    return bookingTime
  }

  async updateBookingTime(id: number, payload: BookingTimePayload) {
    const bookingTime = await BookingTime.findByPk(id)

    if (!bookingTime) {
      throw new HttpError('Booking time not found', 404)
    }

    bookingTime.date = payload.date
    bookingTime.startTime = payload.startTime
    await bookingTime.save()

    return bookingTime
  }

  async deleteBookingTime(id: number) {
    const bookingTime = await BookingTime.findByPk(id)

    if (!bookingTime) {
      throw new HttpError('Booking time not found', 404)
    }

    await bookingTime.destroy()
  }
}
