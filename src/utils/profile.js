import { getDocs, query, where, updateDoc } from "firebase/firestore";
import { usersRef } from "../config/firebase";
// import { fetchSignInMethodsForEmail } from "firebase/auth";
// import { auth } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
// Find profile by email id
export const getProfileByEmail = async (email) => {
  try {
    console.log("Searching for profile with email:", email);
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    console.log("Query snapshot:", querySnapshot.docs.length);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      console.log("Profile document data:", doc.data());
      return doc.data();
    } else {
      console.log("No profile found for email:", email);
      return null;
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const updateProfileByEmail = async (email, newData) => {
  try {
    // Find the document corresponding to the provided email
    const querySnapshot = await getDocs(
      query(usersRef, where("email", "==", email.toString()))
    );

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      // Update the document with the new data
      await updateDoc(docRef, newData);
      console.log("Document updated successfully!");
    } else {
      console.log("No document found for the provided email:", email);
    }
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

export const checkUserExists = async (email, currUser) => {
  try {
    if (!currUser) {
      console.log("No user found");
      return false;
    }
    if (currUser.email !== email) {
      console.log("Email does not match");
      return false;
    }
    const findEmail = await getProfileByEmail(email);
    console.log("findEmail", findEmail);
    if (findEmail) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return false;
  }
};
export const getuserByid = async (id) => {
  try {
    const docRef = doc(usersRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log("Error getting document:", error);
  }
};

