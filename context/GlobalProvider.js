import React, { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "../lib/Appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // getCurrentUser()
  //   .then((res) => console.log("getCurrentUser response:", res))
  //   .catch((err) => console.error("getCurrentUser error:", err));
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          console.log("Session check response:", res);
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
