import React, { use, useContext, useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { bookingDataContext } from "../Context/BookingContext";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Star from "../Components/Star";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";

function Booked() {
  let { bookingData } = useContext(bookingDataContext);
  let { serverUrl } = useContext(authDataContext);
  let navigate = useNavigate();
  let [star, setStar] = useState(null);
  let { getUserData } = useContext(userDataContext);
  let { getListing, cardDetail } = useContext(listingDataContext);

  const handleRating = async (id) => {
    try {
      let result = await axios.post(
        serverUrl + `/api/listing/ratings/${id}`,
        {
          ratings: star,
        },
        { withCredentials: true }
      );
      await getListing();
      await getUserData();
      console.log(result.data);
      navigate("/");
    } catch (error) {
      console.log("rating error", error);
    }
  };
  const handleStar = async (value) => {
    setStar(value);
    console.log("your Rated", value);
  };
  return (
    <div className="w-[100vw] min-h-[100vh] flex items-center justify-center gap-[10px] bg-slate-200 flex-col relative">
      <div className="w-[95%] max-w-[500px] h-[400px] bg-white flex items-center justify-center border-[1px] border-[#b5b5b5] flex-col gap-[20px] p-[20px] md:-[80%] rounded-lg">
        <div className="w-[100%] h-[50%] text-[20px] flex items-center justify-center flex-col gap-[20px] font-semibold">
          <GiConfirmed className="w-[100px] h-[100px] text-[green]" /> Booking
          Confirmed
        </div>
        <div className="w-[100%] flex items-center justify-between text-[16px] md:text-[18px]">
          <span>Booking Id :</span> <span>{bookingData._id}</span>
        </div>
        <div className="w-[100%] flex items-center justify-between text-[16px] md:text-[18px]">
          <span>Owner Details :</span> <span>{bookingData.host?.email}</span>
        </div>
        <div className="w-[100%] flex items-center justify-between text-[16px] md:text-[18px]">
          <span>Total Rent :</span> <span>{bookingData.totalRent}</span>
        </div>
      </div>

      <div className="w-[95%] max-w-[600px] h-[200px] bg-white flex items-center justify-center border-[1px] border-[#b5b5b5] flex-col gap-[20px] md:w-[80%] rounded-lg">
        <h1 className="text-[18px]">{star} Out of 5 Rating</h1>
        <Star onRate={handleStar} />
        <button
          className="px-[40px]  cursor-pointer py-[5px] bg-[red] text-white text-[18px]  md:px-[80px] rounded-lg outline-none border-none flex justify-between items-center gap-[10px]"
          onClick={() => {
            handleRating(cardDetail._id);
          }}
        >
          Submit
        </button>
      </div>
      <button
        className="px-[30px]  cursor-pointer py-[5px] bg-[red] text-white text-[18px]  md:px-[80px] rounded-lg outline-none border-none flex justify-between items-center gap-[10px] absolute top-[40px] right-[40px]"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default Booked;
