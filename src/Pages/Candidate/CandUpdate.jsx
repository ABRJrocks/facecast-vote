
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { getCandidatesbyId, updateCandidates } from "../../utils/candidates";
import { uploadImage } from "../../utils/globals";
import { fetchSpecificFieldsFromCollectionWithOutFilter } from "../../utils/utilityFunctions";
import { partyRef } from "../../config/firebase";
import Alert from "../../Components/Alert";

const CandUpdate = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [options, setOptions] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleAffiliationChange = (selectedOption) => {
    setAffiliation(selectedOption.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCandidatesbyId(id);
        if (!data) {
          console.log("No Data Found.");
          return;
        }
        setSuccess("Candidate found Successfully");
        console.log("Candidate data for update:", data);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setHouseNumber(data.address.houseNo);
        setArea(data.address.area);
        setCity(data.address.city);
        setProvince(data.address.province);
        setAffiliation(data.affiliation);
      } catch (error) {
        console.error("Error fetching candidate", error);
        setError("Error fetching Candidate");
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchOptions = async () => {
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
        console.log("Options fetched:", formattedData);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = {
        name,
        email,
        phone,
        houseNumber,
        area,
        city,
        province,
        affiliation,
        imageURL: "",
      };

      const imagePath = await uploadImage(image, "images/candidates");
      console.log("Image Path", imagePath);
      data.imageURL = imagePath;

      const success = await updateCandidates(id, data);
      if (success) {
        setSuccess("Candidate updated successfully!");
        console.log("Candidate updated successfully!");
        // Reset form fields
        setHouseNumber("");
        setArea("");
        setCity("");
        setProvince("");
        setName("");
        setEmail("");
        setPhone("");
        setAffiliation("");
        setImage(null);
        setImageUrl("");
      } else {
        setError("Error updating Candidate");
      }
    } catch (error) {
      console.error("Error updating candidate: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      {success && <Alert message={success} type="success" dismissible autoHideDelay={3000} />}
      {error && <Alert message={error} type="error" dismissible autoHideDelay={3000} />}
      <h1 className="text-3xl font-semibold text-gray-800 py-6">Update Candidate</h1>
      <hr className="py-4 border-t-2 border-gray-300" />
      <form onSubmit={handleSubmit} className="mx-auto flex flex-col items-left gap-4">
        <h3 className="text-xl font-semibold text-gray-800 border-b-2 py-1 border-stone-200">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          <div>
            <label htmlFor="image" className="text-lg font-normal text-slate-900">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="h-28 w-28 border-2 border-gray-300 rounded-md">
            {imageUrl && <img className="rounded-full max-w-28" src={imageUrl} alt="Profile" />}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="text-lg font-normal text-slate-900">Name</label>
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
            <label htmlFor="email" className="text-lg font-normal text-slate-900">Email</label>
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
            <label htmlFor="phone" className="text-lg font-normal text-slate-900">Phone Number</label>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 border-b-2 py-1 border-stone-200">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="houseNumber" className="text-lg font-normal text-slate-900">House Number</label>
            <input
              type="text"
              id="houseNumber"
              name="houseNumber"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="area" className="text-lg font-normal text-slate-900">Area</label>
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
            <label htmlFor="city" className="text-lg font-normal text-slate-900">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="province" className="text-lg font-normal text-slate-900">Province</label>
            <input
              type="text"
              id="province"
              name="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 border-b-2 py-1 border-stone-200">Political Affiliation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="affiliation" className="text-lg font-normal text-slate-900">Affiliation</label>
            <Select
              options={options}
              value={options.find(option => option.value === affiliation)}
              onChange={handleAffiliationChange}
              className="relative z-0"
            />
          </div>
        </div>
        <div className="flex justify-start py-4">
          <button
            className="bg-regal-blue-700 text-white px-3 py-2 drop-shadow-sm rounded-md hover:bg-regal-blue-700/80"
            type="submit"
          >
            <span className="font-semibold text-base">{loading ? "Loading..." : "Update Candidate"}</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default CandUpdate;
