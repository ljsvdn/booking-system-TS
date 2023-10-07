import BookingTime from '../models/booking-time-model'

interface BookingTimePayload {
  time: Date
}

export default class BookingTimeService {
  async createBookingTime(payload: BookingTimePayload) {
    const newBookingTime = await BookingTime.create({
      time: payload.time,
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
      throw new Error('Booking time not found')
    }

    bookingTime.time = payload.time
    await bookingTime.save()

    return bookingTime
  }

  async deleteBookingTime(id: number) {
    const bookingTime = await BookingTime.findByPk(id)

    if (!bookingTime) {
      throw new Error('Booking time not found')
    }

    await bookingTime.destroy()
  }
}
