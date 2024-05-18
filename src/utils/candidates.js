import { candidatesRef } from "../config/firebase";
import {
  getCollectionById,
  createDocument,
  getCollections,
  updateDocument,
} from "./globals";

export const createCandidate = async (data) => {
  try {
    const docId = await createDocument(candidatesRef, data);
    console.log("Candidate created with ID:", docId);
    if (!docId) {
      console.log("Error creating Candidate");
    }
    return docId;
  } catch (error) {
    console.log(error);
  }
};
export const getCandidates = async () => {
  try {
    const collections = await getCollections(candidatesRef);
    console.log("Collections:", collections);
    return collections;
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
};

export const getCandidatesbyId = async (id) => {
  try {
    const documentData = await getCollectionById(candidatesRef, id);
    console.log("Constituency data by Id:", documentData);
    return documentData;
  } catch (error) {
    console.error("Error fetching document:", error);
  }
};

export const updateCandidates = async (id, newData) => {
  try {
    const isSuccess = await updateDocument(candidatesRef, id, newData);
    if (isSuccess) {
      console.log("Document updated successfully");
      return true;
    } else {
      console.log("Document update failed");
      return false;
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

