import React, { useState } from "react";
import BreadCrumbs from "../Components/Utils/BreadCrumbs";
import { Outlet, Link } from "react-router-dom";
const PartyLayout = () => {
  return (
    <div>
      <SubMenu />
      <main className="mx-auto max-w-5xl py-4">
        <BreadCrumbs />
        <Outlet />
      </main>
    </div>
  );
};
const SubMenu = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  return (
    <nav className="bg-gray-600">
      <div className="max-w-5xl mx-auto">
        <ul className="flex gap-6 py-1">
          <li>
            <Link
              to="/admin/party"
              className={`text-white hover:text-gray-200 ${
                selectedItem === "Home" ? "font-bold" : ""
              }`}
              onClick={() => handleItemClick("Home")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="create"
              className={`text-white hover:text-gray-200 ${
                selectedItem === "Create Election" ? "font-bold" : ""
              }`}
              onClick={() => handleItemClick("Create Election")}
            >
              Create
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default PartyLayout;
