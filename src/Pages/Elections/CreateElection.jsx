import React, { useState, useEffect } from "react";
import Select from "react-select";
import { createElections } from "../../utils/elections";
import {
  candidatesRef,
  constituenciesRef,
  partyRef,
} from "../../config/firebase";
import {
  fetchSpecificFieldsFromCollection,
  fetchSpecificFieldsFromCollectionWithOutFilter,
} from "../../utils/utilityFunctions";
import toast  from "react-hot-toast";
const CreateElection = () => {
  const [title, setTitle] = useState("");

  const [selectedType, setSelectedType] = useState("");

  const [startDateTime, setStartDataTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [selectedAssembly, setSelectedAssembly] = useState(null);
  const [selectedConstituencies, setSelectedConstituencies] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [constituencyOptions, setConstituencyOptions] = useState([]);
  const [candidateOptions, setCandidateOptions] = useState([]);
  useEffect(() => {
    const fetchConstituencies = async () => {
      try {
        const fieldsToRetrieve = ["name", "region", "assembly"];
        const filterField = "assembly";
        const filterValue = selectedAssembly.value; // Filter documents where the assembly field is selectedAssembly
        const partyData = await fetchSpecificFieldsFromCollection(
          constituenciesRef,
          fieldsToRetrieve,
          filterField,
          filterValue
        );
        console.log("Data new", partyData); // Update constituencies state
        const formattedPartyData = partyData.map((party) => ({
          value: party,
          label: party.name,
        }));
        console.log("Formatted Party Data", formattedPartyData);
        setConstituencyOptions(formattedPartyData);
        // constituencyOptions = formattedPartyData;
        console.log("Constituency Options", constituencyOptions);
      } catch (error) {
        console.error("Error fetching constituencies:", error);
      }
    };
    console.log("Selected Assembly", selectedAssembly);

    if (selectedAssembly) {
      fetchConstituencies(); // Call fetchConstituencies when selectedAssembly changes
    }
  }, [selectedAssembly]);
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const fieldsToRetrieve = ["name", "affiliation",];
        // Filter documents where the assembly field is selectedAssembly
        const partyData = await fetchSpecificFieldsFromCollectionWithOutFilter(
          candidatesRef,
          fieldsToRetrieve
        );
        console.log("Data new", partyData); // Update constituencies state
        const formattedPartyData = partyData.map((party) => ({
          value: party,
          label: party.name,
        }));
        console.log("Formatted Party Data", formattedPartyData);
        // console.log("Formatted Party Data", formattedPartyData);
        setCandidateOptions(formattedPartyData);
        // constituencyOptions = formattedPartyData;
        console.log("Constituency Options", candidateOptions);
      } catch (error) {
        console.error("Error fetching constituencies:", error);
      }
    };
    console.log("Selected Assembly", selectedAssembly);

    if (selectedAssembly) {
      fetchCandidates(); // Call fetchConstituencies when selectedAssembly changes
    }
  }, [selectedConstituencies]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleAssemblyChange = (selectedOptions) => {
    setSelectedAssembly(selectedOptions);
  };

  const handleConstituencyChange = (selectedOptions) => {
    setSelectedConstituencies(selectedOptions);
  };

  const handleCandidateChange = (index, selectedOptions) => {
    const updatedCandidates = [...selectedCandidates];
    updatedCandidates[index] = selectedOptions;
    setSelectedCandidates(updatedCandidates);
  };
  const AssemblyOptions = [
    { value: "National Assembly", label: "National Assembly" },
    { value: "Punjab", label: "Punjab Assembly" },
    { value: "Sindh", label: "Sindh Assembly" },
    // Add more options as needed
  ];

  const data = {
    title,
    selectedType,
    startDateTime,
    endDateTime,
    selectedAssembly,
    selectedConstituencies,
    selectedCandidates,
  };
  const getPartyImagebyName = async (name) => {
    try {
      const data = await fetchSpecificFieldsFromCollection(
        partyRef,
        ["symbol_url"],
        "name",
        name
      );

      console.log("Party Image Data", data);
      return data;
    } catch (error) {
      console.error("Error fetching party image:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPartyImagebyName("Pakistan Tehreek-e-Insaf");
      console.log("Party Image Data", data);
    };
    fetchData();
  }, []);

  const electionData = {
    title: data.title,
    type: data.selectedType,
    start_at: data.startDateTime,
    end_at: data.endDateTime,
    created_at: new Date().toISOString(),
    constituencies: data.selectedConstituencies
      ? data.selectedConstituencies.map((constituency, index) => {
          return {
            const_id: constituency.value.id, // You may use a unique ID here
            name: constituency.value.name,
            candidates: data.selectedCandidates[index]
              ? data.selectedCandidates[index].map((candidate) => {
                  return {
                    id: candidate.value.id, // You may use a unique ID here
                    name: candidate.value.name,
                    partyImg: candidate.value.affiliation.symbol_url,
                  };
                })
              : [],
          };
        })
      : [],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(false); // Reset error state

    try {
      console.log("Election Data", electionData);
      const id = await createElections(electionData);
      console.log("Election Created Successfully", id);
      toast.success("Election created successfully!");
      
      // Clear form fields after successful submission
      setTitle("");
      setStartDataTime("");
      setEndDateTime("");
      setSelectedAssembly([]);
      setSelectedCandidates([]);
      setSelectedConstituencies([]);
      setSelectedType("");
    } catch (error) {
      setError(true);
      console.error("Error creating election:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold text-gray-800 py-6">
        Create Election
      </h1>
      <hr className="py-4 border-t-2 border-gray-300" />
      <form
        action=""
        onSubmit={handleSubmit}
        className="mx-auto flex flex-col items-left gap-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name1"
              className="text-lg font-normal text-slate-900"
            >
              Title
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="name1"
              className="text-lg font-normal text-slate-900"
            >
              Assembly
            </label>
            <Select
              options={AssemblyOptions}
              value={selectedAssembly}
              onChange={handleAssemblyChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name1"
              className="text-lg font-normal text-slate-900"
            >
              Start at
            </label>
            <input
              type="datetime-local"
              id="datetime"
              name="date-time"
              value={startDateTime}
              onChange={(e) => setStartDataTime(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="name1"
              className="text-lg font-normal text-slate-900"
            >
              End at
            </label>
            <input
              type="datetime-local"
              id="datetime"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              name="endtime"
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name1"
              className="text-lg font-normal text-slate-900"
            >
              Type
            </label>
            <select
              name="type"
              id="type"
              className="w-full p-1 border border-gray-300 rounded-md"
              value={selectedType}
              onChange={handleTypeChange}
            >
              <option value="">Select an option</option>
              <option value="general">General</option>
              <option value="by-election">By-Election</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="name1" className="text-lg font-normal text-slate-900">
            Constituencies
          </label>
          <Select
            isMulti
            options={constituencyOptions}
            value={selectedConstituencies}
            onChange={handleConstituencyChange}
          />
        </div>
        {selectedConstituencies.map((constituency, index) => (
          <div key={index}>
            <label
              htmlFor={`candidates-${index}`}
              className="text-lg font-normal text-slate-900"
            >
              Candidates for {constituency.label}
            </label>
            <Select
              isMulti
              id={`candidates-${index}`}
              options={candidateOptions}
              onChange={(selectedOptions) =>
                handleCandidateChange(index, selectedOptions)
              }
            />
          </div>
        ))}
        <div className="flex justify-start py-4">
          <button className="bg-regal-blue-700 text-white px-3 py-2 drop-shadow-sm rounded-md hover:bg-regal-blue-700/80">
            <span className="font-semibold text-base">
              Create Election {loading ? "...." : ""} {error ? "(Error!)" : ""}
            </span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateElection;
