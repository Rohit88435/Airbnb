import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { bookingDataContext } from "../Context/BookingContext";
import { userDataContext } from "../Context/UserContext";
import Card from "../Components/Card";

function MyBookings() {
  let navigate = useNavigate();
  let { getuserData, setUserData } = useContext(userDataContext);

  return (
    <div className="w-[100vw] min-h-[100vh] flex items-center justify-start gap-[50px] flex-col relative">
      <div
        className="w-[50px] h-[50px]  bg-[red] text-white cursor-pointer absolute top-[10%] left-[20px] rounded-full flex justify-center items-center"
        onClick={() => {
          navigate("/");
        }}
      >
        <FaArrowLeft className="w-[20px] h-[20px]" />
      </div>
      <div className="w-[50%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center lg:text-[30px] md:text-[25px] text-[20px] rouded-md text-[#613b3b] font-semibold mt-[20px] md:w-[600px]">
        MY Bookings
      </div>
      <div className="w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]">
        {getuserData.booking.map((list) => (
          <Card
            title={list.title}
            landmark={list.landmark}
            city={list.city}
            image1={list.image1}
            image2={list.image2}
            image3={list.image3}
            rent={list.rent}
            id={list._id}
            isBooked={list.isBooked}
            host={list.host}
            ratings={list.ratings}
          />
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
