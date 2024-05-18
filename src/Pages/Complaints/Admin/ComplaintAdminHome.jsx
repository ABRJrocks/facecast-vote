import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { getCollections, updateDocument } from "../../../utils/globals";
import { complainRef } from "../../../config/firebase";
import ModalUpdate from "./ModalUpdate";
import toast from "react-hot-toast";

const ComplaintAdminHome = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (id) => {
    setIsOpen(true);
    setSelectedComplaintId(id);
  };
  const fetchComplaints = async () => {
    const data = await getCollections(complainRef);
    console.log("Complaints data", data);
    setComplaints(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchComplaints();
  }, []);

  const rejectComplaint = async (id) => {
    try {
      const updateStatus = await updateDocument(complainRef, id, {
        status: "rejected",
      });
      console.log("Update status", updateStatus);
      if (updateStatus) {
        const updatedComplaints = complaints.map((item) => {
          if (item.id === id) {
            return { ...item, status: "rejected" };
          }
          return item;
        });
        setComplaints(updatedComplaints);
        console.log("Complaint Rejected Successfully");
        toast.success("Complaint Rejected Successfully");
      }
    } catch (error) {
      console.error("Error rejecting complaint:", error);
    }
  };

  const renderActions = (id) => (
    <div className="flex items-center justify-between gap-4">
      <button
        onClick={() => openModal(id)}
        className="bg-regal-blue-600 text-regal-blue-50 p-2 rounded-md hover:bg-regal-blue-600/80"
      >
        <FaRegEdit />
      </button>
      <button
        onClick={() => rejectComplaint(id)}
        className="bg-red-600 text-green-50 p-2 rounded-md hover:bg-red-600/80"
      >
        <IoIosCloseCircle />
      </button>
    </div>
  );

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
  const [complaintsStatus, setComplaintsStatus] = useState(false);

  const HandleUpdateStatus = (value) => {
    setComplaintsStatus(value);
    toast.success("Complaint Accepted Successfully");
  };
  useEffect(() => {
    fetchComplaints();
  }, [complaintsStatus]);

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-semibold text-gray-800 py-4">Complaints</h1>
      <hr className="py-2 border-t-2 border-gray-300" />
      <ModalUpdate
        isOpen={isOpen}
        closeModal={closeModal}
        selectedComplaintId={selectedComplaintId}
        onupdate={HandleUpdateStatus}
      />
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Message
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {complaints.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {item.subject && item.subject
                    ? item.subject.split(" ").slice(0, 4).join(" ") +
                      (item.subject.split(" ").length > 4 ? " ..." : "")
                    : ""}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {item.message && item.message
                    ? item.message.split(" ").slice(0, 8).join(" ") +
                      (item.message.split(" ").length > 8 ? " ..." : "")
                    : ""}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  <StatusBadge status={item.status} />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center">
                {renderActions(item.id)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintAdminHome;
