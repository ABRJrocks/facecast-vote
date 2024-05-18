import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { politicalParties } from "../../data/parties";
import { FaRegEdit } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import { getParties } from "../../utils/parties";

const PartyHome = () => {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getParties();
        setParties(response);
        setSuccess("Data Fetched Successfully");
      } catch (error) {
        setError("Error Fetching Data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
    </div>
  );
  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-semibold text-gray-800 py-4">Party Home</h1>
      <hr className="py-2 border-t-2 border-gray-300" />
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reg Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Foundation Year
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Leader
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {parties.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {item.reg_number}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.name}</div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {item.founded}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.leader}</div>
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

export default PartyHome;
