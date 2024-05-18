// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication

// const firebaseConfig = {
//   apiKey: "AIzaSyB789z6xX9_PFhc3e3zBEiGl3GDIibQ6QU",
//   authDomain: "learn-firebase-662c8.firebaseapp.com",
//   projectId: "learn-firebase-662c8",
//   storageBucket: "learn-firebase-662c8.appspot.com",
//   messagingSenderId: "1076449994534",
//   appId: "1:1076449994534:web:0a174140669e6af5e903e7",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAYY3QIH3M9Alg9BBHz3t5NW1vf_huLWJI",
  authDomain: "facecastvote.firebaseapp.com",
  projectId: "facecastvote",
  storageBucket: "facecastvote.appspot.com",
  messagingSenderId: "220175011601",
  appId: "1:220175011601:web:b69a9764dd82ad84d106b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const constituenciesRef = collection(db, "constituencies");
export const candidatesRef = collection(db, "candidate");
export const storageRef = ref(storage, 'candidates/');
export const userVoteRef = collection(db, "user_vote");
export const electionsRef = collection(db, "election");
export const usersRef = collection(db, "users");
export const partyRef = collection(db, "party");
export const resultsRef = collection(db, "results");

export const complainRef = collection(db, "complain");
export const userActionLogs = collection(db, "user_action_logs");

// permission constants
export const permissionRef = collection(db, "permissions");