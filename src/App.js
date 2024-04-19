import React from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";
// import RegisterScreen from "./Screeens/RegisterScreen";
// // import AdminHomeScreen from './Screeens/Admin/AdminHomeScreen'
// import OpenElections from "./Screeens/OpenElections";
// import ElectionsScreen from "./Screeens/ElectionsScreen";

const App = () => {
  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto">
        <Outlet />
      </main>
      <Footer />

      {/* <AdminHomeScreen/> */}
    </div>
  );
};

export default App;
