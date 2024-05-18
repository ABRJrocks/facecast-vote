import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Alert from "../../Components/Alert";
import { useNavigate } from "react-router-dom";
import { usersRef } from "../../config/firebase";
import { getCollectionById } from "../../utils/globals";
import { Link } from "react-router-dom";
import logo from "./facecast-no-bg.png";
import toast from "react-hot-toast";
// import { getCollectionById } from "../../utils/globals";
const LoginLayout = () => {
  const { logIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAllowed, setLoginAllowed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while sign-up is in progress
    setErrorMessage("");

    try {
      const loginuser = await logIn(email, password);
      setEmail("");
      setPassword("");
      console.log("login user", loginuser.user.uid);
      if (loginuser) {
        const userData = await getCollectionById(usersRef, loginuser.user.uid);
        // toast.success("Login Successful");

        if (userData.roles === "voter") {
          toast.success("Voter Login Successful");
          navigate("/voter");
        } else if (userData.roles === "admin") {
          toast.success("Admin Login Successful");
          navigate("/admin");
        } else {

          navigate("/signin");
        }
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      // Handle signup errors
      console.error("Error during sign-up:", error);
      setErrorMessage("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-16">
      <main className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 shadow-md p-10 border-stone-200 bg-stone-50">
        <section className="shadow-sm flex items-center flex-col gap-5    justify-center pb-14">
          <img src={logo} alt="Face cast logo" className="md:max-w-sm w-48" />
        </section>
        <section class="md:border-l border-stone-300 md:p-6 md:py-10 md:px-10 ">
          {errorMessage && (
            <Alert message={errorMessage} type="error" dismissible={true} />
          )}
          {/* {successMessage && <Alert message={successMessage} type="success" />} */}
          <h2 class="text-2xl font-semibold text-left sm:text-3xl mb-6 text-slate-900">
            Welcome Abroad
          </h2>
          <form
            action=""
            onSubmit={handleSubmit}
            class=" mx-auto flex flex-col items-left gap-4"
          >
            <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              <div>
                <label htmlFor="name1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="form-input text-md"
                />
              </div>

              <div>
                <label for="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="form-input text-md"
                />
              </div>
            </div>
            <div>
              Already have an account
              <Link
                to="/signup"
                className="pl-2 py-2 font-bold text-regal-blue-600"
              >
                Create Account
              </Link>
            </div>
            <div class="flex items-center justify-between">
              <button
                class={`bg-regal-blue-700 text-white p-2 px-4 rounded-md w-max text-center ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default LoginLayout;
