import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const listingDataContext = createContext();

function ListingContext({ children }) {
  let navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [frontendImage1, setFrontendImage1] = useState(null);
  let [frontendImage2, setFrontendImage2] = useState(null);
  let [frontendImage3, setFrontendImage3] = useState(null);
  let [backendImage1, setBackendImage1] = useState(null);
  let [backendImage2, setBackendImage2] = useState(null);
  let [backendImage3, setBackendImage3] = useState(null);
  let [rent, setRent] = useState("");
  let [city, setCity] = useState("");
  let [landmark, setLandmark] = useState("");
  let [adding, setAdding] = useState(false);
  let [updating, setupdating] = useState(false);
  let [bookingpop, setBookingpop] = useState(false);
  let [deleting, setDeleting] = useState(false);
  let [category, setcategory] = useState("");
  let [listingData, setListingData] = useState([]);
  let [list, setList] = useState([]);
  let [cardDetail, setCardDetail] = useState([]);
  let [serachData, setSearchData] = useState([]);

  const handleAddListing = async (e) => {
    console.log("handleAddListing called");
    if (e && e.preventDefault) e.preventDefault();
    try {
      setAdding(true);
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image1", backendImage1);
      formData.append("image2", backendImage2);
      formData.append("image3", backendImage3);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", category);

      let result = await axios.post(serverUrl + "/api/listing/add", formData, {
        withCredentials: true,
      });
      console.log(result.data);
      toast.success("Adding successfully");
      setAdding(false);
      navigate("/");
      setTitle("");
      setDescription("");
      setFrontendImage1(null);
      setFrontendImage2(null);
      setFrontendImage3(null);
      setBackendImage1(null);
      setBackendImage2(null);
      setBackendImage3(null);
      setCity("");
      setRent("");
      setLandmark("");
      setcategory("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);

      setAdding(false);
      navigate("/");
      console.log("handle Addlisting error ");
    }
  };

  const handleViewCard = async (id) => {
    try {
      let result = await axios.get(serverUrl + `/api/listing/findlist/${id}`, {
        withCredentials: true,
      });
      console.log(result.data);
      setCardDetail(result.data);
      navigate("/viewcard");
    } catch (error) {
      console.log(error);
      console.log("handle view card ");
    }
  };
  const getListing = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/listing/get", {
        withCredentials: true,
      });
      setListingData(result.data);
      setList(result.data);
    } catch (error) {
      console.log("get Listing error" + error);
    }
  };

  const handleSearch = async (data) => {
    try {
      let result = await axios.get(
        serverUrl + `/api/listing/search?query=${data}`
      );

      setSearchData(result.data);
    } catch (error) {
      setSearchData(null);
      console.log(error);
    }
  };

  let value = {
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
    adding,
    setAdding,
    handleAddListing,
    listingData,
    setListingData,
    getListing,
    list,
    setList,
    handleViewCard,
    cardDetail,
    setCardDetail,
    updating,
    setupdating,
    deleting,
    setDeleting,
    bookingpop,
    setBookingpop,
    serachData,
    handleSearch,
  };

  useEffect(() => {
    getListing();
  }, [adding, updating, deleting]);
  return (
    <listingDataContext.Provider value={value}>
      {children}
    </listingDataContext.Provider>
  );
}

export default ListingContext;
