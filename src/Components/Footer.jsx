import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Footer = () => {
  const { roles } = useAuth();
  return (
    <footer class="flex flex-col items-center bg-regal-blue-700 text-center text-white">
      {roles === "voter" ? (
        <div class="container p-6">
          <div class="">
            <p class="flex items-center justify-center">
              <Link
                to="/voter/vote"
                class="inline-block rounded-full border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 hover:text-neutral-200 focus:border-neutral-300 focus:text-neutral-200 focus:outline-none focus:ring-0 active:border-neutral-300 active:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
              >
                Vote Now
              </Link>
            </p>
          </div>
        </div>
      ) : null}
      <div class="w-full bg-black/20 p-4 text-center">
        <p class="text-xs text-white">&copy; 2024 All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
