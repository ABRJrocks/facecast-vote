import React from "react";
import { Outlet } from "react-router-dom";
import BreadCrumbs from "../Components/Utils/BreadCrumbs";
const ProfileLayout = () => {
  return (
    <div>
      <main className="mx-auto max-w-5xl py-4">
        <BreadCrumbs />
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileLayout;
