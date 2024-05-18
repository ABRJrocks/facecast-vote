import {
  addDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { userVoteRef } from "../config/firebase";

export const createUserVote = async (data) => {
  try {
    const docRef = await addDoc(userVoteRef, data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const checkIfUserVoted = async (userId, constituencyId, electionId) => {

  try {
    console.log("userId", userId);
    console.log("constituencyId", constituencyId);
    console.log("electionId", electionId);
    const snapshot = await getDocs(
      query(
        userVoteRef, // Reference the "user_vote" collection
        where("user_id", "==", userId),
        where("constituency_id", "==", constituencyId),
        where("election_id", "==", electionId)
      )
    );

    return !snapshot.empty; // Returns true if a document exists, indicating the user has voted for the given constituency in the specified election
  } catch (error) {
    console.error("Error checking if user voted:", error);
    return false; // Return false in case of any error
  }
};
