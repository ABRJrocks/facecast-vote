import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import AppHeader from "../Components/AppHeader";
import { Toaster } from "react-hot-toast";
const RootLayout = () => {
  return (
    <div>
      {/* <Header /> */}
      <AppHeader />
      <Toaster />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
