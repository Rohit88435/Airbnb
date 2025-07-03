import React, { useContext, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoPersonCircle } from "react-icons/io5";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { BiBuildingHouse } from "react-icons/bi";
import { GiSpookyHouse } from "react-icons/gi";
import { GrSwim } from "react-icons/gr";
import { MdBedroomParent } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { GiWoodCabin } from "react-icons/gi";
import { FaStore } from "react-icons/fa";
import { listingDataContext } from "../Context/ListingContext";
import { userDataContext } from "../Context/UserContext";

function ListingPage2() {
  let navigate = useNavigate();
  let { getuserData, setUserData, getUserData } = useContext(userDataContext);

  let { category, setcategory, handleAddListing } =
    useContext(listingDataContext);

  return (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center flex-col  relative">
      <div
        className="w-[50px] h-[50px]  bg-[red] text-white cursor-pointer absolute top-[5%] left-[20px] rounded-full flex justify-center items-center"
        onClick={() => {
          navigate("/listing1");
        }}
      >
        <FaArrowLeft className="w-[20px] h-[20px]" />
      </div>

      <div className="w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg">
        SetUp Your Home
      </div>

      <div className="w-[100%] max-w-[900px] h-[550px] md:h-[420px] lg:h-[420px] flex items-center justify-center flex-wrap lg:mt-[60px] md:mt-[30px] mb-[20px] ">
        <h1 className="text-[18px] text-black md:text-[30px] ">
          Which of the best describes your place?
        </h1>

        <div className="w-[100%] max-w-[900px] h-[100%] p-[20px] md:w-[70%]  flex items-center justify-center  overflow-auto relative flex-wrap gap-[20px] ">
          <div
            className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] border-[#a6a5a5] hover:border-[black] text-[16px] rounded-lg ${
              category == "villa" ? " border-[3px] border-[black]" : ""
            }`}
            onClick={() => {
              setcategory("villa");
            }}
          >
            <GiFamilyHouse className="w-[30px] h-[30px] text-black" />
            <h3 className="font-semibold text-[16px]">Villa</h3>
          </div>
          <div
            className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] border-[#a6a5a5] hover:border-[black] text-[16px] rounded-lg ${
              category == "farmHouse" ? " border-[3px] border-[black]" : ""
            }`}
            onClick={() => {
              setcategory("farmHouse");
            }}
          >
            <GiSpookyHouse className="w-[30px] h-[30px] text-black" />
            <h3 className="font-semibold text-[15px]">Farm House</h3>
          </div>
          <div
            className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] border-[#a6a5a5] hover:border-[black] text-[16px] rounded-lg ${
              category == "poolHouse" ? " border-[3px] border-[black]" : ""
            }`}
            onClick={() => {
              setcategory("poolHouse");
            }}
          >
            <GrSwim className="w-[30px] h-[30px] text-black" />
            <h3 className="font-semibold text-[15px]">Pool House</h3>
          </div>
          <div
            className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] border-[#a6a5a5] hover:border-[black] text-[16px] rounded-lg ${
              category == "rooms" ? "border-[black] border-[3px]" : ""
            }`}
            onClick={() => {
              setcategory("rooms");
            }}
          >
            <MdBedroomParent className="w-[30px] h-[30px] text-black" />
            <h3 className="font-semibold text-[15px]">Rooms</h3>
          </div>
          <div
            className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] border-[#a6a5a5] hover:border-[black] text-[16px] rounded-lg ${
              category == "pg" ? "border-[black] border-[3px]" : ""
            }`}
            onClick={() => {
              setcategory("pg");
            }}
          >
            <IoBedOutline className="w-[30px] h-[30px] text-black" />
            <h3 className="font-semibold text-[15px]">PG</h3>
          </div>
          <div
            className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] border-[#a6a5a5] hover:border-[black] text-[16px] rounded-lg ${
              category == "flat" ? "border-[black] border-[3px]" : ""
            }`}
            onClick={() => {
              setcategory("flat");
            }}
          >
            <BiBuildingHouse className="w-[30px] h-[30px] text-black" />
            <h3 className="font-semibold text-[15px]">Flat</h3>
          </div>
          <div
            className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] border-[#a6a5a5] hover:border-[black] text-[16px] rounded-lg ${
              category == "cabins" ? "border-[black] border-[3px]" : ""
            }`}
            onClick={() => {
              setcategory("cabins");
            }}
          >
            <GiWoodCabin className="w-[30px] h-[30px] text-black" />
            <h3 className="font-semibold text-[15px]">Cabins</h3>
          </div>
          <div
            className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] border-[#a6a5a5] hover:border-[black] text-[16px] rounded-lg ${
              category == "shops" ? "border-[black] border-[3px]" : ""
            }`}
            onClick={() => {
              setcategory("shops");
            }}
          >
            <FaStore className="w-[30px] h-[30px] text-black" />
            <h3 className="font-semibold text-[16px]">Shops</h3>
          </div>
        </div>

        <button
          className="px-[40px] h-[45px] cursor-pointer py-[5px] bg-[red] text-white text-[18px] absolute md:px-[80px] rounded-lg outline-none border-none flex justify-between items-center gap-[10px] top-[750px] md:top-[700px] lg:top-[500px] right-[60px]"
          disabled={!category}
          onClick={() => {
            navigate("/listing3");
          }}
        >
          Next
          <FaArrowRight className="w-[20px] h-[20px]" />
        </button>
      </div>
    </div>
  );
}

export default ListingPage2;
