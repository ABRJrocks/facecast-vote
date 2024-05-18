import React, { useState, useEffect, useRef } from "react";
// import BreadCrumbs from "../../Components/Utils/BreadCrumbs";
import { useAuth } from "../../context/AuthContext";
import { setDoc, doc } from "firebase/firestore";
import Alert from "../../Components/Alert";
import Select from "react-select";
import { options } from "./data/options";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { BsPersonBoundingBox } from "react-icons/bs";
import { faceio } from "../../config/faceio";
import { permissionRef } from "../../config/firebase";
import { getCollectionById } from "../../utils/globals";
import toast from "react-hot-toast";
const SignupLayout = () => {
  const navigate = useNavigate();
  const [signUpAllowed, setSignUpAllowed] = useState(true);
  const { signUp, PERMISSIONSID } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [cnic, setCninc] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [area, setArea] = useState("");
  const [faceData, setFaceData] = useState("");

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // const [elections, setElections] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const permissionData = await getCollectionById(
        permissionRef,
        PERMISSIONSID
      );
      if (permissionData) {
        setSignUpAllowed(permissionData.signUp);
      }
    };
    fetchPermissions();
  }, []);

  const handleFaceRegister = async () => {
    try {
      let response = await faceio.enroll({
        locale: "auto",
        payload: {
          email: email,
        },
      });
      // .catch((errCode) => {
      //   handleError(errCode);
      // });

      console.log(` Unique Facial ID: ${response.facialId}
      Enrollment Date: ${response.timestamp}
      Gender: ${response.details.gender}
      Age Approximation: ${response.details.age}`);

      console.log(response, "responce face id");
      setFaceData(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleProvinceChange = (selectedOption) => {
    setProvince(selectedOption);
    setCity(""); // Reset city when province changes
    setArea(""); // Reset area when province changes
  };

  const handleCityChange = (selectedOption) => {
    setCity(selectedOption);
    setArea(""); // Reset area when city changes
  };

  const handleAreaChange = (selectedOption) => {
    setArea(selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while sign-up is in progress
    setErrorMessage(""); // Clear any previous error message
    setSuccessMessage(""); // Clear any previous success message

    try {
      const userCredential = await signUp(email, password);
      const user = userCredential.user;
      if (user) {
        const userId = user.uid; // This is the unique identifier (ID) of the newly created user
        console.log("User ID:", userId);
        // Add user data to Firestore database
        await setDoc(doc(db, "users", userId), {
          email,
          fname,
          lname,
          cnic,
          phone,
          address: {
            province: province.label || "",
            city: city.label || "",
            area: area.label || "",
          },
          faceData: faceData,
          roles: "voter",
        });
        toast.success("User Created Successfully");

        // Clear email and password fields after successful signup

        setCninc("");
        setFname("");
        setLname("");
        setPhone("");
      }
      setEmail("");
      setPassword("");
      // Display success message to the user
      setSuccessMessage("Sign-up successful!");
      navigate("/voter");
    } catch (error) {
      // Handle signup errors
      console.error("Error during sign-up:", error);

      // Check error code and display appropriate error message
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMessage(
            "Email is already in use. Please choose a different email."
          );
          break;
        case "auth/weak-password":
          setErrorMessage(
            "The password is too weak. Please choose a stronger password."
          );
          break;
        // Add more cases for other error codes as needed
        default:
          setErrorMessage(
            "An error occurred during sign-up. Please try again later."
          );
          break;
      }

      // You can set error state here if needed
    } finally {
      setLoading(false); // Set loading to false after sign-up attempt is completed
    }
  };

  return (
    <div>
      <main>
        <section class="p-6 max-w-2xl mx-auto ">
          <h2 class="text-2xl font-semibold text-left sm:text-3xl mb-6 text-slate-900">
            Signup
          </h2>
          {errorMessage && (
            <Alert
              message={errorMessage}
              type="error"
              dismissible={true}
              autoHideDelay={5000}
            />
          )}
          {successMessage && (
            <Alert
              message={successMessage}
              type="success"
              dismissible={true}
              autoHideDelay={5000}
            />
          )}
          {signUpAllowed ? (
            <form
              action=""
              onSubmit={handleSubmit}
              class=" mx-auto flex flex-col items-left gap-4"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
               
                <div>
                  <label for="name1" class="text-lg font-normal text-slate-900">
                    First name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    class="w-full p-1 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label for="name1" class="text-lg font-normal text-slate-900">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    class="w-full p-1 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label for="name1" class="text-lg font-normal text-slate-900">
                    ID number (cninc)
                  </label>
                  <input
                    type="number"
                    id="cnic"
                    name="cnic"
                    value={cnic}
                    onChange={(e) => setCninc(e.target.value)}
                    class="w-full p-1 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label for="name1" class="text-lg font-normal text-slate-900">
                    Phone
                  </label>
                  <input
                    type="phone"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    class="w-full p-1 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label for="name1" class="text-lg font-normal text-slate-900">
                    Province
                  </label>
                  <Select
                    value={province}
                    onChange={handleProvinceChange}
                    options={options}
                    placeholder="Select Province"
                  />
                </div>

                <div>
                  <label for="name1" class="text-lg font-normal text-slate-900">
                    City
                  </label>
                  <Select
                    value={city}
                    onChange={handleCityChange}
                    options={province.cities}
                    placeholder="Select City"
                  />
                </div>

                {city && city.areas && (
                  <div>
                    <label
                      htmlFor="area"
                      className="text-lg font-normal text-slate-900"
                    >
                      Area
                    </label>
                    <Select
                      value={area}
                      onChange={handleAreaChange}
                      options={city.areas.map((area) => ({
                        label: area,
                        value: area,
                      }))}
                      placeholder="Select Area"
                    />
                  </div>
                )}
                <div>
                  <label for="name1" class="text-lg font-normal text-slate-900">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    class="w-full p-1 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label
                    for="password"
                    class="text-lg font-normal text-slate-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    class="w-full p-1 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="faceauth"
                    className="text-lg font-normal text-slate-900"
                  >
                    Face Authentication
                  </label>
                  <div
                    onClick={handleFaceRegister}
                    className="w-full cursor-pointer p-2 border border-gray-300 rounded-md flex items-center gap-2"
                  >
                    <BsPersonBoundingBox />
                    <span className="ml-2">Authenticate</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between mt-4">
                <button
                  type="submit"
                  class={`bg-regal-blue-700 text-white p-2 px-4 rounded-md w-max text-center ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign up"}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-red-200 p-4 flex items-center rounded-md">
              <p className="text-red-800 font-semibold">
                Registeration is temproarily disabled Come back later
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

// function handleError(errCode) {
//   // Handle error here
//   // Log all possible error codes during user interaction..
//   // Refer to: https://faceio.net/integration-guide#error-codes
//   // for a detailed overview when these errors are triggered.
//   const fioErrs = faceio.fetchAllErrorCodes();
//   switch (errCode) {
//     case fioErrs.PERMISSION_REFUSED:
//       console.log("Access to the Camera stream was denied by the end user");
//       break;
//     case fioErrs.NO_FACES_DETECTED:
//       console.log(
//         "No faces were detected during the enroll or authentication process"
//       );
//       break;
//     case fioErrs.UNRECOGNIZED_FACE:
//       console.log("Unrecognized face on this application's Facial Index");
//       break;
//     case fioErrs.MANY_FACES:
//       console.log("Two or more faces were detected during the scan process");
//       break;
//     case fioErrs.FACE_DUPLICATION:
//       console.log(
//         "User enrolled previously (facial features already recorded). Cannot enroll again!"
//       );
//       break;
//     case fioErrs.MINORS_NOT_ALLOWED:
//       console.log("Minors are not allowed to enroll on this application!");
//       break;
//     case fioErrs.PAD_ATTACK:
//       console.log(
//         "Presentation (Spoof) Attack (PAD) detected during the scan process"
//       );
//       break;
//     case fioErrs.FACE_MISMATCH:
//       console.log(
//         "Calculated Facial Vectors of the user being enrolled do not matches"
//       );
//       break;
//     case fioErrs.WRONG_PIN_CODE:
//       console.log("Wrong PIN code supplied by the user being authenticated");
//       break;
//     // ...
//     // Refer to the boilerplate at: https://gist.github.com/symisc/34203d2811a39f2a871373abc6dd1ce9
//     // for the list of all possible error codes.
//   }
// }

export default SignupLayout;
