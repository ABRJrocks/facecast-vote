import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";

const LogoutOnUnload = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    const handleUnload = () => {
      logOut();
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [logOut]);

  return null;
};

export default LogoutOnUnload;
