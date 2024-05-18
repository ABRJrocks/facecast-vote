import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { checkUserExists } from "../../utils/profile";
import { complainRef } from "../../../config/firebase";
import { updateDocument } from "../../../utils/globals";
const ModalUpdate = ({ isOpen, closeModal, selectedComplaintId,onupdate }) => {
  // const [subject, setSubject] = useState("");
  // const [submitted, setSubmitted] = useState(false);
  // const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [remark, setRemark] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      status: "accepted",
      remarks: remark,
    };
    try {
      const submit = await updateDocument(
        complainRef,
        selectedComplaintId,
        data
      );
      if (submit) {
        console.log("Complaint submitted successfully", submit);
        // setMessage("");
        onupdate(true);
        alert("Complaint submitted successfully");
        console.log("Complaint submitted successfully");
      }
    } catch (error) {
      onupdate(false);
      setError(error.message);
      console.log("Error submitting complaint", error);
    } finally {
      setLoading(false);
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
                Complaint
              </Dialog.Title>
              <div className="mt-2">
                <form onSubmit={handleOnSubmit}>
                  <div className="flex flex-col gap-2">
                    <div>
                      <label
                        htmlFor="name1"
                        className="text-lg font-normal text-slate-900"
                      >
                        Remarks
                      </label>
                      <textarea
                        rows="4"
                        cols="50"
                        name="message"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded-md"
                      ></textarea>
                    </div>

                    <div className="flex justify-start py-4">
                      <button
                        onClick={() => {
                          if (!loading) {
                            closeModal();
                          }
                        }}
                        className="bg-regal-blue-700 text-white px-3 py-2 drop-shadow-sm rounded-md hover:bg-regal-blue-700/80"
                      >
                        <span className="font-semibold text-base">
                          {loading ? "Loading..." : "Submit"}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalUpdate;
