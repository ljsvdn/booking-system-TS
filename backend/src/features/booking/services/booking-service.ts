import { inject, injectable } from 'tsyringe'
import HttpError from '../../../utils/http-error'
import { MailerService } from '../../../utils/mailer-service'
import BookingTime from '../../bookingtime/models/booking-time-model'
import { Booking, BookingInstance } from '../models/booking-model'

interface BookingPayload {
  bookingTimeId: number
  name: string
  email: string
  phoneNumber: string
  numberOfGuests: number
  preferences: string
  date: Date
  confirmed: false
}

@injectable()
export default class BookingService {
  constructor(
    @inject('MailerService') private mailerService: typeof MailerService
  ) {}

  async createBooking(payload: BookingPayload) {
    const bookingTime = await BookingTime.findByPk(payload.bookingTimeId)

    if (!bookingTime) {
      throw new HttpError('Booking time not found', 404)
    }

    const newBooking = await Booking.create(payload as any)
  }

  async getAllBookings() {
    const bookings = await Booking.findAll()
    return bookings
  }

  async getBookingById(id: number) {
    const booking = await Booking.findByPk(id)
    if (!booking) {
      throw new HttpError('Booking not found', 404)
    }
    return booking
  }

  async getBookingByUserId(userId: number) {
    const booking = await Booking.findAll({ where: { userId } })
    if (!booking) {
      throw new HttpError('Booking not found', 404)
    }
    return booking
  }

  async getBookingByDate(date: string) {
    const booking = await Booking.findAll({ where: { date } })
    if (!booking) {
      throw new HttpError('Booking not found', 404)
    }
    return booking
  }

  async updateBooking(id: number, payload: BookingPayload) {
    const booking = await Booking.findByPk(id)
    if (!booking) {
      throw new HttpError('Booking not found', 404)
    }

    const updatedBooking = await booking.update(payload)
    return updatedBooking
  }

  async deleteBooking(id: number) {
    const booking = await Booking.findByPk(id)
    if (!booking) {
      throw new HttpError('Booking not found', 404)
    }
    await booking.destroy()
  }

  async getBookingsByDate(date: Date) {
    const bookings = await Booking.findAll({
      include: [
        {
          model: BookingTime,
          as: 'bookingTime',
          where: {
            date: date,
          },
        },
      ],
    })
    return bookings
  }

  async getBookingsByDateAndTime(date: Date, startTime: string) {
    const bookings = await Booking.findAll({
      include: [
        {
          model: BookingTime,
          as: 'bookingTime',
          where: {
            date: date,
            startTime: startTime,
          },
        },
      ],
    })
    return bookings
  }

  async confirmBooking(id: number) {
    const booking = (await Booking.findByPk(id, {
      include: [{ model: BookingTime, as: 'bookingTime' }],
    })) as BookingInstance

    if (!booking) {
      throw new HttpError('Booking not found', 404)
    }

    if (booking) {
      await this.mailerService.sendConfirmationEmail(
        booking.email,
        booking.name,
        booking.date.toString()
      )
    }

    const updatedBooking = await booking.update({ confirmed: true })

    return updatedBooking
  }
}
