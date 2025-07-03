import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import authRoute from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import listingRoute from "./routes/listing.route.js";
import bookingRoute from "./routes/booking.route.js";
dotenv.config();
let app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://airbnb-tsj3.onrender.com",
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/listing", listingRoute);
app.use("/api/booking", bookingRoute);

app.listen(process.env.PORT || "8000", () => {
  console.log("Server Started");
  connectDb();
});
