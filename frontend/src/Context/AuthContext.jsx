import React, { useState } from "react";
import { createContext } from "react";

export const authDataContext = createContext();
function AuthContext({ children }) {
  let serverUrl = "https://airbnb-backend-z8ns.onrender.com";
  let [loading, setLoading] = useState(false);
  let value = {
    serverUrl,
    loading,
    setLoading,
  };

  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  );
}

export default AuthContext;
