import React from "react";
import { Outlet } from "react-router-dom";
import BreadCrumbs from "../Components/Utils/BreadCrumbs";
const ComplaintLayout = () => {
  return (
    <div className="">
      <main className="md:mx-auto max-w-5xl py-4 ">
        <BreadCrumbs />
        <Outlet />
      </main>
    </div>
  );
};

export default ComplaintLayout;
