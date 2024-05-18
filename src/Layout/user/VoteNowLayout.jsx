import React from "react";
import BreadCrumbs from "../../Components/Utils/BreadCrumbs";
import { Outlet } from "react-router-dom";
const VoteNowLayout = () => {
  return (
    <main className="mx-auto max-w-5xl py-4">
      <BreadCrumbs />
      <Outlet />
    </main>
  );
};

export default VoteNowLayout;
