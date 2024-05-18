import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { updateDocument } from "../utils/globals"; //returns boolean true or false
import { useAuth } from "../context/AuthContext";
import { permissionRef } from "../config/firebase";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegHandPointRight } from "react-icons/fa6";

const AdminSettings = () => {
  const { PERMISSIONSID } = useAuth();
  const [signUp, setSignUp] = useState(true);
  const [complaints, setComplaints] = useState(true);
  const [voterLogin, setVoterLogin] = useState(true);

  const handleToggleSignUp = async () => {
    const newSignUp = !signUp;
    await updateDocument(permissionRef, PERMISSIONSID, {
      signUp: newSignUp,
    });

    setSignUp(newSignUp);
    console.log("signUp", newSignUp);
  };

  const handleToggleComplaints = async () => {
    const newComplaints = !complaints;
    await updateDocument(permissionRef, PERMISSIONSID, {
      complaints: newComplaints,
    });

    setComplaints(newComplaints);
    console.log("complaints", newComplaints);
  };

  const handleToggleVoterLogin = async () => {
    const newVoterLogin = !voterLogin;
    await updateDocument(permissionRef, PERMISSIONSID, {
      voterLogin: newVoterLogin,
    });

    setVoterLogin(newVoterLogin);
    console.log("voterLogin", newVoterLogin);
  };

  return (
    <div>
      <section>
        <h1 className="text-2xl font-semibold text-gray-800 py-4">Settings</h1>
        <hr className="py-2 border-t-2 border-gray-300" />
        <div>
          <h1 className="text-lg font-semibold text-gray-800 py-4">
            Permissions
          </h1>
          <DataLine
            value="Voter Registration"
            enabled={signUp}
            handleToggle={handleToggleSignUp}
          />
          <DataLine
            value="Complaints"
            enabled={complaints}
            handleToggle={handleToggleComplaints}
          />
          <DataLine
            value="Voter Login"
            enabled={voterLogin}
            handleToggle={handleToggleVoterLogin}
          />
          <DataLine1
            value="Seed Data"
            label={voterLogin}
            path="/admin/settings/seed-data"
          />
        </div>
      </section>
    </div>
  );
};
const DataLine1 = ({ value, label, path }) => {
  return (
    <div className="border-b border-gray-200 py-4 ">
      <Link to={path} className="text-regal-blue-600 flex justify-between">
        <span className=" text-gray-900">{value}</span>
        <label className="flex flex-row items-center gap-5">
          {label}
          <FaRegHandPointRight />
        </label>
      </Link>
    </div>
  );
};

const DataLine = ({ value, enabled, handleToggle }) => {
  return (
    <div className="flex border-b border-gray-200 py-4 justify-between">
      <span className="text-gray-900">{value}</span>
      <Switch
        checked={enabled}
        onChange={handleToggle}
        className={`group inline-flex h-6 w-11 items-center rounded-full transition duration-300 ease-in-out ${
          enabled
            ? "bg-regal-blue-500" // Apply this color when enabled
            : "bg-gray-200" // Apply this color when not enabled
        }`}
      >
        <span className="sr-only">Enable/Disable</span>
        <span
          className={`${
            enabled
              ? "translate-x-5 bg-regal-blue-800"
              : "translate-x-1 bg-white"
          } inline-block w-5 h-5 transform pointer-events-none rounded-full transition ease-in-out duration-200`}
        />
      </Switch>
    </div>
  );
};

export default AdminSettings;
