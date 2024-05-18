import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { areas } from "./data";
import {
  getConstituenciesbyId,
  updateConstituency,
} from "../../utils/constituency";
import toast from "react-hot-toast";

const ConstUpdate = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [population, setPopulation] = useState("");
  const [voters, setVoters] = useState("");
  const [area, setArea] = useState("");
  const { id } = useParams();

  const handleRegionChange = (selectedOptions) => {
    console.log("Selected Region:", selectedOptions.value);
    setSelectedRegion(selectedOptions.value);
  };

  useEffect(() => {
    const fetchConstituency = async () => {
      try {
        const data = await getConstituenciesbyId(id);
        if (!data) {
          console.log("No Data Found.");
          return;
        }
        console.log("Constituency data for update:", data);
        setName(data.name);
        setCode(data.code);
        setSelectedRegion(data.region);
        setPopulation(data.population);
        setVoters(data.voters);
        setArea(data.area);
      } catch (error) {
        console.error("Error fetching constituency", error);
      }
    };
    fetchConstituency();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        name: name,
        code: code,
        region: selectedRegion,
        population: population,
        voters: voters,
        area: area,
      };

      const success = await updateConstituency(id, data);
      if (success) {
        console.log("Constituency updated successfully!");
        toast.success("Constituency updated successfully!");
        // Reset form fields
        setArea("");
        setCode("");
        setName("");
        setPopulation("");
        setSelectedRegion("");
        setVoters("");
      }
    } catch (error) {
      console.error("Error updating constituency: ", error);
      toast.error("Error updating constituency!");
    }
  };
  return (
    <section>
      <h1 className="text-3xl font-semibold text-gray-800 py-6">
        Update Constituency
      </h1>
      <hr className="py-4 border-t-2 border-gray-300" />
      <form
        action=""
        onSubmit={handleSubmit}
        className=" mx-auto flex flex-col items-left gap-4"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <label for="name1" className="text-lg font-normal text-slate-900">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label for="name1" className="text-lg font-normal text-slate-900">
              Code
            </label>
            <input
              type="code"
              id="code"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <label for="name1" className="text-lg font-normal text-slate-900">
              Region
            </label>
            <Select
              options={areas}
              value={selectedRegion}
              onChange={handleRegionChange}
            />
          </div>
          <div>
            <label for="name1" className="text-lg font-normal text-slate-900">
              Population
            </label>
            <input
              type="number"
              id="population"
              name="population"
              value={population}
              onChange={(e) => setPopulation(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label for="name1" className="text-lg font-normal text-slate-900">
              Total Voters
            </label>
            <input
              type="number"
              id="voters"
              name="voters"
              value={voters}
              onChange={(e) => setVoters(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label for="name1" className="text-lg font-normal text-slate-900">
              Total Area
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-start py-4">
          <button className="bg-regal-blue-700 text-white px-3 py-2 drop-shadow-sm rounded-md hover:bg-regal-blue-700/80">
            <span className="font-semibold text-base">Update Constituency</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default ConstUpdate;
