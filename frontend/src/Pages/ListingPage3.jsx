import React, { useContext, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";
import { userDataContext } from "../Context/UserContext";

function ListingPage3() {
  let navigate = useNavigate();
  let { getuserData, setUserData, getUserData } = useContext(userDataContext);

  let {
    title,
    setTitle,
    description,
    setDescription,
    frontendImage1,
    setFrontendImage1,
    frontendImage2,
    setFrontendImage2,
    frontendImage3,
    setFrontendImage3,
    backendImage1,
    setBackendImage1,
    backendImage2,
    setBackendImage2,
    backendImage3,
    setBackendImage3,
    city,
    setCity,
    rent,
    setRent,
    landmark,
    setLandmark,
    category,
    setcategory,
    handleAddListing,
    adding,
    setAdding,
  } = useContext(listingDataContext);
  return (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center gap-[10px] flex-col overflow-auto relative">
      <div
        className="w-[50px] h-[50px]  bg-[red] text-white cursor-pointer absolute top-[5%] left-[20px] rounded-full flex justify-center items-center"
        onClick={() => {
          navigate("/listing2");
        }}
      >
        <FaArrowLeft className="w-[20px] h-[20px]" />
      </div>

      <div className="w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]">
        <h1 className="text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden">
          In{` ${landmark.toUpperCase()} ${city.toUpperCase()}`}
        </h1>
      </div>
      <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row bg-black">
        <div className="w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px]  border-white bg-[red]">
          <img src={frontendImage1} alt="" className="w-[100%]" />
        </div>
        <div className="w-[100%] h-[30%]  md:h-[100%] md:w-[30%] flex items-center justify-center md:flex-col border-white bg-black">
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px]">
            <img src={frontendImage2} alt="" />
          </div>
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px]">
            <img src={frontendImage3} alt="" />
          </div>
        </div>
      </div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">{`${title.toUpperCase()} ${category.toUpperCase()}, ${landmark.toUpperCase()}`}</div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] text-gray-800">{`${description.toUpperCase()}`}</div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">{`Rs. ${rent}/day`}</div>
      <button
        className="px-[40px] h-[45px] cursor-pointer py-[5px] bg-[red] text-white text-[18px] absolute md:px-[80px] rounded-lg outline-none border-none flex justify-between items-center gap-[10px] top-[750px] md:top-[700px] lg:top-[550px] right-[60px]"
        onClick={handleAddListing}
        disabled={adding}
      >
        {adding ? "Adding..." : "Add Listing"}
      </button>
    </div>
  );
}

export default ListingPage3;
