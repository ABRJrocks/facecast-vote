import React, { useState,useRef } from "react";
import { Transition } from "@headlessui/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import DropDown from "./DropDown";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const mobileNavRef = useRef(null);
    return (
      <header className="bg-regal-blue-700 text-regal-blue-50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 md:py-2">
            <h1 className="text-xl md:text-2xl font-semibold">FaceCast Vote</h1>
            <nav className="hidden md:flex md:items-center space-x-6 text-base font-medium">
              <a href="#" className="hover:opacity-90">Home</a>
              <a href="#" className="hover:opacity-90">About</a>
              <a href="#" className="hover:opacity-90">Services</a>
              <a href="#" className="hover:opacity-90">Contact</a>
              <DropDown/>
              <div>
                <DropDown title={'Muhammd Saad'} type={"userAccount"}/>
                {/* <button className="bg-regal-blue-900 text-regal-blue-50 px-3 py-2 drop-shadow-md rounded-md hover:bg-regal-blue-900/80">
                  Get Started
                </button> */}
              </div>
            </nav>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-regal-blue-50 hover:text-white hover:bg-regal-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <AiOutlineClose className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <AiOutlineMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <Transition
          show={isOpen}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {(ref) => (
            <nav
              ref={mobileNavRef}
              className="md:hidden bg-regal-blue-700 text-regal-blue-50 py-4"
              aria-label="mobile-menu"
            >
              <div className="flex flex-col items-center text-start space-y-4">
                <a href="#" className="text-xl  hover:opacity-90">Home</a>
                <a href="#" className="text-xl  hover:opacity-90">About</a>
                <a href="#" className="text-xl  hover:opacity-90">Services</a>
                <a href="#" className="text-xl  hover:opacity-90">Contact</a>
              </div>
            
            </nav>
          )}
        </Transition>
      </header>
    );
}

export default Navbar