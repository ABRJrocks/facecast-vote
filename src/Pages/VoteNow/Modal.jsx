import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { checkUserExists } from "../../utils/profile";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Modal = ({ isOpen, closeModal, onUserExists }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { currUser } = useAuth();
  const navigate = useNavigate();

  // Function to handle input change for email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear any previous errors when user types in the email field
  };

  // Function to check if the user exists based on the input email
  const handleCheckUserExists = async () => {
    try {
      const exists = await checkUserExists(email, currUser);
      if (exists) {
        onUserExists(exists);
        toast.success("User exists. Please proceed.");
        closeModal();
        // User exists, navigate or perform desired action
        // For example, navigate to a specific page
        // navigate("/da/shboard");
      } else {
        // User does not exist, display an error message or take appropriate action
        toast.error("User does not exist. Please try again.");
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      toast.error("Error checking user existence. Please try again.");
    }
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <Dialog.Title
                as="h3"
                className="text-xl font-medium leading-6 text-gray-900"
              >
                Please verify
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Please verify your identity to proceed
                </p>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 p-2 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
              <div className="mt-4">
                <button
                  onClick={handleCheckUserExists}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Verify
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
