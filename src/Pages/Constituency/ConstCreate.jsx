import React, { useState } from "react";
import Select from "react-select";
import { addDoc } from "firebase/firestore";
import { constituenciesRef } from "../../config/firebase.js";
import { MajorAreasOfPakistan } from "./AreasSelect.js";
import toast from "react-hot-toast";
const ConstCreate = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null); // Initialize to null
  const [selectedType, setSelectedType] = useState(null); // Initialize to null
  const [population, setPopulation] = useState("");
  const [voters, setVoters] = useState("");
  const [area, setArea] = useState("");
  const [ageDistribution, setAgeDistribution] = useState({
    young_adults: "",
    adults: "",
    middleaged: "",
    seniors: "",
  });
  const [genderDistribution, setGenderDistribution] = useState({
    male: "",
    female: "",
    other: "",
  });
  const [educationLevels, setEducationLevels] = useState({
    primary_school: "",
    secondary_school: "",
    higher_education: "",
  });
  const AssemblyOptions = [
    { value: "Punjab", label: "Punjab" },
    { value: "Sindh", label: "Sindh" },
    { value: "Balochistan", label: "Balochistan" },
    { value: "KPK", label: "KPK" },
    { value: "National", label: "National" },
  ];

  const handleRegionChange = (selectedOptions) => {
    console.log("Selected Region", selectedOptions.value);
    setSelectedRegion(selectedOptions.value);
  };

  const handleTypeChange = (selectedOptions) => {
    console.log("Selected Type", selectedOptions.value);
    setSelectedType(selectedOptions.value);
  };
  const data = {
    name: name,
    code: code,
    assembly: selectedType,
    region: selectedRegion,
    population: population,
    voters: voters,
    area: area,
    age_distribution: ageDistribution
      ? ageDistribution
      : { young_adults: "", adults: "", middleaged: "", seniors: "" },
    gender_distribution: genderDistribution
      ? genderDistribution
      : { male: "", female: "", other: "" },
    education_levels: educationLevels
      ? educationLevels
      : { primary_school: "", secondary_school: "", higher_education: "" },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Data to be added", data);
      const docRef = await addDoc(constituenciesRef,data);
      console.log("Document written with ID: ", docRef.id);
      toast.success("Constituency Created Successfully");
      // Reset form fields
      setName("");
      setCode("");
      setSelectedRegion("");
      setSelectedType("");
      setPopulation("");
      setVoters("");
      setArea("");
      setAgeDistribution({
        young_adults: "",
        adults: "",
        middleaged: "",
        seniors: "",
      });
      setGenderDistribution({
        male: "",
        female: "",
        other: "",
      });
      setEducationLevels({
        primary_school: "",
        secondary_school: "",
        higher_education: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error creating Constituency");
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold text-gray-800 py-6">
        Create Constituency
      </h1>
      <hr className="py-4 border-t-2 border-gray-300" />
      <form
        action=""
        onSubmit={handleSubmit}
        className=" mx-auto flex flex-col items-left gap-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="text-lg font-normal text-slate-900"
            >
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
            <label
              htmlFor="code"
              className="text-lg font-normal text-slate-900"
            >
              Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="assembly"
              className="text-lg font-normal text-slate-900"
            >
              Assembly
            </label>
            {/* Assuming AssemblyOptions is imported */}
            <Select
              options={AssemblyOptions}
              value={selectedType}
              onChange={handleTypeChange}
            />
          </div>
          <div>
            <label
              htmlFor="region"
              className="text-lg font-normal text-slate-900"
            >
              Region
            </label>
            {/* Assuming areas is imported */}
            <Select
              options={MajorAreasOfPakistan}
              value={selectedRegion}
              onChange={handleRegionChange}
            />
          </div>
          <div>
            <label
              htmlFor="population"
              className="text-lg font-normal text-slate-900"
            >
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
            <label
              htmlFor="voters"
              className="text-lg font-normal text-slate-900"
            >
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
            <label
              htmlFor="area"
              className="text-lg font-normal text-slate-900"
            >
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
          <div>
            <label
              htmlFor="young_adults"
              className="text-lg font-normal text-slate-900"
            >
              Young Adults
            </label>
            <input
              type="number"
              id="young_adults"
              name="young_adults"
              value={ageDistribution.young_adults}
              onChange={(e) =>
                setAgeDistribution({
                  ...ageDistribution,
                  young_adults: e.target.value,
                })
              }
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="adults"
              className="text-lg font-normal text-slate-900"
            >
              Adults
            </label>
            <input
              type="number"
              id="adults"
              name="adults"
              value={ageDistribution.adults}
              onChange={(e) =>
                setAgeDistribution({
                  ...ageDistribution,
                  adults: e.target.value,
                })
              }
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="middleaged"
              className="text-lg font-normal text-slate-900"
            >
              Middle-aged
            </label>
            <input
              type="number"
              id="middleaged"
              name="middleaged"
              value={ageDistribution.middleaged}
              onChange={(e) =>
                setAgeDistribution({
                  ...ageDistribution,
                  middleaged: e.target.value,
                })
              }
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="seniors"
              className="text-lg font-normal text-slate-900"
            >
              Seniors
            </label>
            <input
              type="number"
              id="seniors"
              name="seniors"
              value={ageDistribution.seniors}
              onChange={(e) =>
                setAgeDistribution({
                  ...ageDistribution,
                  seniors: e.target.value,
                })
              }
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="male"
              className="text-lg font-normal text-slate-900"
            >
              Male
            </label>
            <input
              type="number"
              id="male"
              name="male"
              value={genderDistribution.male}
              onChange={(e) =>
                setGenderDistribution({
                  ...genderDistribution,
                  male: e.target.value,
                })
              }
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="female"
              className="text-lg font-normal text-slate-900"
            >
              Female
            </label>
            <input
              type="number"
              id="female"
              name="female"
              value={genderDistribution.female}
              onChange={(e) =>
                setGenderDistribution({
                  ...genderDistribution,
                  female: e.target.value,
                })
              }
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="other"
              className="text-lg font-normal text-slate-900"
            >
              Other
            </label>
            <input
              type="number"
              id="other"
              name="other"
              value={genderDistribution.other}
              onChange={(e) =>
                setGenderDistribution({
                  ...genderDistribution,
                  other: e.target.value,
                })
              }
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="primary_school"
              className="text-lg font-normal text-slate-900"
            >
              Primary School
            </label>
            <input
              type="number"
              id="primary_school"
              name="primary_school"
              value={educationLevels.primary_school}
              onChange={(e) =>
                setEducationLevels({
                  ...educationLevels,
                  primary_school: e.target.value,
                })
              }
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="secondary_school"
              className="text-lg font-normal text-slate-900"
            >
              Secondary School
            </label>
            <input
              type="number"
              id="secondary_school"
              name="secondary_school"
              value={educationLevels.secondary_school}
              onChange={(e) =>
                setEducationLevels({
                  ...educationLevels,
                  secondary_school: e.target.value,
                })
              }
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="higher_education"
              className="text-lg font-normal text-slate-900"
            >
              Higher Education
            </label>
            <input
              type="number"
              id="higher_education"
              name="higher_education"
              value={educationLevels.higher_education}
              onChange={(e) =>
                setEducationLevels({
                  ...educationLevels,
                  higher_education: e.target.value,
                })
              }
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-start py-4">
          <button className="bg-regal-blue-700 text-white px-3 py-2 drop-shadow-sm rounded-md hover:bg-regal-blue-700/80">
            <span className="font-semibold text-base">Create Constituency</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default ConstCreate;
