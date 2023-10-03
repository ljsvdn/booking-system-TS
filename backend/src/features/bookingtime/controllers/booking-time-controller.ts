import express from "express";
import BookingTimeService from "../services/booking-time-service";

const BookingTimeController = express
  .Router()
  // new booking time
  .post("/create", async (req, res, next) => {
    try {
      const bookingTimeService =
        req.container.resolve<BookingTimeService>("BookingTimeService");
      const { time } = req.body;
      const newBookingTime = await bookingTimeService.createBookingTime({
        time,
      });
      res.status(201).json(newBookingTime);
    } catch (error) {
      next(error);
    }
  })
  // get all booking times
  .get("/", async (req, res, next) => {
    try {
      const bookingTimeService =
        req.container.resolve<BookingTimeService>("BookingTimeService");
      const bookingTimes = await bookingTimeService.getAllBookingTimes();
      res.json(bookingTimes);
    } catch (error) {
      next(error);
    }
  })
  // get booking time by id
  .get("/:id", async (req, res, next) => {
    try {
      const bookingTimeService =
        req.container.resolve<BookingTimeService>("BookingTimeService");
      const { id } = req.params;
      const bookingTime = await bookingTimeService.getBookingTimeById(
        Number(id)
      );
      res.json(bookingTime);
    } catch (error) {
      next(error);
    }
  })
  // update booking time by id
  .put("/:id", async (req, res, next) => {
    try {
      const bookingTimeService =
        req.container.resolve<BookingTimeService>("BookingTimeService");
      const { id } = req.params;
      const { time } = req.body;
      const updatedBookingTime = await bookingTimeService.updateBookingTime(
        Number(id),
        {
          time,
        }
      );
      res.json(updatedBookingTime);
    } catch (error) {
      next(error);
    }
  })
  // delete booking time by id
  .delete("/:id", async (req, res, next) => {
    try {
      const bookingTimeService =
        req.container.resolve<BookingTimeService>("BookingTimeService");
      const { id } = req.params;
      await bookingTimeService.deleteBookingTime(Number(id));
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

export default BookingTimeController;
