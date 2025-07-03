import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  cancelBooking,
  createBooking,
} from "../controllers/booking.controller.js";

let bookingRoute = express.Router();

bookingRoute.post("/create/:id", isAuth, createBooking);
bookingRoute.delete("/cancel/:id", isAuth, cancelBooking);

export default bookingRoute;
