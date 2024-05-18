import React, { useEffect, useState } from "react";
// import DisplayTableSimple from "../../Components/DisplayTableSimple";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import { getConstituencies } from "../../utils/constituency";
// import SearchComponent from "../../Components/SearchComponent";
// import { constituencies } from "../../data/const";
const ConstHome = () => {
  // const [data, setData] = useState([]);
  const [constituencies, setConstituencies] = useState([]);
  useEffect(() => {
    const fetchConstituencies = async () => {
      try {
        const data = await getConstituencies();
        console.log("Constituencies in const home:", data);
        setConstituencies(data);
      } catch (error) {
        console.error("Error fetching constituencies", error);
      }
    };
    fetchConstituencies();
  }, []);

  if (!constituencies) {
    return <div>Loading...</div>;
  }

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 py-4">
          Constituency Home
        </h1>
        {/* <SearchComponent /> */}
      </div>
      <hr className="py-2 border-t-2 border-gray-300" />
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assembly
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              region
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
