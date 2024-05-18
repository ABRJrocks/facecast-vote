import { electionsRef } from "../config/firebase"; // Assuming you've defined electionsRef correctly in your firebase config file
import {
  getDocs,
  getDoc,
  doc,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore"; // Correct import statement
import { createDocument, updateDocument } from "./globals";


export const getElections = async () => {
  try {
    const querySnapshot = await getDocs(electionsRef);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (error) {
    console.log("Error Fetching data", error);
  }
};

export const createElections = async (data) => {
  try {
    console.log("Creating document...", data);
    const docId = await createDocument(electionsRef, data);
    if (!docId) {
      console.log("Error creating constituency");
    }
    return docId; // Return the document ID on success
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getElectionData = () => {
  const currentDateTime = new Date();

  const q = query(
    electionsRef,
    where("start_at", "<=", currentDateTime),
    orderBy("start_at", "asc")
  );

  return new Promise((resolve, reject) => {
    onSnapshot(
      q,
      (snapshot) => {
        let elections = [];
        snapshot.forEach((doc) => {
          elections.push({ ...doc.data(), id: doc.id });
        });
        console.log(elections);
        resolve(elections);
      },
      reject
    );
  });
};
export const getElectionData1 = () => {
  const today = new Date().toISOString().split("T")[0];
  const q = query(
    electionsRef,
    where("election_date", ">=", today),
    where("status", "in", ["online", "upcoming"]),
    orderBy("created_at", "desc")
  );

  return new Promise((resolve, reject) => {
    onSnapshot(
      q,
      (snapshot) => {
        let elections = [];
        snapshot.forEach((doc) => {
          elections.push({ ...doc.data(), id: doc.id });
        });
        console.log(elections);
        resolve(elections);
      },
      reject
    );
  });
};

export const getElectiontById = async (documentId) => {
  try {
    const docRef = doc(electionsRef, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Document exists
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      // Document does not exist
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error; // Handle or propagate the error as needed
  }
};

export const updateElection = async (documentId, data) => {
  try {
    const docRef = await updateDocument(electionsRef, documentId, data);
    if (!docRef) {
      console.log("Error updating document");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error updating document:", error);
    return false;
  }
};
