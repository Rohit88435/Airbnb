import React, { useContext } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";

function ListingPage1() {
  let navigate = useNavigate();
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
  } = useContext(listingDataContext);

  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackendImage1(file);
    setFrontendImage1(URL.createObjectURL(file));
  };
  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackendImage2(file);
    setFrontendImage2(URL.createObjectURL(file));
  };
  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackendImage3(file);
    setFrontendImage3(URL.createObjectURL(file));
  };

  return (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center flex-col  relative">
      <div
        className="w-[50px] h-[50px]  bg-[red] text-white cursor-pointer absolute top-[5%] left-[20px] rounded-full flex justify-center items-center lg:ml-[20px]"
        onClick={() => {
          navigate("/");
        }}
      >
        <FaArrowLeft className="w-[20px] h-[20px]" />
      </div>
      <form
        className="w-[90%] max-[900px] h-[600px] p-[20px]  lg:pl-[40px] md:pl-[40px]  flex items-center mt-[60px] justify-start flex-col md:items-center gap-[2px] overflow-auto "
        // onSubmit={handleAddListing}
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/listing2");
        }}
      >
        <div className="w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg lg:mr-[50px]">
          SetUp Your Home
        </div>
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
              required
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
              required
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
              required
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
        <div className="w-[90%] md:w-[70%] flex items-start  gap-[5px] justify-start flex-col mt-[30px] ">
          <button
            className="px-[40px]  cursor-pointer py-[5px] bg-[red] text-white text-[18px]  md:px-[80px] rounded-lg outline-none border-none flex justify-between items-center gap-[10px]"
            type="submit"
          >
            Next
            <FaArrowRight className="w-[20px] h-[20px]" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ListingPage1;
