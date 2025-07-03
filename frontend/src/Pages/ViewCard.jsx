import React, { useContext, useEffect } from "react";
import { listingDataContext } from "../Context/ListingContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { userDataContext } from "../Context/UserContext";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { bookingDataContext } from "../Context/BookingContext";

function ViewCard() {
  let {
    cardDetail,
    setCardDetail,
    category,
    list,
    setList,
    updating,
    setupdating,
    setcategory,
    bookingpop,
    setBookingpop,
    handleAddListing,
    deleting,
    setDeleting,
  } = useContext(listingDataContext);

  let {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    night,
    setNight,
    bookingData,
    setBookingData,
    handleBooking,
    booking,
    setBooking,
  } = useContext(bookingDataContext);
  let { serverUrl } = useContext(authDataContext);
  let { getuserData, setUserData } = useContext(userDataContext);
  let navigate = useNavigate();
  let [updatepop, setUpdatepop] = useState(false);
  let [title, setTitle] = useState(cardDetail.title);
  let [description, setDescription] = useState(cardDetail.description);
  let [backendImage1, setBackendImage1] = useState(null);
  let [backendImage2, setBackendImage2] = useState(null);
  let [backendImage3, setBackendImage3] = useState(null);
  let [rent, setRent] = useState(cardDetail.rent);
  let [city, setCity] = useState(cardDetail.city);
  let [landmark, setLandmark] = useState(cardDetail.landmark);
  let [minDate, setMinDate] = useState("");

  const handleupdateListing = async () => {
    try {
      setupdating(true);
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (backendImage1) {
        formData.append("image1", backendImage1);
      }
      if (backendImage2) {
        formData.append("image2", backendImage2);
      }
      if (backendImage3) {
        formData.append("image3", backendImage3);
      }
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", category);
      let result = await axios.put(
        serverUrl + `/api/listing/update/${cardDetail._id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(result.data);
      toast.success("Listing updated");
      setupdating(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);

      console.log("update listing ");
      setupdating(false);
    }
  };

  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackendImage1(file);
  };
  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackendImage2(file);
  };
  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackendImage3(file);
  };

  const handleDeleteListing = async () => {
    try {
      setDeleting(true);
      let result = await axios.delete(
        serverUrl + `/api/listing/delete/${cardDetail._id}`,
        { withCredentials: true }
      );
      toast.success("deleting successfully");
      setDeleting(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setDeleting(false);
      console.log("handleDeleteListing");
    }
  };

  useEffect(() => {
    let today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  useEffect(() => {
    if (checkIn && checkOut) {
      let inDate = new Date(checkIn);
      let outDate = new Date(checkOut);
      let n = Math.floor((outDate - inDate) / (24 * 60 * 60 * 1000)); // or Math.floor
      setNight(n);
      let airbnbcharge = cardDetail.rent * (7 / 100);
      let tax = cardDetail.rent * (7 / 100);

      if (n > 0) {
        setTotal(cardDetail.rent * n + airbnbcharge + tax);
      } else {
        setTotal(0);
      }
    }
  }, [checkIn, checkOut, cardDetail.rent, total]);
  return (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center gap-[10px] flex-col overflow-auto relative">
      <div
        className="w-[50px] h-[50px]  bg-[red] text-white cursor-pointer absolute top-[5%] left-[20px] rounded-full flex justify-center items-center"
        onClick={() => {
          navigate("/");
        }}
      >
        <FaArrowLeft className="w-[20px] h-[20px]" />
      </div>
      <div className="w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]">
        <h1 className="text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden">
          In
          {` ${cardDetail.landmark.toUpperCase()} ${cardDetail.city.toUpperCase()}`}
        </h1>
      </div>
      <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row bg-black">
        <div className="w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px]  border-white bg-[red]">
          <img src={cardDetail.image1} alt="" className="w-[100%]" />
        </div>
        <div className="w-[100%] h-[30%]  md:h-[100%] md:w-[30%] flex items-center justify-center md:flex-col border-white bg-black">
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px]">
            <img src={cardDetail.image2} alt="" className="w-[100%]" />
          </div>
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px]">
            <img src={cardDetail.image3} alt="" className="w-[100%]" />
          </div>
        </div>
      </div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">{`${cardDetail.title.toUpperCase()} ${cardDetail.category.toUpperCase()}, ${cardDetail.landmark.toUpperCase()}`}</div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] text-gray-800">{`${cardDetail.description.toUpperCase()}`}</div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">{`Rs. ${cardDetail.rent}/day`}</div>
      {cardDetail.host == getuserData._id && (
        <button
          className="px-[40px] h-[45px] cursor-pointer py-[5px] bg-[red] text-white text-[18px] absolute md:px-[80px] rounded-lg outline-none border-none flex justify-between items-center gap-[10px] top-[750px] md:top-[700px] lg:top-[550px] right-[60px] font-semibold"
          onClick={() => setUpdatepop((prev) => !prev)}
        >
          Edit
        </button>
      )}
      {cardDetail.host != getuserData._id && (
        <button
          className="px-[40px] h-[45px] cursor-pointer py-[5px] bg-[red] text-white text-[18px] absolute md:px-[80px] rounded-lg outline-none border-none flex justify-between items-center gap-[10px] top-[700px] md:top-[700px] lg:top-[600px] right-[60px] font-semibold"
          onClick={() => setBookingpop((prev) => !prev)}
        >
          Book
        </button>
      )}
      {/*update listing page */}
      {updatepop && (
        <div className="w-[100%] h-[100%] flex items-center justify-center bg-[#00000a9] absolute top-[0px] z-[100]  backdrop-blur-md">
          <RxCross2
            className="w-[30px] h-[30px] bg-[#fb0303] cursor-pointer absolute top-[5%] right-[20px] rounded-[50%] flex items-center justify-center text-[white] font-bold"
            onClick={() => {
              setUpdatepop(false);
            }}
          />
          <form
            className="w-[90%] max-w-[800px] h-[600px] p-[20px]  lg:pl-[40px] md:pl-[40px]  flex items-center mt-[60px] justify-start flex-col md:items-center gap-[2px] overflow-auto bg-[#bebebe] opacity-[0.8]  rounded-lg"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="w-[90%] md:w-[70%] flex items-start  gap-[5px] justify-start flex-col mt-[30px] ">
              <label htmlFor="title" className="text-[20px]">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="_bhk and best title"
                required
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg outline-none text-[18px] px-[20px]"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="w-[90%] md:w-[70%] flex items-start  gap-[5px] justify-start flex-col mt-[30px] ">
              <label htmlFor="des" className="text-[20px]">
                Description
              </label>
              <textarea
                type="text"
                id="des"
                placeholder="Description.."
                required
                className="w-[90%] h-[80px] border-[2px] border-[#555656] rounded-lg outline-none  text-[18px] px-[20px] overflow-auto resize-none"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="w-[90%] md:w-[70%] flex items-start  gap-[5px] justify-center flex-col mt-[30px] ">
              <label htmlFor="image1" className="text-[20px]">
                Image1
              </label>
              <div className="flex items-center justify-start w-[90%] h-[40px] border-[2px] border-[#555656] rounded-[10px]">
                <input
                  type="file"
                  id="image1"
                  className="w-[100%]  outline-none text-[15px] px-[10px]"
                  onChange={(e) => {
                    handleImage1(e);
                  }}
                />
              </div>
            </div>
            <div className="w-[90%] md:w-[70%] flex items-start  gap-[5px] justify-center flex-col mt-[30px] ">
              <label htmlFor="image2" className="text-[20px]">
                Image2
              </label>
              <div className="flex items-center justify-start w-[90%] h-[40px] border-[2px] border-[#555656] rounded-[10px]">
                <input
                  type="file"
                  id="image2"
                  className="w-[100%]  outline-none text-[15px] px-[10px]"
                  onChange={(e) => {
                    handleImage2(e);
                  }}
                />
              </div>
            </div>
            <div className="w-[90%] md:w-[70%] flex items-start  gap-[5px] justify-center flex-col mt-[30px] ">
              <label htmlFor="image3" className="text-[20px]">
                Image3
              </label>
              <div className="flex items-center justify-start w-[90%] h-[40px] border-[2px] border-[#555656] rounded-[10px]">
                <input
                  type="file"
                  id="image3"
                  className="w-[100%]  outline-none text-[15px] px-[10px]"
                  onChange={(e) => {
                    handleImage3(e);
                  }}
                />
              </div>
            </div>
            <div className="w-[90%] md:w-[70%] flex items-start  gap-[5px] justify-start flex-col mt-[30px] ">
              <label htmlFor="rent" className="text-[20px]">
                Rent
              </label>
              <input
                type="text"
                id="rent"
                placeholder="₹ 2000 /-"
                required
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg outline-none text-[18px] px-[20px]"
                value={rent}
                onChange={(e) => {
                  setRent(e.target.value);
                }}
              />
            </div>
            <div className="w-[90%] md:w-[70%] flex items-start  gap-[5px] justify-start flex-col mt-[30px] ">
              <label htmlFor="city" className="text-[20px]">
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="city"
                required
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg outline-none text-[18px] px-[20px]"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <div className="w-[90%] md:w-[70%] flex items-start  gap-[5px] justify-start flex-col mt-[30px] ">
              <label htmlFor="landmark" className="text-[20px]">
                Landmark
              </label>
              <input
                type="text"
                id="landmark"
                placeholder="landmark"
                required
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg outline-none text-[18px] px-[20px]"
                value={landmark}
                onChange={(e) => {
                  setLandmark(e.target.value);
                }}
              />
            </div>
            <div className="w-[90%] md:w-[70%] flex justify-between items-start  gap-[5px]  flex-row mt-[30px] ">
              <button
                className="px-[40px]  cursor-pointer py-[5px] bg-[red] text-white text-[18px]  md:px-[80px] rounded-lg outline-none border-none flex justify-between items-center gap-[10px]"
                onClick={handleupdateListing}
              >
                {updating ? "Updating.." : "Update "}
              </button>
              <button
                className="px-[40px]  cursor-pointer py-[5px] bg-[red] text-white text-[18px]  md:px-[80px] rounded-lg outline-none border-none flex justify-between items-center gap-[10px]"
                onClick={() => {
                  handleDeleteListing();
                }}
              >
                {deleting ? "Deleting.." : "Delete "}
              </button>
            </div>
          </form>
        </div>
      )}
      {bookingpop && (
        <div className="w-[100%] h-[100%] flex items-center gap-[40px] justify-center bg-[#ffffffbb] absolute top-0 z-[200] backdrop-blur-sm flex-col md:flex-row lg:flex-row ">
          <RxCross2
            className="w-[30px] h-[30px] bg-[#fb0303] cursor-pointer absolute top-[5%] right-[20px] rounded-[50%] flex items-center justify-center text-[white] font-bold"
            onClick={() => {
              setBookingpop(false);
            }}
          />
          <div className=""></div>
          <form
            className="max-w-[450px] w-[90%] h-[450px] overflow-auto bg-white  p-[20px] rounded-lg flex items-center justify-start flex-col gap-[10px] border-[1px] border-[#dedddd] mt-[20px] md:mt-0 lg:mt-0 "
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1 className="text-[25px] flex  justify-center py-[10px] w-[100%] border-b-[1px] border-[#a3a3a3] ">
              Comfirm & Book
            </h1>
            <div className="w-[100%] h-[70%]  mt-[10px] rounded-lg p-[15px]">
              <h3 className="text-[19px] font-bold">Your Trip-</h3>
              <div className="w-[90%] md:w-[70%] flex items-center  gap-[25px] justify-center flex-row md:flex-row mt-[30px] ">
                <label htmlFor="checkIn" className="md:text-[20px] text-[15px]">
                  CheckIn
                </label>
                <input
                  type="date"
                  id="checkIn"
                  placeholder="landmark"
                  min={minDate}
                  required
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                  }}
                  value={checkIn}
                  className="w-[90%] h-[40px] border-[2px] border-[#555656] cursor-pointer rounded-lg outline-none bg-transparent text-[15px] md:text-[18px] px-[10px]"
                />
              </div>
              <div className="w-[90%] md:w-[70%] flex items-center  gap-[10px] justify-center flex-row md:flex-row mt-[30px] ">
                <label
                  htmlFor="checkOut"
                  className="md:text-[20px] text-[15px]"
                >
                  CheckOut
                </label>
                <input
                  type="date"
                  id="checkOut"
                  placeholder="landmark"
                  required
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                  }}
                  value={checkOut}
                  className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg cursor-pointer outline-none bg-transparent text-[15px] md:text-[18px] px-[10px]"
                />
              </div>
              <div className="w-full flex justify-center items-center">
                <button
                  className="px-[20px] mt-[30px]  cursor-pointer py-[5px] bg-[red] text-white text-[18px]  md:px-[80px] rounded-lg outline-none border-none flex justify-between items-center gap-[10px]"
                  onClick={() => {
                    handleBooking(cardDetail._id);
                  }}
                  disabled={booking}
                >
                  {booking ? "Booking..." : "Book"}
                </button>
              </div>
            </div>
          </form>
          <div className="max-w-[450px] w-[90%] h-[450px] overflow-auto bg-white  p-[20px] rounded-lg flex items-center justify-start flex-col gap-[10px] border-[1px] border-[#dedddd] mb-[20px] md:mb-0 lg:mb-0">
            <div className="w-[95%] h-[30%] border-[1px] border-[#dedddd] rounded-lg flex justify-center items-center gap-[8px] p-[20px]  overflow-hidden">
              <div className="w-[70px] h-[90px] flex items-center justify-center flex-shrink-0 rounded-lg md:w-[100px]">
                <img
                  src={cardDetail.image1}
                  alt=""
                  className="w-[100%] h-[100%] "
                />
              </div>
              <div className="w-[80%] h-[100px] justify-start items-start gap-[5px]">
                <h1 className="w-[90%] turncate">
                  In {"" + cardDetail.landmark.toUpperCase()},
                  {" " + cardDetail.city.toUpperCase()}
                </h1>
                <h1 className="flex items-center justify-start gap-[5px] ">
                  <FaStar className="text-[#eb6262]" />
                  {cardDetail.ratings}
                </h1>
              </div>
            </div>
            <div className="w-[95%] h-[60%] border-[1px] border-[#dedddd] rounded-lg flex justify-start items-start p-[20px] flex-col gap-[15px]">
              <h1 className="text-[22px] font-semibold ">Booking Price -</h1>
              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">{`₹${cardDetail.rent} X ${night} nights`}</span>
                <span> {cardDetail.rent * night}</span>
              </p>
              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">{`Tax`}</span>
                <span> {(cardDetail.rent * 7) / 100}</span>
              </p>
              <p className="w-[100%] flex justify-between items-center px-[20px] border-b-[1px] border-gray-500 pb-[10px]">
                <span className="font-semibold ">{`Airbnb Charge`}</span>
                <span> {(cardDetail.rent * 7) / 100}</span>
              </p>

              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">{`Total`}</span>
                <span> {total}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewCard;
