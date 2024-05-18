import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Transition } from "@headlessui/react";
import { useRef, useState, useEffect } from "react";
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const AuthHeaderAdmin = () => {
  const navigate = useNavigate();
  const { logOut, currUser } = useAuth();
  const username = currUser ? currUser.email.split("@") : [null];
  const [isOpen, setIsOpen] = useState(false);
  const mobileNavRef = useRef(null);
  const handleLogout = () => {
    try {
      logOut();
      navigate("/signin");
      toast.success("Logged Out Successfully");
      console.log("Logged Out");
    } catch (error) {
      console.log("Error Loging out", error);
    }
  };
  useEffect(() => {
    console.log("AuthHeaderAdmin.jsx", "line: 1", "useEffect");
  }, []);
  const menuItemsAdminApp = [
    {
      label: "Results",
      to: "/admin/results",
    },
    {
      label: "Complaints",
      to: "/admin/complaints",
    },
    {
      label: "Settings",
      to: "/admin/settings",
    },
  ];
  const menuItemsUser = [
    {
      label: "logout",
      to: "/admin",
    },
  ];
  return (
    <header className="bg-regal-blue-700 text-regal-blue-50 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 md:py-2">
        <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/facecast-no-bg.png"}
              alt="logo"
              className="w-28"
            />
          </Link>
          <nav className="hidden lg:flex lg:items-center space-x-6 text-base font-medium">
            <Link to="/admin" className="hover:opacity-90">
              Home
            </Link>
            <Link to="/admin/elections" className="hover:opacity-90">
              Election
            </Link>
            <Link to="/admin/candidate" className="hover:opacity-90">
              Candidate
            </Link>
            <Link to="/admin/constituency" className="hover:opacity-90">
              Constituency
            </Link>
            <Link to="/admin/party" className="hover:opacity-90">
              Party
            </Link>

            <DropDown title={"More"} menuItems={menuItemsAdminApp} />
            <div className="flex gap-2">
              <button
                onClick={handleLogout}
                className="bg-regal-blue-900 text-regal-blue-50 px-3 py-2 drop-shadow-sm rounded-md hover:bg-regal-blue-900/80"
              >
                Logout
              </button>
            </div>
          </nav>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-regal-blue-50 hover:text-white hover:bg-regal-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
            className="lg:hidden bg-regal-blue-700 text-regal-blue-50 py-4"
            aria-label="mobile-menu"
          >
            <div className="flex flex-col items-center text-start space-y-4">
              <Link to="/admin" className="hover:opacity-90">
                Home
              </Link>
              <Link to="/admin/elections" className="hover:opacity-90">
                Election
              </Link>
              <Link to="/admin/candidate" className="hover:opacity-90">
                Candidate
              </Link>
              <Link to="/admin/constituency" className="hover:opacity-90">
                Constituency
              </Link>
              <Link to="/admin/party" className="hover:opacity-90">
                Party
              </Link>

              <DropDown title={"More"} menuItems={menuItemsAdminApp} />
              <div className="flex gap-2">
                <button
                  onClick={handleLogout}
                  className="bg-regal-blue-900 text-regal-blue-50 px-3 py-2 rounded-md hover:bg-regal-blue-900/80"
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        )}
      </Transition>
    </header>
  );
};

export default AuthHeaderAdmin;
