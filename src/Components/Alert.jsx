import React, { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
const Alert = ({ message, type, dismissible, autoHideDelay }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (autoHideDelay && autoHideDelay > 0) {
      const timeoutId = setTimeout(() => {
        setShow(false);
      }, autoHideDelay);

      return () => clearTimeout(timeoutId);
    }
  }, [autoHideDelay]);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div
      className={`fixed top-20 inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end ${
        show ? "" : "hidden"
      }`}
    >
      <div
        className={`max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${
          type === "success"
            ? "border-green-400"
            : type === "error"
            ? "border-red-400"
            : type === "warning"
            ? "border-yellow-400"
            : ""
        }`}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <IoMdInformationCircleOutline className="h-6 w-6" />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p
                className={`text-sm font-medium ${
                  type === "success"
                    ? "text-gray-900"
                    : type === "error"
                    ? "text-gray-900"
                    : type === "warning"
                    ? "text-gray-900"
                    : "text-gray-900"
                }`}
              >
                {message}
              </p>
            </div>
            {dismissible && (
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={handleClose}
                  className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                >
                  <IoCloseCircleOutline className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
