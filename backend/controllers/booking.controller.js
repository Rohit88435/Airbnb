import Booking from "../models/booking.model.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

export const createBooking = async (req, res) => {
  try {
    let { id } = req.params;
    let { checkIn, checkOut, totalRent } = req.body;
    let listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }
    if (new Date(checkIn) >= new Date(checkOut)) {
      return res
        .status(400)
        .json({ message: "Invalid checkIn / checkOut date" });
    }
    if (listing.isBooked) {
      return res.status(400).json({ message: "listing is already booked" });
    }

    let booking = await Booking.create({
      checkIn,
      checkOut,
      totalRent,
      host: listing.host, // Make sure this is not undefined!
      guest: req.userId,
      listing: listing._id,
      status: "booked", // or "pending", or add "booked" to your schema enum
    });
    await booking.populate("host", "email");
    let user = await User.findByIdAndUpdate(
      req.userId,
      {
        $push: {
          booking: listing,
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    listing.guest = req.userId;
    listing.isBooked = true;
    await listing.save();
    console.log("listing.host:", listing.host);
    return res.status(201).json(booking);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `booking error ${error}` });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { isBooked: false });
    let user = await User.findByIdAndUpdate(
      listing.guest,
      {
        $pull: {
          booking: listing._id,
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "user is not found" });
    }
    return res.status(200).json({ message: "booking canceled" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ` cancel booking error ${error}` });
  }
};
