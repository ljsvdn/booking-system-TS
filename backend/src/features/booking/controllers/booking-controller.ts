import express from 'express'
import { isAdmin } from '../../../middlewares/is-admin'
import BookingService from '../services/booking-service'

const BookingController = express
  .Router()
  // create booking
  .post('/create', async (req, res, next) => {
    try {
      const bookingService = req.container.resolve(BookingService)
      const {
        bookingTimeId,
        name,
        email,
        phoneNumber,
        numberOfGuests,
        preferences,
        date,
      } = req.body
      const newBooking = await bookingService.createBooking({
        bookingTimeId,
        name,
        email,
        phoneNumber,
        numberOfGuests,
        preferences,
        date,
        confirmed: false,
      })
      res.status(201).json(newBooking)
    } catch (error) {
      next(error)
    }
  })
  // get all bookings
  .get('/all', isAdmin, async (req, res, next) => {
    try {
      const bookingService = req.container.resolve(BookingService)
      const bookings = await bookingService.getAllBookings()
      res.json(bookings)
    } catch (error) {
      next(error)
    }
  })
  // get booking by id
  .get('/:id', async (req, res, next) => {
    try {
      const bookingService = req.container.resolve(BookingService)
      const { id } = req.params
      const booking = await bookingService.getBookingById(Number(id))
      res.json(booking)
    } catch (error) {
      next(error)
    }
  })
  // update booking
  .put('/:id', async (req, res, next) => {
    try {
      const bookingService = req.container.resolve(BookingService)
      const { id } = req.params
      const {
        bookingTimeId,
        name,
        email,
        phoneNumber,
        numberOfGuests,
        preferences,
        date,
      } = req.body
      const updatedBooking = await bookingService.updateBooking(Number(id), {
        bookingTimeId,
        name,
        email,
        phoneNumber,
        numberOfGuests,
        preferences,
        date,
        confirmed: false,
      })
      res.json(updatedBooking)
    } catch (error) {
      next(error)
    }
  })
  // delete booking
  .delete('/:id', async (req, res, next) => {
    try {
      const bookingService = req.container.resolve(BookingService)
      const { id } = req.params
      await bookingService.deleteBooking(Number(id))
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  })
  // confirm booking
  .put('/:id/confirm', isAdmin, async (req, res, next) => {
    try {
      const bookingService = req.container.resolve(BookingService)
      const { id } = req.params
      await bookingService.confirmBooking(Number(id))

      res.json({ message: 'Booking confirmed successfully' })
    } catch (error) {
      next(error)
    }
  })

export default BookingController
