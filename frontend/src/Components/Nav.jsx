import React, { useContext, useEffect, useState } from "react";
import logo1 from "../assets/logo.png";
import { FiSearch } from "react-icons/fi";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";
function Nav() {
  let navigate = useNavigate();
  let [popup, setPopup] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let { getuserData, setUserData } = useContext(userDataContext);
  let {
    listingData,
    setListingData,
    list,
    setList,
    handleSearch,
    serachData,
    handleViewCard,
  } = useContext(listingDataContext);
  let [cate, setcate] = useState();
  let [input, setInput] = useState("");
  const handleLogout = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      setUserData(null);
      toast.success(result.data.message);
    } catch (error) {
      console.log("logout error" + error);
    }
  };

  const handleCategory = (category) => {
    setcate(category);
    if (category === "trending") {
      setList(listingData);
    } else {
      setList(listingData.filter((list) => list.category == category));
    }
  };

  const handleClick = (id) => {
    if (getuserData) {
      handleViewCard(id);
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    handleSearch(input);
  }, [input]);
  return (
    <div className="w-[100%] flex flex-col fixed top-0 z-[20]">
      <div className="w-[100%] min-h-[80px]  border-b-[1px] border-gray-400 flex justify-between items-center relative  ">
        <div className="lg:w-[10%] w-[15%] h-full flex justify-center items-center ml-[20px]">
          <img src={logo1} alt="" className="w-full  " />
        </div>

        <div className="w-[30%] h-[45px] hidden justify-between items-center gap-2  lg:flex ">
          <input
            type="text"
            className="w-full border-[2px] lg:pl-[20px]   pl-[10px] pr-[10px] border-gray-500  rounded-[30px] py-[10px]"
            placeholder="Any where | Any location | Any City"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
          <button className="w-[45px] h-[40px] rounded-[50%] bg-[red] flex justify-center items-center">
            <FiSearch className="w-[23px]  h-[23px] text-[white]" />
          </button>
        </div>
        <div className="flex justify-center items-center gap-[10px] pr-[30px] ">
          <span
            className="text-[18px] font-semibold cursor-pointer rounded-[30px] hover:bg-[#ded9d9] px-[8px] py-[5px] hidden lg:flex md:flex"
            onClick={() => {
              navigate("/listing1");
            }}
          >
            List your Home
          </span>
          <div
            className="flex justify-center items-center gap-[5px] py-[10px]  border-1 border-[#8d8c8c] rounded-[30px] cursor-pointer hover:shadow-lg px-[10px]"
            onClick={() => {
              setPopup((prev) => !prev);
            }}
          >
            <span>
              <GiHamburgerMenu className="w-[20px] h-[20px]" />
            </span>

            {getuserData == null && (
              <span>
                <IoPersonCircle className="w-[20px] h-[20px]" />
              </span>
            )}
            {getuserData != null && (
              <span className="w-[30px] h-[30px] bg-[#ed5223] text-white rounded-full flex items-center text-[18px] justify-center">
                {getuserData?.name.toUpperCase().slice(0, 1)}
              </span>
            )}
          </div>
          {popup && (
            <div className="w-[220px] h-[250px] absolute bg-slate-50 top-[73px]  right-[2%]  border-1 border-[#aaa9a9]  rounded-lg transition-all shadow-lg ">
              <ul className="w-full h-full text-[17px] flex justify-around items-start flex-col ">
                {!getuserData && (
                  <li
                    className="w-full px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                    onClick={() => {
                      navigate("/login");
                      setPopup(false);
                    }}
                  >
                    Login
                  </li>
                )}
                <li
                  className="w-full px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                  onClick={() => {
                    navigate("/listing1");
                  }}
                >
                  List your home
                </li>
                <li
                  className="w-full px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                  onClick={() => {
                    navigate("/mylisting");
                  }}
                >
                  My Listing
                </li>
                <li
                  className="w-full px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                  onClick={() => {
                    navigate("/mybookings");
                  }}
                >
                  My Bookings
                </li>
                {getuserData && (
                  <li
                    className="w-full px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer text-[red]"
                    onClick={() => {
                      handleLogout();
                      setPopup(false);
                    }}
                  >
                    Logout
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {serachData?.length > 0 && (
          <div className="w-[100vw] h-[450px] flex flex-col gap-[20px] absolute md:top-[60%] top-[170%] overflow-auto left-[0] justify-start items-center ">
            <div className="max-w-[500px] w-[100vw] h-[200px] overflow-hidden flex flex-col bg-[#fefdfd] p-[20px] rounded-lg border-[1px] border-[#a2a1a1] cursor-pointer">
              {serachData.map((search) => (
                <div
                  className="border-b border-[black] p-[10px]"
                  onClick={() => {
                    handleClick(search._id);
                  }}
                >
                  {search.title} in {search.landmark},{search.city}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className=" w-[100%] h-[50px] mt-[10px] mb-[10px] flex lg:hidden justify-center items-center">
        <div className="w-[60%] h-[45px] flex justify-between items-center gap-2 ">
          <input
            type="text"
            className="w-full border-[2px] lg:pl-[20px]  pl-[20px] pr-[10px] border-gray-500  rounded-[30px] py-[10px]"
            placeholder="Any where | Any location | Any City"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
          <button className="w-[45px] h-[40px] rounded-[50%] bg-[red] flex justify-center items-center">
            <FiSearch className="w-[23px]  h-[23px] text-[white]" />
          </button>
        </div>
      </div>

      <div className="w-full h-[85px]  flex items-center justify-center gap-[40px]  flex-row overflow-auto px-[20px]">
        <div
          className={`flex flex-col justify-center items-center cursor-pointer hover:border-b-2 border-[#a6a5a5] ${
            cate == "trending" ? "border-b-[2px] border-[red]" : ""
          }`}
          onClick={() => {
            handleCategory("trending");
          }}
        >
          <MdWhatshot className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold text-[15px]">Trending</h3>
        </div>
        <div
          className={`flex flex-col justify-center items-center cursor-pointer hover:border-b-2 border-[#a6a5a5] ${
            cate == "villa" ? "border-b-[2px] border-[red]" : ""
          }`}
          onClick={() => handleCategory("villa")}
        >
          <GiFamilyHouse className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold text-[15px]">Villa</h3>
        </div>
        <div
          className={`flex flex-col justify-center items-center cursor-pointer hover:border-b-2 border-[#a6a5a5] ${
            cate == "farmHouse" ? "border-b-[2px] border-[red]" : ""
          }`}
          onClick={() => handleCategory("farmHouse")}
        >
          <GiSpookyHouse className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold text-[15px]">Farm House</h3>
        </div>
        <div
          className={`flex flex-col justify-center items-center cursor-pointer hover:border-b-2 border-[#a6a5a5] ${
            cate == "poolHouse" ? "border-b-[2px] border-[red]" : ""
          }`}
          onClick={() => handleCategory("poolHouse")}
        >
          <GrSwim className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold text-[15px]">Pool House</h3>
        </div>
        <div
          className={`flex flex-col justify-center items-center cursor-pointer hover:border-b-2 border-[#a6a5a5] ${
            cate == "rooms" ? "border-b-[2px] border-[red]" : ""
          }`}
          onClick={() => handleCategory("rooms")}
        >
          <MdBedroomParent className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold text-[15px]">Rooms</h3>
        </div>
        <div
          className={`flex flex-col justify-center items-center cursor-pointer hover:border-b-2 border-[#a6a5a5] ${
            cate == "pg" ? "border-b-[2px] border-[red]" : ""
          }`}
          onClick={() => handleCategory("pg")}
        >
          <IoBedOutline className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold text-[15px]">PG</h3>
        </div>
        <div
          className={`flex flex-col justify-center items-center cursor-pointer hover:border-b-2 border-[#a6a5a5] ${
            cate == "flat" ? "border-b-[2px] border-[red]" : ""
          }`}
          onClick={() => handleCategory("flat")}
        >
          <BiBuildingHouse className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold text-[15px]">Flat</h3>
        </div>
        <div
          className={`flex flex-col justify-center items-center cursor-pointer hover:border-b-2 border-[#a6a5a5] ${
            cate == "cabins" ? "border-b-[2px] border-[red]" : ""
          }`}
          onClick={() => handleCategory("cabins")}
        >
          <GiWoodCabin className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold text-[15px]">Cabins</h3>
        </div>
        <div
          className={`flex flex-col justify-center items-center cursor-pointer hover:border-b-2 border-[#a6a5a5] ${
            cate == "shops" ? "border-b-[2px] border-[red]" : ""
          }`}
          onClick={() => handleCategory("shops")}
        >
          <FaStore className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold text-[15px]">Shops</h3>
        </div>
      </div>
    </div>
  );
}

export default Nav;
