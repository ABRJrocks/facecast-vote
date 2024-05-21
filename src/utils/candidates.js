import { candidatesRef } from "../config/firebase";
import {
  getCollectionById,
  createDocument,
  getCollections,
  updateDocument,
  deleteDocument, // Ensure you import the deleteDocument function from your globals file
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

export const getCandidatesById = async (id) => {
  try {
    const documentData = await getCollectionById(candidatesRef, id);
    console.log("Candidate data by Id:", documentData);
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

// Add the deleteCandidate function here
export const deleteCandidate = async (id) => {
  try {
    const isSuccess = await deleteDocument(candidatesRef, id);
    if (isSuccess) {
      alert("Candidate deleted successfully");
      return true;
    } else {
      console.log("Document deletion failed");
      return false;
    }
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};
