import React, { useState } from "react";
import { createParty } from "../../utils/parties";
import { uploadImage } from "../../utils/globals";
import Alert from "../../Components/Alert";
import toast from "react-hot-toast";
const PartyCreate = () => {
  const [name, setName] = useState("");
  const [acronym, setAcronym] = useState("");
  const [leader, setLeader] = useState("");
  const [ideology, setIdeology] = useState("");
  const [founded, setFounded] = useState("");
  const [headQuaters, setHeadQuaters] = useState("");
  const [manifesto, setManifesto] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [symbol, setSymbol] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Store the image file in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: name,
      acronym: acronym,
      leader: leader,
      ideology: ideology,
      founded: founded,
      headQuaters: headQuaters,
      manifesto: manifesto,
      email: email,
      phone: phone,
      address: address,
      symbol: symbol,
      symbol_url: "",
    };
    try {
      if (image) {
        const url = await uploadImage(image, "images/party");

        console.log(url);
        data.symbol_url = url;
        setImageUrl(url);
        console.log("Image URL:", url);
      }

      const docRef = await createParty(data);
      console.log("Party created with ID:", docRef);
      if (!docRef) {
        console.log("Error creating Party");
        setError("Error creating Party");
      }
      toast.success("Party Created Successfully");
    } catch (error) {
      console.log(error);

      toast.error("Error creating Party");
    }
    setLoading(false);
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold text-gray-800 py-6">
        Create Party
      </h1>
      <hr className="py-4 border-t-2 border-gray-300" />
      {success && (
        <Alert
          message={success}
          type="success"
          dismissible={true}
          autoHideDelay={3000}
        />
      )}
      {error && (
        <Alert
          message={error}
          type="error"
          dismissible={true}
          autoHideDelay={3000}
        />
      )}
      <form
        action=""
        onSubmit={handleSubmit}
        className=" mx-auto flex flex-col items-left gap-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
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
              Symbol
            </label>
            <input
              type="text"
              id="symbol"
              name="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label for="name1" className="text-lg font-normal text-slate-900">
              Symbol Image
            </label>
            <input
              type="file"
              id="img"
              name="img"
              onChange={handleImageChange}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label for="name1" className="text-lg font-normal text-slate-900">
              Acronym
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={acronym}
              onChange={(e) => setAcronym(e.target.value)}
              maxLength={10}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <label for="leader" className="text-lg font-normal text-slate-900">
              Leader Name
            </label>
            <input
              type="text"
              id="leader"
              name="leader"
              value={leader}
              onChange={(e) => setLeader(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              for="ideology"
              className="text-lg font-normal text-slate-900"
            >
              Ideology
            </label>
            <input
              type="text"
              id="ideology"
              name="ideology"
              value={ideology}
              onChange={(e) => setIdeology(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label for="date" className="text-lg font-normal text-slate-900">
              Foundation Year
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={founded}
              onChange={(e) => setFounded(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label for="hq" className="text-lg font-normal text-slate-900">
              Head Quaters
            </label>
            <input
              type="text"
              id="hq"
              name="hq"
              value={headQuaters}
              onChange={(e) => setHeadQuaters(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label for="name1" className="text-lg font-normal text-slate-900">
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
        </div>
        <h3 className="text-xl font-semibold text-gray-800 py-2">
          Contact Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <label for="email" className="text-lg font-normal text-slate-900">
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
            <label for="name1" className="text-lg font-normal text-slate-900">
              Phone
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
            <label for="name1" className="text-lg font-normal text-slate-900">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-start py-4">
          <button className="bg-regal-blue-700 text-white px-3 py-2 drop-shadow-sm rounded-md hover:bg-regal-blue-700/80">
            <span className="font-semibold text-base">
              {loading ? "Creating..." : "Create Party"}
            </span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default PartyCreate;
