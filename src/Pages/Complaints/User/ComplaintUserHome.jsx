import React, { useState, useEffect } from "react";
import { complainRef } from "../../../config/firebase";
import { getCollections } from "../../../utils/globals";
const ComplaintUserHome = () => {
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    const fetchComplaints = async () => {
      const complaintsData = await getCollections(complainRef);
      setComplaints(complaintsData);
    };
    fetchComplaints();
  }, []);

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-semibold text-gray-800 py-4">Complaints</h1>
      <hr className="py-2 border-t-2 border-gray-300" />
      <div>
        {complaints.map((item, index) => (
          <div key={index}>
            <UserComplaint item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

const UserComplaint = ({ item }) => {
  return (
    <section className="text-gray-600 body-font border-gray-100 border-2 py-4 rounded-md">
      <div className="container mx-auto flex px-5  md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <div className="flex items-center justify-between w-full">
            <h1 className="title-font sm:text-2xl text-xl mb-4 font-medium text-gray-900">
              {item.subject && item.subject
                ? item.subject.split(" ").slice(0, 10).join(" ") +
                  (item.subject.split(" ").length > 10 ? " ..." : "")
                : ""}
            </h1>
            <div className="">
              <StatusBadge status={item.status} />
            </div>
          </div>
          <p className="mb-2 leading-relaxed">
            {item.message && item.subject
              ? item.message.split(" ").slice(0, 4).join(" ") +
                (item.message.split(" ").length > 4 ? " ..." : "")
              : ""}
          </p>

          {item.status === "accepted" && (
            <div className="">
              <h1 className="title-font sm:text-lg text-lg mb-1 font-medium text-gray-900">
                Response
              </h1>
              <p className="leading-relaxed text-gray-500 mt-2">
                {item.remarks}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
const StatusBadge = ({ status }) => {
  // Determine the background and text color based on the status
  let bgColor = "";
  let textColor = "";

  switch (status) {
    case "accepted":
      bgColor = "bg-green-600";
      textColor = "text-white";
      break;
    case "pending":
      bgColor = "bg-red-600";
      textColor = "text-white";
      break;
    case "rejected":
      bgColor = "bg-yellow-500";
      textColor = "text-white";
      break;
    default:
      bgColor = "bg-gray-600";
      textColor = "text-white";
  }

  return (
    <span
      className={`inline-block px-2 py-1 text-sm rounded-md ${bgColor} ${textColor}`}
    >
      {status}
    </span>
  );
};
export default ComplaintUserHome;
