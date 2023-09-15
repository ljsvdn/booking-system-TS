import express from "express";
import BookingService from "../services/bookingService";

const BookingController = express.Router();

// new booking
BookingController.post("/create", async (req, res, next) => {
  try {
    const {
      bookingTimeId,
      serviceId,
      customerId,
      numberOfGuests,
      foodPreferences,
    } = req.body;
    const newBooking = await BookingService.createBooking({
      bookingTimeId,
      serviceId,
      customerId,
      numberOfGuests,
      foodPreferences,
    });
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
});

// get all bookings for a service
BookingController.get("/all/:serviceId", async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const bookings = await BookingService.getAllBookings(Number(serviceId));
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
});

// get booking by id
BookingController.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await BookingService.getBookingById(Number(id));
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
});

// update booking
BookingController.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      bookingTimeId,
      serviceId,
      customerId,
      numberOfGuests,
      foodPreferences,
    } = req.body;
    const updatedBooking = await BookingService.updateBooking(Number(id), {
      bookingTimeId,
      serviceId,
      customerId,
      numberOfGuests,
      foodPreferences,
    });
    res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
});

// delete booking
BookingController.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await BookingService.deleteBooking(Number(id));
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// confirm booking
BookingController.put("/:id/confirm", async (req, res, next) => {
  try {
    const { id } = req.params;
    await BookingService.confirmBooking(Number(id));

    res.status(200).json({ message: "Booking confirmed successfully" });
  } catch (error) {
    next(error);
  }
});

export default BookingController;
