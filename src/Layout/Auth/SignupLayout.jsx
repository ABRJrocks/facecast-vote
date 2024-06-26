import React, { useState, useEffect, useRef } from "react";
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
import { FaInfoCircle, FaCheck, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SignupLayout = () => {
  const navigate = useNavigate();
  const [signUpAllowed, setSignUpAllowed] = useState(true);
  const { signUp, PERMISSIONSID } = useAuth();

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const emailRef = useRef();
  const pwdRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState("");

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [cnic, setCninc] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [area, setArea] = useState("");
  const [faceData, setFaceData] = useState("");

  const [loading, setLoading] = useState(false);
  const [faceEnrolled, setFaceEnrolled] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

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
  }, [PERMISSIONSID]);

  const isValidCNIC = (cnic) => {
    // CNIC should be 13 digits long
    if (cnic.length !== 13) {
      return false;
    }

    // CNIC should contain only numbers
    if (!/^\d+$/.test(cnic)) {
      return false;
    }

    // Other CNIC validation rules specific to Pakistani CNIC can be added here

    return true;
  };

  const isValidField = (field) => {
    // Check if the field is a string before calling trim
    if (typeof field === "string") {
      return field.trim() !== "";
    }
    return false;
  };

  const handleFaceRegister = async () => {
    try {
      let response = await faceio.enroll({
        locale: "auto",
        payload: {
          email: email,
        },
      });
      console.log(`Unique Facial ID: ${response.facialId}
      Enrollment Date: ${response.timestamp}
      Gender: ${response.details.gender}
      Age Approximation: ${response.details.age}`);

      setFaceData(response);
      setFaceEnrolled(true);
    } catch (error) {
      console.log(error);
      setFaceEnrolled(false);
      setErrorMessage("Face enrollment failed. Please try again.");
    }
  };

  const handleProvinceChange = (selectedOption) => {
    setProvince(selectedOption);
    setCity("");
    setArea("");
  };

  const handleCityChange = (selectedOption) => {
    setCity(selectedOption);
    setArea("");
  };

  const handleAreaChange = (selectedOption) => {
    setArea(selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidCNIC(cnic)) {
      setErrorMessage("Please enter a valid CNIC.");
      return;
    }

    if (
      !isValidField(fname) ||
      !isValidField(lname) ||
      !isValidField(phone) ||
      !isValidField(province) ||
      !isValidField(city) ||
      !isValidField(area)
    ) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    if (!faceEnrolled) {
      setErrorMessage("Face enrollment is required to sign up.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const userCredential = await signUp(email, password);
      const user = userCredential.user;
      if (user) {
        const userId = user.uid;
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

        setCninc("");
        setFname("");
        setLname("");
        setPhone("");
      }
      setEmail("");
      setPassword("");
      setSuccessMessage("Sign-up successful!");
      navigate("/voter");
    } catch (error) {
      console.error("Error during sign-up:", error);
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
        default:
          setErrorMessage(
            "An error occurred during sign-up. Please try again later."
          );
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main>
        <section className="p-6 max-w-2xl mx-auto ">
          <h2 className="text-2xl font-semibold text-left sm:text-3xl mb-6 text-slate-900">
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
              className="mx-auto flex flex-col items-left gap-4"
            >
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
                  />
                </div>
                <div>
                  <label
                    htmlFor="cnic"
                    className="text-lg font-normal text-slate-900"
                  >
                    ID number (cnic)
                  </label>
                  <input
                    type="number"
                    id="cnic"
                    name="cnic"
                    value={cnic}
                    onChange={(e) => setCninc(e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="text-lg font-normal text-slate-900"
                  >
                    Phone
                  </label>
                  <PhoneInput
                    country={"pk"}
                    onlyCountries={["pk"]}
                    value={phone}
                    onChange={(value) => setPhone(value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="province"
                    className="text-lg font-normal text-slate-900"
                  >
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
                  <label
                    htmlFor="city"
                    className="text-lg font-normal text-slate-900"
                  >
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
                  <label
                    htmlFor="email"
                    className="text-lg font-normal text-slate-900 flex items-center gap-2"
                  >
                    Email
                    <span
                      id="emailnote"
                      className={validEmail ? "m-2 text-green-600" : "hidden"}
                    >
                      <FaCheck />
                    </span>
                    <span
                      id="emailnote"
                      className={
                        validEmail || !email ? "hidden" : "text-red-600 m-2"
                      }
                    >
                      <FaTimes />
                    </span>
                  </label>
                  <input
                    type="email"
                    ref={emailRef}
                    value={email}
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailnote"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Please Enter"
                    onBlur={() => setEmailFocus(false)}
                    onFocus={() => setEmailFocus(true)}
                    className="w-full p-1 border border-gray-300 rounded-md"
                  />
                  <p
                    className={
                      emailFocus && !validEmail
                        ? "text-red-600 flex items-center gap-2"
                        : "hidden"
                    }
                  >
                    <FaInfoCircle className="" />
                    Invalid Email
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="text-lg font-normal text-slate-900 flex items-center gap-2"
                  >
                    Password
                    <span
                      id="uidnote"
                      className={validPassword ? "text-green-600" : "hidden"}
                    >
                      <FaCheck />
                    </span>
                    <span
                      className={
                        validPassword || !password
                          ? "hidden"
                          : "text-red-600 flex items-center gap-2"
                      }
                    >
                      <FaTimes />
                    </span>
                  </label>
                  <input
                    type="password"
                    required
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="pwdnote"
                    ref={pwdRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Please Enter"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    className="w-full p-1 border border-gray-300 rounded-md"
                  />
                  <p
                    id="pwdnote"
                    className={
                      passwordFocus && !validPassword
                        ? "text-red-600 flex  gap-2"
                        : "hidden"
                    }
                  >
                    <FaInfoCircle className="w-6 h-6" />
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br />
                  </p>
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
              <div className="flex items-center justify-between mt-4">
                <button
                  type="submit"
                  className={`bg-regal-blue-700 text-white p-2 px-4 rounded-md w-max text-center ${
                    loading || !faceEnrolled
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={loading || !faceEnrolled}
                >
                  {loading ? "Signing up..." : "Sign up"}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-red-200 p-4 flex items-center rounded-md">
              <p className="text-red-800 font-semibold">
                Registration is temporarily disabled. Come back later.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default SignupLayout;
