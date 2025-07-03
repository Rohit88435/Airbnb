import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { authDataContext } from "./AuthContext";
import { userDataContext } from "./UserContext";
import { listingDataContext } from "./ListingContext";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
export const bookingDataContext = createContext();
function BookingContext({ children }) {
  let navigate = useNavigate();
  let [checkIn, setCheckIn] = useState("");
  let [checkOut, setCheckOut] = useState("");
  let [total, setTotal] = useState(0);
  let [night, setNight] = useState(0);
  let { serverUrl } = useContext(authDataContext);
  let { getUserData } = useContext(userDataContext);
  let { getListing } = useContext(listingDataContext);
  let [bookingData, setBookingData] = useState([]);
  let [booking, setBooking] = useState(false);
  const handleBooking = async (id) => {
    setBooking(true);
    try {
      let result = await axios.post(
        serverUrl + `/api/booking/create/${id}`,
        {
          checkIn,
          checkOut,
          totalRent: total,
        },
        {
          withCredentials: true,
        }
      );
      await getUserData();
      await getListing();
      setBookingData(result.data);
      navigate("/booked");
      toast.success("Booked successfully");
      console.log(result.data);
      setBooking(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      navigate("/");
      setBookingData(null);
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      let result = await axios.delete(serverUrl + `/api/booking/cancel/${id}`, {
        withCredentials: true,
      });
      await getUserData();
      await getListing();
      setBookingData(result.data);
      console.log(result.data);
      navigate("/");

      toast.success("Cancel successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      navigate("/");
      setBookingData(null);
    }
  };

  let value = {
    bookingData,
    setBookingData,
    handleBooking,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    night,
    setNight,
    handleCancelBooking,
    booking,
    setBooking,
  };
  return (
    <div>
      <bookingDataContext.Provider value={value}>
        {children}
      </bookingDataContext.Provider>
    </div>
  );
}

export default BookingContext;
