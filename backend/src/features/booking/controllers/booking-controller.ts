import express from "express";
import { isAdmin } from "../../../middlewares/is-admin";
import BookingService from "../services/booking-service";

const BookingController = express
  .Router()
  // create booking
  .post("/create", async (req, res, next) => {
    try {
      const bookingService =
        req.container.resolve<BookingService>("BookingService");
      const {
        bookingTimeId,
        serviceId,
        customerId,
        numberOfGuests,
        foodPreferences,
        date,
      } = req.body;
      const newBooking = await bookingService.createBooking({
        bookingTimeId,
        serviceId,
        customerId,
        numberOfGuests,
        foodPreferences,
        date,
        confirmed: false,
      });
      res.status(201).json(newBooking);
    } catch (error) {
      next(error);
    }
  })
  // get all bookings for a service
  .get("/all/:serviceId", isAdmin, async (req, res, next) => {
    try {
      const bookingService =
        req.container.resolve<BookingService>("BookingService");
      const { serviceId } = req.params;
      const bookings = await bookingService.getAllBookings(Number(serviceId));
      res.json(bookings);
    } catch (error) {
      next(error);
    }
  })
  // get booking by id
  .get("/:id", async (req, res, next) => {
    try {
      const bookingService =
        req.container.resolve<BookingService>("BookingService");
      const { id } = req.params;
      const booking = await bookingService.getBookingById(Number(id));
      res.json(booking);
    } catch (error) {
      next(error);
    }
  })
  // update booking
  .put("/:id", async (req, res, next) => {
    try {
      const bookingService =
        req.container.resolve<BookingService>("BookingService");
      const { id } = req.params;
      const {
        bookingTimeId,
        serviceId,
        customerId,
        numberOfGuests,
        foodPreferences,
        date,
      } = req.body;
      const updatedBooking = await bookingService.updateBooking(Number(id), {
        bookingTimeId,
        serviceId,
        customerId,
        numberOfGuests,
        foodPreferences,
        date,
        confirmed: false,
      });
      res.json(updatedBooking);
    } catch (error) {
      next(error);
    }
  })
  // delete booking
  .delete("/:id", async (req, res, next) => {
    try {
      const bookingService =
        req.container.resolve<BookingService>("BookingService");
      const { id } = req.params;
      await bookingService.deleteBooking(Number(id));
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  })
  // confirm booking
  .put("/:id/confirm", isAdmin, async (req, res, next) => {
    try {
      const bookingService =
        req.container.resolve<BookingService>("BookingService");
      const { id } = req.params;
      await bookingService.confirmBooking(Number(id));

      res.json({ message: "Booking confirmed successfully" });
    } catch (error) {
      next(error);
    }
  });

export default BookingController;
