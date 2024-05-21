import {
  getDocs,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
export const createDocument = async (collectionRef, data) => {
  try {
    const docRef = await addDoc(collectionRef, data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // Return the document ID on success
  } catch (error) {
    console.error("Error creating document:", error); // Use console.error for errors
    return null; // Return null or handle errors as needed
  }
};

export const getCollections = async (collectionRef) => {
  try {
    const querySnapshot = await getDocs(collectionRef);
    const collections = [];
    querySnapshot.forEach((doc) => {
      collections.push({ id: doc.id, ...doc.data() });
    });
    return collections;
  } catch (error) {
    console.error("Error fetching collections:", error);
    return []; // Return empty array or handle errors as needed
  }
};

export const getCollectionById = async (collectionRef, id) => {
  try {
    const docRef = doc(collectionRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("Document does not exist!");
      return null; // Return null or handle non-existent document
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null; // Return null or handle errors as needed
  }
};

export const updateDocument = async (collectionRef, id, newData) => {
  try {
    const documentRef = doc(collectionRef, id);
    await updateDoc(documentRef, newData);
    console.log("Document updated successfully");
    return true; // Return true on success
  } catch (error) {
    console.error("Error updating document:", error);
    return false; // Return false or handle errors as needed
  }
};

export const uploadImage = async (file, pathPrefix) => {
  try {
    const fileName = `${generateUniqueFileName()}_${file.name}`;

    // Construct the full path
    const fullPath = `${pathPrefix}/${fileName}`;
    const storageRef = ref(storage, fullPath);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Image uploaded successfully");
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export const deleteDocument = async (collectionRef, id) => {
  try {
    const docRef = doc(collectionRef, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    return false;
  }
};

const generateUniqueFileName = () => {
  // Generate a random string
  const randomString = Math.random().toString(36).substring(2, 8);
  // Generate a timestamp
  const timestamp = Date.now();
  // Combine random string and timestamp to create a unique filename
  return `${randomString}_${timestamp}`;
};
