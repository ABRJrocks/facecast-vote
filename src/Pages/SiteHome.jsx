import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCollections } from "../utils/globals";
import { electionsRef, candidatesRef, partyRef } from "../config/firebase";
import { generatePDF, generatePDF1 } from "../utils/pdgGen";
import Select from "react-select";
import { IoMdArrowDropright } from "react-icons/io";

const VoterLayout = () => {
  const { currUser } = useAuth();
  const [party, setParty] = useState([]);
  const [titles, setTitles] = useState([]);
  const [candidate, setCandidate] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
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
  const getParties = async () => {
    try {
      const partyData = await getCollections(partyRef);
      console.log("partyData", partyData);
      setParty(partyData);
    } catch (error) {
      console.error("Error fetching election data:", error);
    }
  };
  const getCandidaetsTitles = async () => {
    try {
      const candidateData = await getCollections(candidatesRef);
      const titlesArray = candidateData.map((data) => ({
        value: data,
        label: data.name,
      }));

      setCandidate(titlesArray);
    } catch (error) {
      console.error("Error fetching election data:", error);
    }
  };

  useEffect(() => {
    getElectionTitles();
  }, []);
  useEffect(() => {
    getCandidaetsTitles();
  }, []);
  useEffect(() => {
    getParties();
  }, []);
  const advantages = [
    {
      id: 1,
      title: "Accessibility",
    },
    {
      id: 2,
      title: "Convenience",
    },
    {
      id: 3,
      title: "Cost-effectiveness",
    },
    {
      id: 4,
      title: "Accuracy and Security",
    },
    {
      id: 5,
      title: "Increased Voter Engagement",
    },
    {
      id: 6,
      title: "Efficiency in Vote Counting",
    },
    {
      id: 7,
      title: "Flexibility in Voting Hours",
    },
    {
      id: 8,
      title: "Enhanced Transparency",
    },
  ];
  return (
    <div>
      <div className=" max-w-6xl mx-auto">
        <section class="text-gray-600 body-font">
          <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Pakistan's first online voting system
              </h1>
              <p class="mb-8 leading-relaxed">
                Vote from anywhere in the world, your right is just a click away
                you can cange pakistan. Cote now to make a better tomorrow
              </p>
              <div class="flex w-full md:justify-start justify-center items-end">
                <button class="inline-flex text-white bg-regal-blue-700 border-0 py-2 px-6 focus:outline-none hover:bg-regal-blue-800 rounded text-lg">
                  <Link to="/signin">Get Started</Link>
                </button>
              </div>
            </div>
            <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img
                class="object-cover object-center rounded"
                alt="hero"
                src="https://dummyimage.com/720x600"
              />
              {/* <img class="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"> */}
            </div>
          </div>
        </section>
        {/*  */}
        <hr className=" border-2 " />
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24 mx-auto">
            <div class="text-center mb-20">
              <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                Advantages of an Online Voting Portal
              </h1>
              <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                Discover how these advantages transform traditional voting
                methods, making democracy more inclusive, efficient, and
                environmentally friendly.
              </p>
            </div>
            <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
              {advantages &&
                advantages.map((data) => (
                  <div key={data.id} class="p-2 sm:w-1/2 w-full">
                    <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        class="text-regal-blue-500 w-6 h-6 flex-shrink-0 mr-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                      </svg>
                      <span class="title-font font-medium">
                        {data.title || "Advantage"}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <button class="flex mx-auto mt-16 text-white bg-regal-blue-700 border-0 py-2 px-8 focus:outline-none hover:bg-regal-blue-800 rounded text-lg">
              <Link to="/signin"> Vote Now</Link>
            </button>
          </div>
        </section>
        <hr className=" border-2  " />
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24 mx-auto">
            <div class="text-center mb-20">
              <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                A Great Leader once said
              </h1>
            </div>
            <div class="xl:w-1/2 mx-auto text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="inline-block w-8 h-8 text-gray-400 mb-8"
                viewBox="0 0 975.036 975.036"
              >
                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
              </svg>
              <p class="leading-relaxed text-lg">
                The first thing that I want to tell you is this, that you should
                not be influenced by any political pressure, by any political
                party or individual politician. If you want to raise the
                prestige and greatness of Pakistan, you must not fall a victim
                to any pressure, but do your duty as servants to the people and
                the State, fearlessly and honestly. You should have no hand in
                supporting this political party or that political party, this
                political leader or that political leader – this is not your
                business. Whichever government is formed according to the
                constitution, and whoever happens to be the prime minister or
                minister coming into power in the ordinary constructional
                course, your duty is not only to serve that government loyally
                and faithfully, but, at the same time, fearlessly, maintaining
                your high reputation, your prestige, your honour and the
                integrity of your service. If you will start with that
                determination, you will make a great contribution to the
                building up of Pakistan, of your conception and our dream – a
                glorious State and one of the greatest nations in the world.
              </p>
              <span class="inline-block h-1 w-10 rounded bg-regal-blue-700 mt-8 mb-6"></span>
              <h2 class="text-gray-900 font-medium title-font tracking-wider text-sm">
                Muhammad Ali Jinnah
              </h2>
              <p class="text-gray-500">Founder of Pakistan</p>
            </div>
          </div>
        </section>
        {/*  */}
        <hr className="border-2 " />
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col text-center w-full mb-20">
              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Registered Political Parties
              </h1>
            </div>
            <section className="max-w-6xl mx-auto">
              <div class=" flex flex-wrap -m-4">
                {party &&
                  party.map((data) => (
                    <div class="lg:w-1/3 sm:w-1/2 p-4">
                      <div class="flex relative">
                        <div className="bg-stone-900">
                          <img
                            alt="gallery"
                            class="absolute inset-0 min-w-60 max-w-full h-full object-cover object-center "
                            src={
                              data.symbol_url
                                ? data.symbol_url
                                : "https://dummyimage.com/600x360"
                            }
                          />
                        </div>
                        <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100 rounded-md">
                          <h2 class="tracking-widest text-sm title-font font-medium text-regal-blue-500 mb-1">
                            {data.leader || "Party Leader"}
                          </h2>
                          <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                            {data.name || "Party Name"}
                          </h1>
                          <p class="leading-relaxed">
                            {data.manifesto || "Manifesto"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </section>

        {/* <Footer /> */}
      </div>
      <div className="mt-5 bg-regal-blue-700 w-full">
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-16 mx-auto">
            <div class="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
              <h1 class="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-100">
                Submit complaints hassle-free, ensuring your voice is heard
                promptly.
              </h1>
              <button class="flex-shrink-0 text-white bg-regal-blue-900 border-0 py-2 px-8 focus:outline-none hover:bg-regal-blue-900/80 rounded text-lg mt-10 sm:mt-0">
                <Link to="signin">Submit Complaints</Link>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VoterLayout;
