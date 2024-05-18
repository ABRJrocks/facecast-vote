import React from "react";
import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProfileByEmail } from "../utils/profile";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import CryptoWalletModal from "./CryptoWalletModal";
import toast from "react-hot-toast";

const AuthHeaderUser = () => {
  const { logOut, currUser } = useAuth();
  // const username = currUser ? currUser.email.split("@") : [null];
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState([]);
  const mobileNavRef = useRef(null);
  const handleLogout = () => {
    try {
      logOut();
      console.log("Logged Out");
      toast.success("Logged Out Successfully");
    } catch (error) {
      console.log("Error Loging out", error);
    }
  };
  const menuItemsUser = [
    {
      label: "Profile",
      to: "/voter/profile",
    },
    {
      label: "Update Profile",
      to: "/voter/profile/update",
    },
  ];
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("curr user email", currUser.email);
        const userProfile = await getProfileByEmail(currUser.email);
        setProfile(userProfile); // Set profile state with fetched data
        console.log("user profile", userProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile(); // Call fetchProfile function inside useEffect
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
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
      <CryptoWalletModal isOpen={isModalOpen} onClose={closeModal} />
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
            <Link to="/voter" className="hover:opacity-90">
              Home
            </Link>
            <Link to="/voter/vote" className="hover:opacity-90">
              Vote
            </Link>
            <Link to="/voter/results" className="hover:opacity-90">
              Results
            </Link>

            {/* <DropDown title={"More"} menuItems={menuItemsAdminApp} /> */}
            <div className="flex gap-4">
              <button onClick={openModal}>
                <MdOutlineAccountBalanceWallet className="h-6 w-6" />
              </button>
              <DropDown
                title={profile.fname}
                type={"userAccount"}
                menuItems={menuItemsUser}
              />

              <button
                onClick={handleLogout}
                className="bg-regal-blue-900 text-regal-blue-50 px-3 py-2 drop-shadow-sm rounded-md hover:bg-regal-blue-900/80"
              >
                Logout
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
              <div className="flex flex-row gap-6 items-center">
                <button onClick={openModal}>
                  <MdOutlineAccountBalanceWallet className="h-6 w-6" />
                </button>
                <AiOutlineClose className="block h-6 w-6" aria-hidden="true" />
              </div>
            ) : (
              <div className="flex flex-row gap-6 items-center">
                <button onClick={openModal}>
                  <MdOutlineAccountBalanceWallet className="h-6 w-6" />
                </button>
                <AiOutlineMenu className="block h-6 w-6" aria-hidden="true" />
              </div>
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
              <Link to="/voter" className="hover:opacity-90">
                Home
              </Link>
              <Link to="/voter/vote" className="hover:opacity-90">
                Vote
              </Link>
              <Link to="/voter/results" className="hover:opacity-90">
                Results
              </Link>
              {/* <DropDown title={"More"} menuItems={menuItemsAdminApp} /> */}
              <div className="flex gap-2">
                <DropDown
                  title={profile.fname}
                  type={"userAccount"}
                  menuItems={menuItemsUser}
                />
                <button
                  onClick={handleLogout}
                  className="bg-regal-blue-900 text-regal-blue-50 px-3 py-2  rounded-md hover:bg-regal-blue-900/80"
                >
                  Logout
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
