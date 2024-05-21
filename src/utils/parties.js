import {
  createDocument,
  getCollectionById,
  getCollections,
  updateDocument,
  deleteDocument,
} from "./globals";
import { partyRef } from "../config/firebase";

export const createParty = async (data) => {
  try {
    const docId = await createDocument(partyRef, data);
    console.log("Party created with ID:", docId);
    if (!docId) {
      console.log("Error creating Party");
    }
    return docId;
  } catch (error) {
    console.log(error);
  }
};

export const getParties = async () => {
  try {
    const collections = await getCollections(partyRef);
    console.log("Collections:", collections);
    return collections;
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
};

export const getPartybyId = async (id) => {
  try {
    const documentData = await getCollectionById(partyRef, id);
    console.log("Party data by Id:", documentData);
    return documentData;
  } catch (error) {
    console.error("Error fetching document:", error);
  }
};

export const updateParty = async (id, data) => {
  try {
    const isSuccess = await updateDocument(partyRef, id, data);
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

export const deleteParty = async (id) => {
  try {
    const isSuccess = await deleteDocument(partyRef, id);
    if (isSuccess) {
      alert("Party deleted successfully");
      return true;
    } else {
      console.log("Document delete failed");
      return false;
    }
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};
