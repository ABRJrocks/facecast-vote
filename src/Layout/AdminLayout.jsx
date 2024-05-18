import { Link } from "react-router-dom";
import React from "react";
import { MdPinDrop } from "react-icons/md";
import { BsPersonArmsUp } from "react-icons/bs";
import { MdOutlineHowToVote } from "react-icons/md";
import { FaRegHandPointRight } from "react-icons/fa6";
const AdminLayout = () => {
  return (
    <div>
      <main className="mx-auto max-w-4xl">
        <h1 className="text-xl font-semibold text-left sm:text-2xl mb-6 py-3 text-slate-900">
          Welcome Admin
        </h1>
        <hr className="py-2 border-t-2 border-gray-300" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <Link to="/admin/elections">
            <div className="min-w-80 h-40 border-2 border-gray-100 rounded-md p-5 flex items-center justify-center flex-col">
              <MdOutlineHowToVote className="h-20 w-20 text-blue-500" />
              <label>Elections</label>
            </div>
          </Link>
          <Link to="/admin/candidate">
            <div className="min-w-80 h-40 border-2 border-gray-100 rounded-md p-5 flex items-center justify-center flex-col">
              <BsPersonArmsUp className="h-20 w-20 text-blue-500" />
              <label>Candidates</label>
            </div>
          </Link>
          <Link to="/admin/constituency">
            <div className="min-w-80 h-40 border-2 border-gray-100 rounded-md p-5 flex items-center justify-center flex-col">
              <MdPinDrop className="h-20 w-20 text-blue-500" />
              <label>Constituency</label>
            </div>
          </Link>
        </div>
        <h1 className="text-xl font-semibold text-left sm:text-xl mb-2 py-1 text-slate-900">
          Utilities
        </h1>
        <DataLine
          value="Complaints"
          label="View Complaints"
          path="/admin/complaints"
        />
        <DataLine
          value="Settings"
          label="View Settings"
          path="/admin/settings"
        />
      </main>
    </div>
  );
};
const DataLine = ({ value, label, path }) => {
  return (
    <div className="flex border-b border-gray-200 py-4 justify-between">
      <span className=" text-gray-900">{value}</span>
      <Link to={path} className="text-regal-blue-600 ">
        <label className="flex flex-row items-center gap-5">
          {label}
          <FaRegHandPointRight />
        </label>
      </Link>
    </div>
  );
};

export default AdminLayout;
