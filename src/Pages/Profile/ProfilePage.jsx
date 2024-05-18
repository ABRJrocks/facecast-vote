import React, { useState, useEffect } from "react";
import BreadCrumbs from "../../Components/Utils/BreadCrumbs";
import DataLine from "../../Components/DataLine";
import { useAuth } from "../../context/AuthContext";
import { getProfileByEmail } from "../../utils/profile";
const ProfilePage = () => {
  const { currUser } = useAuth();
  const [profile, setProfile] = useState({});
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
  }, []); // Add currUser as a dependency to useEffect
  return (
    <div class="">
      <div class="p-8 bg-white shadow mt-12 ">
        <div class="grid grid-cols-1 md:grid-cols-3 ">
          <div></div>
          <div class="relative">
            <div className="w-48 h-48 border-2 mx-auto rounded-full absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-regal-blue-50">
              {profile.image ? (
                <img
                  className="h-44 w-44 rounded-full"
                  src={profile.image}
                  alt={profile.fname + "Profile Image"}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 bg-regal-blue-700 rounded-full"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
          <div></div>
        </div>

        <div class="mt-32 text-center border-b pb-10 max-w-xl mx-auto">
          <div class="bg-white overflow-hidden rounded-md border">
            <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
              <div class="sm:divide-y sm:divide-gray-200">
                <div class="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <span class="text-sm font-medium text-gray-500">
                    Full name
                  </span>
                  <span class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {profile.fname + " " + profile.lname}
                  </span>
                </div>
                <div class="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <span class="text-sm font-medium text-gray-500">
                    Email address
                  </span>
                  <span class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {profile.email}
                  </span>
                </div>
                <div class="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <span class="text-sm font-medium text-gray-500">
                    Phone number
                  </span>
                  <span class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {profile.phone}
                  </span>
                </div>
                <div class="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <span class="text-sm font-medium text-gray-500">CNIC</span>
                  <span class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {profile.cnic}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div class="mt-12 flex flex-col justify-center">
          <p class="text-gray-600 text-center font-light lg:px-16">
            An artist of considerable range, Ryan — the name taken by
            Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
            records all of his own music, giving it a warm, intimate feel with a
            solid groove structure. An artist of considerable range.
          </p>
          <button class="text-indigo-500 py-2 px-4  font-medium mt-4">
            Show more
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ProfilePage;
