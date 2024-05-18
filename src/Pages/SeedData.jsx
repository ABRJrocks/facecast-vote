import React from "react";
import Select from "react-select";
import Instructions from "../Components/Instructions";
import { useEffect, useState } from "react";
import { electionsRef, usersRef } from "../config/firebase";
import {
  fetchSpecificFieldsFromCollection,
  fetchSpecificFieldsFromCollectionWithOutFilter,
} from "../utils/utilityFunctions";
import { writeBatch, addDoc } from "firebase/firestore";
import { db, userVoteRef } from "../config/firebase";
import toast from "react-hot-toast";

const SeedData = () => {
  const [selectedElection, setSelectedElection] = useState(null);
  const [options, setOptions] = useState([]);
  const [constituencies, setConstituencies] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [users, setUsers] = useState([]);
  const [elections, setElections] = useState([]);
  const [seeding, setSeeding] = useState(false);
  const [batchSize, setBatchSize] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fieldsToRetrieve = ["constituencies", "title"];
        const Data = await fetchSpecificFieldsFromCollectionWithOutFilter(
          electionsRef,
          fieldsToRetrieve
        );
        console.log("Data new", Data); // Update constituencies state
        const formattedData = Data.map((item) => ({
          value: item,
          label: item.title,
        }));

        console.log("Formatted  Data", formattedData);
        // setElections(Data);
        setOptions(formattedData);
        console.log("Election Options", options);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };
    console.log("Selected Assembly", selectedElection);

    fetchData();
  }, []);
  const handleElectionChange = (selectedOption) => {
    console.log("Selected Election", selectedOption.value.id);
    setElections(selectedOption.value.id);
    setSelectedElection(selectedOption.value);
    // Call fetchConstituencies here
    fetchConstituencies(selectedOption.value);
  };

  const fetchConstituencies = async (selectedOption) => {
    // console.log("Selected Option", elections[0].id);
    // console.log("Selected Option", selectedOption.value);
    if (selectedOption) {
      // Update constituencies state
      setConstituencies(selectedOption.constituencies);
      getCandidates(selectedOption.constituencies);
      console.log("Selected Constituencies", selectedOption.constituencies);
    }
  };

  const getCandidates = async (constituencies) => {
    const allCandidates = constituencies.flatMap((constituency) =>
      constituency.candidates.map((candidate) => ({
        id: candidate.id,
        name: candidate.name,
      }))
    );

    // Update candidates state
    setCandidates(allCandidates);
    console.log("Selected Candidates", allCandidates);
  };
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const filterField = "roles";
        const filterValue = "voter";
        const fieldsToRetrieve = ["roles"];

        const Data = await fetchSpecificFieldsFromCollection(
          usersRef,
          fieldsToRetrieve,
          filterField,
          filterValue
        );
        console.log("Data new users", Data); // Update constituencies state
        const formattedData = Data.map((item) => ({
          value: item,
          label: item.roles,
        }));
        console.log("Formatted  Data Users", formattedData);
        setUsers(Data);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };
    fetchUsers();
  }, []);

  const generaterandomConsitituency = () => {
    const randomConstituency =
      constituencies[Math.floor(Math.random() * constituencies.length)];
    return randomConstituency.const_id;
  };
  const generaterandomCandidate = () => {
    const randomCandidate =
      candidates[Math.floor(Math.random() * candidates.length)];
    return randomCandidate.id;
  };
  //   const generateRandomUserData = () => {
  //     const randomUser = users[Math.floor(Math.random() * users.length)];
  //     return randomUser.id;
  //   };
  const votes = [];
  const generateRandomVote = () => {
    console.log("Election", elections);
    for (let i = 0; i < 250; i++) {
      // const electionId = generateRandomId(12); // Adjust the length as needed
      const vote = {
        election_id: elections,
        candidate_id: generaterandomCandidate(),
        constituency_id: generaterandomConsitituency(),
        user_id: generateRandomId(12),
      };
      votes.push(vote);
    }
  };
  let percentage;
  const seedingData7 = async () => {
    try {
      let batch = writeBatch(db);
     
      const totalVotes = votes.length;
      let progress = 0;

      for (let i = 0; i < totalVotes; i += batchSize) {
        const batchVotes = votes.slice(i, i + batchSize);
        batchVotes.forEach((data) => {
          const docRef = addDoc(userVoteRef, data);
        });

        await batch.commit();
        progress += batchVotes.length;

        // Calculate progress percentage
        percentage = (progress / totalVotes) * 100;
        console.log(`Seeding progress: ${percentage.toFixed(2)}%`);

        // Reset batch for next iteration
        batch = writeBatch(db);
      }

      console.log("Data Seeding Successful");
      toast.success("Data Seeding Successful");
    } catch (error) {
      console.log(error);
      toast.error("Data Seeding Failed");
    }
  };

  const generateRandomId = (length) => {
    let id = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return id;
  };
  const handleSeedData = () => {
    console.log("Constituency", generaterandomConsitituency());
    console.log("Candidate", generaterandomCandidate());
    // console.log("user", generateRandomUserData());
    generateRandomVote();
    setSeeding(true);
    seedingData7();
    setSeeding(false);
  };

  return (
    <div>
      <main>
        <section className="py-6 max-w-6xl mx-auto ">
          <h2 className="text-2xl font-semibold text-left sm:text-2xl mb-6 text-slate-900">
            Seed Sample Data
          </h2>
          <div className="">
            <h1 className="pb-4 text-xl font-medium">Instructions</h1>
            <Instructions
              stepNumber={1}
              description="This Feature is only for testing purposes."
            />
            <Instructions
              stepNumber={2}
              description="Will be used to seed sample data into the database. to test possible application scenarios."
            />
          </div>
          <div className="mt-6 grid  grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 border-t-2 py-4 border-gray-200">
            <div className="flex justify-between">
              <label
                htmlFor="name1"
                className="text-lg font-normal text-slate-900"
              >
                Select Election
              </label>
              <Select
                className="w-60"
                options={options}
                value={selectedElection}
                onChange={handleElectionChange}
              />
            </div>
            <div className="">
              <label
                htmlFor="name1"
                className="text-lg font-normal text-slate-900"
              >
                Total Votes
              </label>
              <input
                type="number"
                id="batch"
                name="batch"
                value={batchSize}
                onChange={(e) => setBatchSize(e.target.value)}
                className="w-60 mx-6 p-1 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <button
                onClick={handleSeedData}
                className="bg-regal-blue-500 hover:bg-regal-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {seeding
                  ? `Seeding Data... ${percentage.toFixed(2)}%`
                  : "Seed Data"}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SeedData;
