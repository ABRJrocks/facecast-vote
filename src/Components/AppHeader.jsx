import React from "react";
import { useAuth } from "../context/AuthContext";
import AuthHeaderUser from "./AuthHeaderUser";
import AuthHeaderGuest from "./AuthHeaderGuest";
import AuthHeaderAdmin from "./AuthHeaderAdmin";
const AppHeader = () => {
  const { currUser, roles } = useAuth();

  return (
    <>
      {currUser ? (
        roles === "admin" ? (
          <AuthHeaderAdmin userData={currUser} />
        ) : roles === "voter" ? (
          <AuthHeaderUser userData={currUser} />
        ) : (
          <AuthHeaderGuest />
        )
      ) : (
        <AuthHeaderGuest />
      )}
    </>
  );
};

export default AppHeader;
