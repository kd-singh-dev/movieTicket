import React, { createContext, useEffect, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { makeGetAPICall } from "../Utils/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [token, setToken] = useState("");
  const [authStatus, setAuthStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const Navigate = useNavigate();

  useEffect(() => {
    getLoginStatus();
  }, []);

  const getLoginStatus = async () => {
    const token = reactLocalStorage.get("busAppAuthToken");

    if (token) {
      setIsLoading(true);
      const data = await makeGetAPICall("/api/user/", {
        Authorization: `Bearer ${token}`,
      });

      setToken(token);
      setUserDetails(data.user);
      if (data.user.roleId === 2) {
        Navigate("/admin");
        setIsAdmin(true);
      } else {
        Navigate("/");
      }
      setAuthStatus(true);
      setIsLoading(false);
    } else {
      Navigate("/login");
    }
  };

  const signOut = () => {
    setAuthStatus(false);
    setUserDetails({});
    setIsAdmin(false);
    reactLocalStorage.remove("busAppAuthToken");
    getLoginStatus();
  };

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        token,
        isLoading,
        userDetails,
        signOut,
        getLoginStatus,
        isAdmin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
