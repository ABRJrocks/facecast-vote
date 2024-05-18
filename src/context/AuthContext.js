import { createContext } from "react";
import { auth } from "../config/firebase";
import { useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getuserByid } from "../utils/profile";
export const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState("");
  const PERMISSIONSID = "OpiESu73rRsy4wgO3xoG";

  const signUp = (email, password) => {
    const message = createUserWithEmailAndPassword(auth, email, password);
    console.log("context sign up ", message);
    return message;
  };
  const logIn = async (email, password) => {
    const message = await signInWithEmailAndPassword(auth, email, password);
    console.log("context login ", message.user.uid);
    const user = await getuserByid(message.user.uid);
    console.log("user", user);
    if (user) {
      console.log("admin");
      console.log("user", user.roles);
      
      setRoles(user.roles);

    }
    console.log("user roles", roles);
    return message;
  };
  //   const logIn = async (email, password) => {
  //     try {
  //       const { user } = await signInWithEmailAndPassword(auth, email, password);
  //       console.log("User context:", user);
  //       setCurrUser(user);
  //       // return userRoles;
  //     } catch (error) {
  //       console.error("Error logging in:", error);
  //       throw error;
  //     }
  //   };
  const logOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setCurrUser(user);
      console.log("user", user);
    });
    return unsubscribe;
  }, []);
  const value = { currUser, signUp, logIn, logOut, roles, PERMISSIONSID };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
