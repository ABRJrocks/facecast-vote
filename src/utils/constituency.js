import { constituenciesRef } from "../config/firebase";
import {
  getCollectionById,
  createDocument,
  getCollections,
  updateDocument,
  deleteDocument, // Import the delete function from globals
} from "./globals";

export const createConstituency = async (data) => {
  try {
    const docId = await createDocument(constituenciesRef, data);
    console.log("Constituency created with ID:", docId);
    if (!docId) {
      console.log("Error creating constituency");
    }
    return docId;
  } catch (error) {
    console.log(error);
  }
};

export const getConstituencies = async () => {
  try {
    const collections = await getCollections(constituenciesRef);
    console.log("Collections:", collections);
    return collections;
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
};

export const getConstituencyById = async (id) => {
  // Corrected function name
  try {
    const documentData = await getCollectionById(constituenciesRef, id);
    console.log("Constituency data by Id:", documentData);
    return documentData;
  } catch (error) {
    console.error("Error fetching document:", error);
  }
};

export const updateConstituency = async (id, newData) => {
  try {
    const isSuccess = await updateDocument(constituenciesRef, id, newData);
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

export const deleteConstituency = async (id) => {
  try {
    const isSuccess = await deleteDocument(constituenciesRef, id);
    if (isSuccess) {
      alert("Constituency deleted successfully");
      return true;
    } else {
      console.log("Document deletion failed");
      return false;
    }
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};
