import React, { useState, useEffect } from "react";
import Alert from "../../Components/Alert";
import { useAuth } from "../../context/AuthContext";
import { getProfileByEmail, updateProfileByEmail } from "../../utils/profile";
import { uploadImage } from "../../utils/globals";
import toast from "react-hot-toast";

const ProfileUpdate = () => {
  const { currUser } = useAuth();
  const [profile, setProfile] = useState({});
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getProfileByEmail(currUser.email);
        setProfile(userProfile);
        setFname(userProfile.fname);
        setLname(userProfile.lname);
        setCnic(userProfile.cnic);
        setPhone(userProfile.phone);
        setImageUrl(userProfile.image);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [currUser.email]);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
  
    try {
      if (currUser) {
        let updatedProfile = {
          email: currUser.email,
          fname,
          lname,
          cnic,
          phone,
          image: imageUrl, // Use the existing image URL if no new image is uploaded
        };
  
        if (image) {
          // If a new image is uploaded, upload it and update the profile with the new image path
          const imagePath = await uploadImage(image, "/user/profile");
          console.log("Image Path", imagePath);
          updatedProfile = { ...updatedProfile, image: imagePath };
        }
  
        await updateProfileByEmail(currUser.email, updatedProfile);
        setSuccessMessage("Profile updated successfully!");
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error during profile update:", error);
      setErrorMessage("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <main>
        <section className="p-6 max-w-4xl mx-auto ">
          <h2 className="text-2xl font-semibold text-left sm:text-3xl mb-6 text-slate-900">
            Update Profile
          </h2>
          {errorMessage && <Alert message={errorMessage} type="error" />}
          {successMessage && <Alert message={successMessage} type="success" />}
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex flex-col items-left gap-4"
          >
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fname"
                  className="text-lg font-normal text-slate-900"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded-md"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label
                  htmlFor="lname"
                  className="text-lg font-normal text-slate-900"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded-md"
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <label
                  htmlFor="cnic"
                  className="text-lg font-normal text-slate-900"
                >
                  ID number (CNIC)
                </label>
                <input
                  type="number"
                  id="cnic"
                  name="cnic"
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded-md"
                  placeholder="Enter your CNIC number"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="text-lg font-normal text-slate-900"
                >
                  Phone
                </label>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded-md"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                className={`bg-regal-blue-700 text-white p-2 px-4 rounded-md w-max text-center ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ProfileUpdate;
