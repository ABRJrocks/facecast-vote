import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { updateElection, getElectiontById } from "../../utils/elections";
const EditModal = ({ isOpen, closeModal, electionId }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    const fetchConstituency = async () => {
      try {
        const data = await getElectiontById(electionId);
        if (!data) {
          console.log("No Data Found.");
          return;
        }
        console.log("Election data for update:", data);

        setStartTime(data.start_at);
        setEndTime(data.end_at);
      } catch (error) {
        console.error("Error fetching constituency", error);
      }
    };
    fetchConstituency();
  }, [electionId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = {
        start_at: startTime,
        end_at: endTime,
      };
      const success = await updateElection(electionId, data);
      if (success) {
        console.log("Election updated successfully");
        closeModal();
      }
    } catch (error) {
      console.error("Error updating election", error);
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
                className="text-xl font-medium leading-6 text-gray-900"
              >
                Edit Schedule
              </Dialog.Title>
              <div className="mt-2">
                {updated ? (
                  <div>
                    <p className="text-lg text-regal-blue-700">
                      Election Updated Successfully.
                    </p>
                  </div>
                ) : (
                  <form>
                    <div className="flex flex-col gap-2">
                      <div>
                        <label
                          htmlFor="name1"
                          className="text-lg font-normal text-slate-900"
                        >
                          Start Time
                        </label>
                        <input
                          type="datetime-local"
                          id="time"
                          name="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full p-1 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="name1"
                          className="text-lg font-normal text-slate-900"
                        >
                          End Time
                        </label>
                        <input
                          type="datetime-local"
                          id="time"
                          name="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full p-1 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="flex justify-start py-4">
                        <button
                          onClick={handleSubmit}
                          className="bg-regal-blue-700 text-white px-3 py-2 drop-shadow-sm rounded-md hover:bg-regal-blue-700/80"
                        >
                          <span className="font-semibold text-base">
                            {loading ? "Updating..." : "Update Election"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditModal;
