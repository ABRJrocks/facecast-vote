import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import {
  getConstituencies,
  deleteConstituency,
} from "../../utils/constituency";

const ConstHome = () => {
  const [constituencies, setConstituencies] = useState([]);

  useEffect(() => {
    const fetchConstituencies = async () => {
      try {
        const data = await getConstituencies();
        setConstituencies(data);
      } catch (error) {
        console.error("Error fetching constituencies", error);
      }
    };
    fetchConstituencies();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this constituency?"
    );
    if (confirmDelete) {
      const isSuccess = await deleteConstituency(id);
      if (isSuccess) {
        setConstituencies(constituencies.filter((item) => item.id !== id));
      } else {
        console.error("Error deleting constituency");
      }
    }
  };

  const renderActions = (id) => (
    <div className="flex items-center justify-between gap-4 ">
      <Link to={`update/${id}`}>
        <button className="bg-regal-blue-600 text-regal-blue-50 p-2 rounded-md hover:bg-regal-blue-600/80">
          <FaRegEdit />
        </button>
      </Link>
      <Link to={`${id}`}>
        <button className="bg-green-600 text-green-50 p-2 rounded-md hover:bg-green-600/80">
          <MdOpenInNew />
        </button>
      </Link>
      <button
        onClick={() => handleDelete(id)}
        className="bg-red-600 text-red-50 p-2 rounded-md hover:bg-red-600/80"
      >
        Delete
      </button>
    </div>
  );

  if (!constituencies.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 py-4">
          Constituency Home
        </h1>
      </div>
      <hr className="py-2 border-t-2 border-gray-300" />
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assembly
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Region
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Voters
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {constituencies.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.assembly}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.code}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.region}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.voters}</div>
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

export default ConstHome;
