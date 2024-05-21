import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
const Footer = () => {
  const { roles } = useAuth();
  const location = useLocation();
  const getVoterScreenLocation = location.pathname.includes("/voter/vote");
  console.log("location", getVoterScreenLocation);
  return (
    <footer className="flex flex-col items-center bg-regal-blue-700 text-center text-white">
      {roles === "voter" && !getVoterScreenLocation ? (
        <div className="container p-6">
          <div className="">
            <p className="flex items-center justify-center">
              <Link
                to="/voter/vote"
                className="inline-block rounded-full border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 hover:text-neutral-200 focus:border-neutral-300 focus:text-neutral-200 focus:outline-none focus:ring-0 active:border-neutral-300 active:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
              >
                Vote Now
              </Link>
            </p>
          </div>
        </div>
      ) : null}
      <div className="w-full bg-black/20 p-4 text-center">
        <p className="text-xs text-white">
          &copy; 2024 FaceCast Vote. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
