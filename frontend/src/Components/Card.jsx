import React, { useState } from "react";
import { useContext } from "react";
import { listingDataContext } from "../Context/ListingContext";
import { userDataContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineStar } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { bookingDataContext } from "../Context/BookingContext";

function Card({
  title,
  landmark,
  image1,
  image2,
  image3,
  rent,
  city,
  id,
  ratings,
  isBooked,
  host,
}) {
  let { handleViewCard } = useContext(listingDataContext);
  let { getuserData, setUserData } = useContext(userDataContext);
  let navigate = useNavigate();
  const handleClick = () => {
    if (getuserData) {
      handleViewCard(id);
    } else {
      navigate("/login");
    }
  };
  let { handleCancelBooking } = useContext(bookingDataContext);

  let [popup, setPop] = useState(false);
  return (
    <div
      className="w-[330px] h-[440px] max-w-[85%] z-10 flex flex-col items-start justify-start rounded-lg cursor-pointer shadow-lg relative"
      onClick={() => {
        const isUserHost = host !== getuserData?._id;
        if (!isBooked && isUserHost) {
          handleClick(); // Book the slot (view or book)
        }
      }}
    >
      {/* Booked Label and Cancel Booking */}
      {isBooked && host !== getuserData?._id && (
        <>
          <div className="text-green-600 font-semibold bg-white rounded-lg absolute flex items-center justify-center right-1 top-1 gap-1 p-1">
            <GiConfirmed className="text-green-600 w-5 h-5" />
            Booked
          </div>
          <div
            className="text-red-600 font-semibold bg-white rounded-lg absolute flex items-center justify-center right-1 top-12 gap-1 p-1"
            onClick={(e) => {
              e.stopPropagation();
              setPop((prev) => !prev);
            }}
          >
            <FcCancel className="text-red-600 w-5 h-5" />
            Cancel Booking
          </div>
        </>
      )}

      {/* Book Now Button (if not booked and not host) */}
      {!isBooked && host !== getuserData?._id && (
        <button
          className="absolute right-1 top-1 bg-blue-600 text-white px-4 py-2 rounded z-20"
          onClick={(e) => {
            e.stopPropagation();
            handleClick(); // Book or view
          }}
        >
          Book Now
        </button>
      )}
      {!isBooked && host == getuserData?._id && (
        <button
          className="absolute right-1 top-1 bg-red-600 text-white px-4 py-2 rounded z-20"
          onClick={(e) => {
            e.stopPropagation();
            handleClick(); // Book or view
          }}
        >
          edit
        </button>
      )}

      {/* Cancel confirmation popup */}
      {popup && (
        <div className="w-[300px] h-[100px] bg-[#ffffffdf] absolute top-[110px] left-[13px] rounded-lg ">
          <div className="w-full h-1/2 text-[#2e2d2d] font-semibold flex items-center justify-center rounded-lg overflow-auto text-[20px] p-[10px]">
            Booking Cancel
          </div>
          <div className="w-full h-1/2 text-[18px] font-semibold flex items-center justify-center gap-2 text-[#986b6b] ">
            Are you sure?
            <button
              className="px-5 bg-red-600 text-white rounded-lg hover:bg-slate-600"
              onClick={() => {
                handleCancelBooking(id);
                setPop(false);
              }}
            >
              Yes
            </button>
            <button
              className="px-5 bg-red-600 text-white rounded-lg hover:bg-slate-600"
              onClick={() => setPop(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
      <div className="w-[100%] h-[67%] bg-[#2e2d2d] rounded-lg overflow-auto flex">
        <img src={image1} alt="" className="w-[100%] flex-shrink-0" />
        <img src={image2} alt="" className="w-[100%] flex-shrink-0" />
        <img src={image3} alt="" className="w-[100%] flex-shrink-0" />
      </div>
      <div className="w-[100%] h-[33%] py-[20px] px-[10px] flex flex-col gap-[2px] z-[10] transition-shadow">
        <div className="flex justify-between items-center text-[18px]">
          <span className=" w-[80%] text-ellipsis overflow-hidden text-nowrap text-[#4a3434] font-semibold">
            In {landmark.toUpperCase()}, {city.toUpperCase()}
          </span>
          <span className="flex justify-start items-center">
            <MdOutlineStar className="text-[#ff7700]" />
            {ratings}
          </span>
        </div>
        <span className=" w-[80%] text-ellipsis overflow-hidden text-nowrap text-[16px]">
          {title.toUpperCase()}
        </span>
        <span className=" w-[80%] text-ellipsis overflow-hidden text-nowrap text-[#986b6b] font-semibold ">
          ₹ {rent}/ day
        </span>
      </div>
    </div>
  );
}

export default Card;
