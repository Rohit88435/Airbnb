import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { ToastContainer } from "react-toastify";
import { userDataContext } from "./Context/UserContext";
import ListingPage1 from "./Pages/ListingPage1";
import ListingPage2 from "./Pages/ListingPage2";
import ListingPage3 from "./Pages/ListingPage3";
import MyListing from "./Pages/MyListing";
import ViewCard from "./Pages/ViewCard";
import MyBookings from "./Pages/MyBookings";
import Booked from "./Pages/Booked";
function App() {
  let { getuserData, setUserData } = useContext(userDataContext);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/listing1"
          element={
            getuserData == null ? <Navigate to={"/"} /> : <ListingPage1 />
          }
        />
        <Route
          path="/listing2"
          element={
            getuserData == null ? <Navigate to={"/"} /> : <ListingPage2 />
          }
        />
        <Route
          path="/listing3"
          element={
            getuserData == null ? <Navigate to={"/"} /> : <ListingPage3 />
          }
        />
        <Route
          path="/mylisting"
          element={getuserData == null ? <Navigate to={"/"} /> : <MyListing />}
        />
        <Route
          path="/viewcard"
          element={getuserData == null ? <Navigate to={"/"} /> : <ViewCard />}
        />
        <Route
          path="/mybookings"
          element={getuserData == null ? <Navigate to={"/"} /> : <MyBookings />}
        />
        <Route
          path="/booked"
          element={getuserData == null ? <Navigate to={"/"} /> : <Booked />}
        />
      </Routes>
    </>
  );
}

export default App;
