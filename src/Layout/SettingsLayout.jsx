import React from "react";
import { Outlet } from "react-router-dom";
import BreadCrumbs from "../Components/Utils/BreadCrumbs";

const SettingsLayout = () => {
  return (
    <div className="">
      <main className="lg:mx-auto lg:max-w-5xl lg:py-4 md:px-6 sm:px-4">
        <BreadCrumbs />
        <Outlet />
      </main>
    </div>
  );
};

export default SettingsLayout;
