import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const userDataContext = createContext();
function UserContext({ children }) {
  let serverUrl = "https://airbnb-backend-z8ns.onrender.com";
  let [getuserData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/user/getuser", {
        withCredentials: true,
      });
      console.log(result.data);
      setUserData(result.data);
    } catch (error) {
      console.log("get user data error   " + error);
    }
  };

  let value = { getuserData, setUserData, getUserData };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}

export default UserContext;
