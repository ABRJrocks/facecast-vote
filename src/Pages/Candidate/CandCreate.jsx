import React, { useEffect, useState } from "react";
import Select from "react-select";
import { MajorAreasOfPakistan } from "../Constituency/AreasSelect";
import { religions, languages, affiliations, genders } from "./data";
import Alert from "../../Components/Alert";
import { createCandidate } from "../../utils/candidates";
import { uploadImage } from "../../utils/globals";
import { fetchSpecificFieldsFromCollectionWithOutFilter } from "../../utils/utilityFunctions";
import { partyRef } from "../../config/firebase";
import toast from "react-hot-toast";
const CandCreate = () => {
  const [name, setName] = useState("");
  // const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [constituency, setConstituency] = useState("");
  const [education, setEducation] = useState([
    { degree: "", institute: "", year: "" },
  ]);
  const [religion, setReligion] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [manifesto, setManifesto] = useState("");
  const [address, setAddress] = useState({
    houseNo: "",
    area: "",
    city: "",
    province: "",
  });
  const [assets, setAssets] = useState({});
  const [affiliation, setAffiliation] = useState([]); //party
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fieldsToRetrieve = ["name", "symbol_url"];
        const data = await fetchSpecificFieldsFromCollectionWithOutFilter(
          partyRef,
          fieldsToRetrieve
        );
        const formattedData = data.map((item) => ({
          value: item,
          label: item.name,
        }));
        setOptions(formattedData);
        console.log("Data fetched:", formattedData);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchData();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleLanguageChange = (selectedOption) => {
    console.log(selectedOption.value);
    setLanguage(selectedOption.value);
  };
  const handleGenderChange = (selectedOption) => {
    console.log(selectedOption.value);
    setGender(selectedOption.value);
  };

  const handleAffiliationChange = (selectedOption) => {
    console.log(selectedOption.value);
    setAffiliation(selectedOption.value);
  };
  const handleHouseNumberChange = (e) => {
    console.log(e.target.value);
    setAddress({ ...address, houseNo: e.target.value });
  };
  const handleAreaChange = (selectedOption) => {
    console.log(selectedOption.value);
    setAddress({ ...address, area: selectedOption.value });
  };
  const handleCityChange = (e) => {
    console.log(e.target.value);
    setAddress({ ...address, city: e.target.value });
  };
  const handleProvinceChange = (e) => {
    console.log(e.target.value);
    setAddress({ ...address, province: e.target.value });
  };

  const handleAddEducation = () => {
    setEducation([...education, { degree: "", institute: "", year: "" }]);
  };

  const handleRemoveEducation = (indexToRemove) => {
    setEducation(education.filter((_, index) => index !== indexToRemove));
  };

  const handleDegreeChange = (e, index) => {
    const updatedEducation = [...education];
    updatedEducation[index].degree = e.target.value;
    setEducation(updatedEducation);
  };

  const handleInstitutionChange = (e, index) => {
    const updatedEducation = [...education];
    updatedEducation[index].institute = e.target.value;
    setEducation(updatedEducation);
  };

  const handleYearChange = (e, index) => {
    const updatedEducation = [...education];
    updatedEducation[index].year = e.target.value;
    setEducation(updatedEducation);
  };

  const handleReligionChange = (selectedOption) => {
    console.log(selectedOption.value);
    setReligion(selectedOption.value);
  };
  const customStyles = {
    container: (provided) => ({
      ...provided,
      position: "relative", // Ensure the container has a relative position
    }),
  };

  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");
  // useEffect(() => {});
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("first");
    if (
      !name ||
      // !age ||
      !dob ||
      !gender ||
      !constituency ||
      !education ||
      !religion ||
      !phone ||
      !email ||
      !manifesto ||
      !address ||
      !assets ||
      !affiliation ||
      !language ||
      !image
    ) {
      setErrMessage("Please fill in all fields");
      setLoading(false);
      return;
    }
    console.log("first");
    const data = {
      name: name,
      dob: dob,
      gender: gender,
      constituency: constituency,
      education: education ? education : {},
      religion: religion,
      phone: phone,
      email: email,
      manifesto: manifesto,
      address: address ? address : {},
      assets: assets,
      affiliation: affiliation,
      language: language,
      imageURL: "",
    };
    try {
      console.log("first in try");
      const imagePath = await uploadImage(image, "images/candidates");
      console.log("Image Path", imagePath);
      if (!imagePath) {
        setErrMessage("Error Uploading Image");
        setLoading(false);
        return;
      }
      data.imageURL = imagePath;

      const candidate = await createCandidate(data);
      console.log("Candidate created with ID:", candidate);
      if (candidate) {
        console.log("first in try success");
        toast.success("Candidate Created Successfully");
        // setMessage("Candidate Created Successfully");
      } else {
        setErrMessage("Error Creating Candidate");
        toast.error("Error Creating Candidate");
      }
    } catch (error) {
      console.log("Error creating candidate", error);
      // setErrMessage("Error Creating Candidate");
      console.log("first in try catch");
      toast.error("Error Creating Candidate");
    } finally {
      console.log("first in try finally");
      setLoading(false);
    }
  };
  return (
    <section>
      {message && (
        <Alert
          message={message}
          type="success"
          dismissible={true}
          autoHideDelay={3000}
        />
      )}
      {errMessage && (
        <Alert
          message={errMessage}
          type="error"
          dismissible={true}
          autoHideDelay={3000}
        />
      )}
      <h1 className="text-3xl font-semibold text-gray-800 py-6">
        Create Candidate
      </h1>
      <hr className="py-4 border-t-2 border-gray-300" />

      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-gray-800 py-4">
          Personal Info
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          <div>
            <label
              htmlFor="name"
              className="text-lg font-normal text-slate-900"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="h-28 w-28 border-2 border-gray-300 rounded-md">
            {imageUrl && (
              <img
                className="rounded-full max-w-28"
                src={imageUrl}
                alt="Profile"
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              htmlFor="name"
              className="text-lg font-normal text-slate-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="text-lg font-normal text-slate-900"
            >
              Phone Number
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="dob" className="text-lg font-normal text-slate-900">
              Gender
            </label>
            <Select
              options={genders}
              value={gender}
              onChange={handleGenderChange}
              className="relative z-0"
            />
          </div>

          <div>
            <label htmlFor="dob" className="text-lg font-normal text-slate-900">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="dob" className="text-lg font-normal text-slate-900">
              Relegion
            </label>
            <Select
              options={religions}
              value={religion}
              onChange={handleReligionChange}
              className="relative z-0"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="text-lg font-normal text-slate-900"
            >
              Languages Spoken
            </label>
            <Select
              options={languages}
              value={language}
              onChange={handleLanguageChange}
              styles={customStyles}
            />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 py-4">Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="hno" className="text-lg font-normal text-slate-900">
              House Number
            </label>
            <input
              type="text"
              id="hno"
              name="hno"
              value={address.houseNo}
              onChange={handleHouseNumberChange}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="hno" className="text-lg font-normal text-slate-900">
              Area
            </label>
            <Select
              options={MajorAreasOfPakistan}
              value={address.area}
              onChange={handleAreaChange}
              styles={customStyles}
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="text-lg font-normal text-slate-900"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={address.city}
              onChange={handleCityChange}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="province"
              className="text-lg font-normal text-slate-900"
            >
              Province
            </label>
            <input
              type="text"
              id="province"
              name="province"
              value={address.province}
              onChange={handleProvinceChange}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 py-4">
          Education Info
        </h2>
        {education.map((edu, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div>
              <label
                htmlFor={`degree-${index}`}
                className="text-lg font-normal text-slate-900"
              >
                Degree
              </label>
              <input
                type="text"
                id={`degree-${index}`}
                name={`degree-${index}`}
                value={edu.degree}
                onChange={(e) => handleDegreeChange(e, index)}
                className="w-full p-1 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor={`institute-${index}`}
                className="text-lg font-normal text-slate-900"
              >
                Institute
              </label>
              <input
                type="text"
                id={`institute-${index}`}
                name={`institute-${index}`}
                value={edu.institute}
                onChange={(e) => handleInstitutionChange(e, index)}
                className="w-full p-1 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor={`year-${index}`}
                className="text-lg font-normal text-slate-900"
              >
                Year
              </label>
              <input
                type="date"
                id={`year-${index}`}
                name={`year-${index}`}
                value={edu.year}
                onChange={(e) => handleYearChange(e, index)}
                className="w-full p-1 border border-gray-300 rounded-md"
              />
            </div>
            {index > 0 && (
              <div className="flex justify-start py-4">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  onClick={() => handleRemoveEducation(index)}
                >
                  <span className="font-semibold text-base">Remove</span>
                </button>
              </div>
            )}
          </div>
        ))}
        <div className="flex justify-start py-4">
          <button
            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
            onClick={handleAddEducation}
          >
            <span className="font-semibold text-base">Add Education</span>
          </button>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 py-4">
          Political Info
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="const"
              className="text-lg font-normal text-slate-900"
            >
              Constituency
            </label>
            <input
              type="text"
              id="const"
              name="const"
              value={constituency}
              onChange={(e) => setConstituency(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="institute"
              className="text-lg font-normal text-slate-900"
            >
              Manifesto
            </label>
            <input
              type="text"
              id="manifesto"
              name="manifesto"
              value={manifesto}
              onChange={(e) => setManifesto(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="institute"
              className="text-lg font-normal text-slate-900"
            >
              Affiliation
            </label>
            <Select
              options={options}
              value={options.label}
              onChange={handleAffiliationChange}
              className="relative z-0"
            />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 py-4">
          Financial Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="institute"
              className="text-lg font-normal text-slate-900"
            >
              Total Assets Amount
            </label>
            <input
              type="number"
              id="total"
              name="total"
              value={assets}
              className="w-full p-1 border border-gray-300 rounded-md"
              onChange={(e) => setAssets(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-start py-4">
          <button className="bg-regal-blue-700 text-white px-3 py-2 drop-shadow-sm rounded-md hover:bg-regal-blue-700/80">
            <span className="font-semibold text-base">
              {loading ? "Creating Candidate..." : "Create Candidate"}
            </span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default CandCreate;
