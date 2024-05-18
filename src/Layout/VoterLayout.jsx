import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCollections } from "../utils/globals";
import { electionsRef } from "../config/firebase";
import { generatePDF } from "../utils/pdgGen";
import Select from "react-select";
import { SlEnvolopeLetter } from "react-icons/sl";
import { IoMdArrowDropright } from "react-icons/io";
import ComplaintModal from "../Pages/ComplaintModal";
import { getProfileByEmail } from "../utils/profile";
import { MdOutlineHowToVote } from "react-icons/md";
import { FaRegHandPointRight } from "react-icons/fa6";
import { LiaBoxOpenSolid } from "react-icons/lia";

const DataLine = ({ value, label, path }) => {
  return (
    <div className="flex border-b border-gray-200 py-4 justify-between">
      <span className=" text-gray-900">{value}</span>
      <Link to={path} className="text-regal-blue-600 ">
        <label className="flex flex-row items-center gap-5">
          {label}
          <FaRegHandPointRight />
        </label>
      </Link>
    </div>
  );
};

const VoterLayout = () => {
  const { currUser } = useAuth();
  const [profile, setProfile] = useState([]);
  const [titles, setTitles] = useState([]);
  const [electionsData, setElectionsData] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const getElectionTitles = async () => {
    try {
      const electionData = await getCollections(electionsRef);
      const titlesArray = electionData.map((election) => ({
        value: election,
        label: election.title,
      }));
      setTitles(titlesArray);
    } catch (error) {
      console.error("Error fetching election data:", error);
    }
  };

  useEffect(() => {
    getElectionTitles();
  }, []);

  useEffect(() => {
    console.log("elections", electionsData);
  }, [electionsData]);
  const handleSelectChange = (selectedOption) => {
    setSelectedElection(selectedOption);
    generatePDF(selectedOption.value);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getProfileByEmail(currUser.email);
        setProfile(userProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [currUser.email]);

  // complain
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="text-xl font-semibold text-left sm:text-xl mb-2 py-10 text-slate-900">
        Welcome
        <span className="font-bold pl-3">
          {profile.fname + " " + profile.lname}
        </span>
      </h1>
      <hr className="py-2 border-t-2 border-gray-300" />
      <ComplaintModal isOpen={isOpen} closeModal={closeModal} />
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
        <div className=" h-44 flex items-center flex-col min justify-center border-2 border-gray-100 rounded-md p-5">
          <SlEnvolopeLetter className="h-20 w-20 text-blue-500 mb-2" />
          <div className="flex gap-1 flex-col">
            <ul>
              <li className=" w-full px-4   py-1 hover:bg-gray-100 hover:border-lg">
                <Link to="/voter/complaint" className="text-regal-blue-700">
                  <div className="flex items-center justify-between">
                    <span className="text-regal-blue-700">View Complaints</span>
                    <IoMdArrowDropright />
                  </div>
                </Link>
              </li>
              <li className=" w-full px-4   py-1 hover:bg-gray-100 hover:border-lg">
                <div
                  onClick={openModal}
                  className="flex items-center justify-between text-regal-blue-700"
                >
                  <span className="text-regal-blue-700">File Complaints</span>
                  <IoMdArrowDropright />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className=" h-44 flex items-center flex-col min justify-center border-2 border-gray-100 rounded-md p-5">
          <MdOutlineHowToVote className="h-20 w-20 text-blue-500 mb-2" />
          <Select
            options={titles}
            value={selectedElection}
            onChange={handleSelectChange}
            className="w-60"
          />
        </div>
        <div className=" h-44 flex items-center flex-col min justify-center border-2 border-gray-100 rounded-md p-5">
          <LiaBoxOpenSolid className="h-20 w-20 text-blue-500 mb-2" />
          <div className="flex gap-1 flex-col">
            <ul>
              <li className=" w-full px-4   py-1 hover:bg-gray-100 hover:border-lg">
                <Link to="/voter/vote" className="text-regal-blue-700">
                  <div className="flex items-center justify-between">
                    <span className="text-regal-blue-700">
                      Vote Your Candidate
                    </span>
                    <IoMdArrowDropright />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <DataLine value="Results" label="View Results" path="/voter/results" />
    </main>
  );
};

export default VoterLayout;
