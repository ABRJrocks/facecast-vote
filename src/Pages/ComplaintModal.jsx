import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SlEnvolopeLetter } from "react-icons/sl";
import { RiPagesLine } from "react-icons/ri";
import { complainRef, permissionRef } from "../config/firebase";
import { createDocument, getCollectionById } from "../utils/globals";
import { useAuth } from "../context/AuthContext";
const ComplaintModal = ({ isOpen, closeModal }) => {
  const { PERMISSIONSID } = useAuth();
  const [ComplaintsAllowed, setComplaintsAllowed] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //   const [password, setPassword] = useState("");
  //   const { currUser } = useAuth();
  useEffect(() => {
    const fetchPermissions = async () => {
      const permissions = await getCollectionById(permissionRef, PERMISSIONSID);
      if (permissions) {
        setComplaintsAllowed(permissions.complaints);
      }
    };
    fetchPermissions();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email,
      name,
      subject,
      message,
      status: "pending",
      remarks: "",
    };
    try {
      const submit = await createDocument(complainRef, data);
      if (submit) {
        setEmail("");
        setName("");
        setSubject("");
        setMessage("");
        setSubmitted(true);
        console.log("Complaint submitted successfully");
      }
    } catch (error) {
      setError(error.message);
      console.log("Error submitting complaint", error);
    } finally {
      setLoading(false);
    }
  };
  const handleNewComplaint = () => {
    setSubmitted(false);
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

          {/* This is the modal itself */}
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
                className="text-2xl font-medium leading-6 text-gray-900"
              >
                File a Complaint
              </Dialog.Title>
              {ComplaintsAllowed ? (
                <div className="mt-2">
                  {submitted ? (
                    <div className="flex flex-col py-4 font-semibold text-lg">
                      <h1>Complaint Submitted Successfully</h1>
                      <button
                        onClick={handleNewComplaint}
                        className="text-regal-blue-700 text-left py-2"
                      >
                        Another complaint?
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleOnSubmit}>
                      <div className="flex flex-col gap-2">
                        <div>
                          <label
                            htmlFor="name1"
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
                            htmlFor="name1"
                            className="text-lg font-normal text-slate-900"
                          >
                            email
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
                            htmlFor="name1"
                            className="text-lg font-normal text-slate-900"
                          >
                            Subject
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="name1"
                            className="text-lg font-normal text-slate-900"
                          >
                            Message
                          </label>
                          <textarea
                            rows="4"
                            cols="50"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded-md"
                          ></textarea>
                        </div>

                        <div className="flex justify-start py-4">
                          <button
                            // onClick={closeModal}
                            className="bg-regal-blue-700 text-white px-3 py-2 drop-shadow-sm rounded-md hover:bg-regal-blue-700/80"
                          >
                            <span className="font-semibold text-base">
                              Register Complaint
                            </span>
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <div className="bg-red-200 p-2 mt-4 flex items-center rounded-md">
                  <p className="text-red-800 font-semibold">
                    Complaints are temproarily Closed
                  </p>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ComplaintModal;
