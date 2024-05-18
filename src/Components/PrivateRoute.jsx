import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { currUser, roles } = useAuth();
  console.log("currUser", currUser);
  console.log("user roles", roles);
  return currUser && roles ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
