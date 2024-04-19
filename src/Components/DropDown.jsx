import { FaChevronDown } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

import React from "react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    label: "Parties",
    to: "/parties",

  },
  {
    label: "Elections",
  },
  {
    label: "Candidates",
    to: "/candidates",
  }

];

const DropDown = ({ title, type }) => {
  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={`inline-flex w-full justify-center rounded-md text-md text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${
              type
                ? "p-2 border border-regal-blue-800 bg-regal-blue-800 hover:bg-regal-blue-900/80"
                : ""
            }`}
          >
            {title ? title : "Options"}
            <FaChevronDown
              className="relative mt-2 ml-2 h-3 w-3 text-regal-blue-50 hover:text-regal-blue-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={
              type
                ? "absolute right-0 mt-2 w-full origin-top-right rounded-md border border-regal-blue-800  bg-white shadow-md focus:outline-none"
                : "absolute right-0 mt-2 w-32 origin-top-right rounded-md border border-regal-blue-800  bg-white shadow-md focus:outline-none"
            }
          >
            {menuItems.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                 <Link to={item.to ? item.to : "/"}>
                   <button
                    className={`${
                      active ? "text-regal-blue-800" : "text-black"
                    } text-regal-blue-900 group flex w-full items-center px-2 py-2 text-sm font-medium`}
                  >
                    {item.label}
                  </button>
                 </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropDown;
