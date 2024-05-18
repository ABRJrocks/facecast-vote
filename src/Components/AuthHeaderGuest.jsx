import React from "react";
import { useState, useRef } from "react";
import { Transition } from "@headlessui/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import DropDown from "./DropDown";
import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

const AuthHeaderUser = () => {
  //   const { logOut, currUser } = useAuth();
  //   const username = currUser ? currUser.email.split("@") : [null];
  const [isOpen, setIsOpen] = useState(false);
  const mobileNavRef = useRef(null);

  //   const menuItemsAdminApp = [
  //     {
  //       label: "Elections",
  //       to: "/elections",
  //     },
  //     {
  //       label: "Candidates",
  //       to: "/candidate",
  //     },
  //     {
  //       label: "Parties",
  //       to: "/party",
  //     },
  //     {
  //       label: "Constituency",
  //       to: "/const",
  //     },
  //   ];
  return (
    <header className="bg-regal-blue-700 text-regal-blue-50 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 md:py-2">
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/facecast-no-bg.png"}
              alt="logo"
              className="w-28"
            />
          </Link>

          <nav className="hidden lg:flex lg:items-center space-x-6 text-base font-medium">
            <Link to="/" className="hover:opacity-90">
              Home
            </Link>
            <Link to="/results" className="hover:opacity-90">
              Results
            </Link>
            {/* <Link to="vote" className="hover:opacity-90">
              Vote
            </Link> */}

            {/* <DropDown title={"More"} menuItems={menuItemsAdminApp} /> */}
            <div className="flex gap-2">
              {/* <DropDown
                title={username}
                type={"userAccount"}
                menuItems={menuItemsUser}
              /> */}
              <button className=" text-regal-blue-50 px-3 py-2 drop-shadow-sm rounded-md hover:opacity-90">
                <Link to="/signin">Sign In</Link>
              </button>
              <button className="bg-regal-blue-900 text-regal-blue-50 px-3 py-2 drop-shadow-sm rounded-md hover:bg-regal-blue-900/80">
                <Link to="/signup">Sign Up</Link>
              </button>
            </div>
          </nav>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-regal-blue-50 hover:text-white hover:bg-regal-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            {isOpen ? (
              <AiOutlineClose className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <AiOutlineMenu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {(ref) => (
          <nav
            ref={mobileNavRef}
            className="lg:hidden bg-regal-blue-700 text-regal-blue-50 py-4"
            aria-label="mobile-menu"
          >
            <div className="flex flex-col items-center text-start space-y-4">
              <Link to="/" className="hover:opacity-90">
                Home
              </Link>
              <Link to="/results" className="hover:opacity-90">
                Results
              </Link>

              {/* <DropDown title={"More"} menuItems={menuItemsAdminApp} /> */}
              <div className="flex gap-2">
                {/* <DropDown
                  title={"Muhammd Saad"}
                  type={"userAccount"}
                  menuItems={menuItemsUser}
                /> */}
                <button className=" text-regal-blue-50 px-3 py-2 drop-shadow-sm rounded-md hover:opacity-90">
                  <Link to="/signin">Sign In</Link>
                </button>
                <button className="bg-regal-blue-900 text-regal-blue-50 px-3 py-2 drop-shadow-sm rounded-md hover:bg-regal-blue-900/80">
                  <Link to="/signup">Sign Up</Link>
                </button>
              </div>
            </div>
          </nav>
        )}
      </Transition>
    </header>
  );
};

export default AuthHeaderUser;
