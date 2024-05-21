import React, { useState, useEffect } from "react";
import { CgChevronDoubleRight } from "react-icons/cg";
import { getCollectionById, createDocument } from "../../utils/globals";
import { electionsRef, resultsRef, userVoteRef } from "../../config/firebase";
import { query, where, getDocs } from "firebase/firestore";
import CountdownTimer from "../CountdownTimer";

const getVotesByconstituency = async (
  constituency_id,
  election_id,
  candidate_id
) => {
  const votes = [];
  try {
    // console.log("Getting votes");
    // console.log("Constituency", constituency_id);
    // console.log("Election", election_id);
    // console.log("Candidate", candidate_id);
    const q = query(
      userVoteRef,
      where("constituency_id", "==", constituency_id),
      where("election_id", "==", election_id),
      where("candidate_id", "==", candidate_id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      votes.push(doc.data());
    });
    return votes;
  } catch (error) {
    console.error("Error getting votes:", error);
    return null;
  }
};
const ElectionsDetails = ({ title, end, electionType, id }) => {
  const [constituencies, setConstituencies] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const announceResultst = async () => {
    try {
      console.log("Time's up!");
      console.log("ID!", id);
      if (!id) {
        throw new Error("Election ID is missing");
      }

      const election = await getCollectionById(electionsRef, id);
      if (!election) {
        throw new Error("Election details not found");
      }

      const fetchedConstituencies = election.constituencies;
      const fetchedCandidates = [];

      fetchedConstituencies.forEach((constituency) => {
        if (constituency.candidates && Array.isArray(constituency.candidates)) {
          fetchedCandidates.push(...constituency.candidates);
        }
      });

      setConstituencies(fetchedConstituencies);
      setCandidates(fetchedCandidates);

      const resultData = {
        electionTitle: election.title,
        totalVotes: 0,
        electionID: id,
        constituencies: [],
      };

      for (const constituency of fetchedConstituencies) {
        const constituencyData = {
          name: constituency.name,
          id: constituency.const_id,
          candidates: [],
        };
        for (const candidate of fetchedCandidates) {
          const votes = await getVotesByconstituency(
            constituency.const_id,
            id,
            candidate.id
          );
          const candidateData = {
            name: candidate.name,
            id: candidate.id,
            votes: votes ? votes.length : 0,
          };
          constituencyData.candidates.push(candidateData);
          if (votes) {
            resultData.totalVotes += votes.length;
          }
        }
        resultData.constituencies.push(constituencyData);
      }

      console.log("Result Data: ", JSON.stringify(resultData, null, 2));

      const resultRef = await createDocument(resultsRef, resultData);
      if (resultRef) {
        console.log("Results saved successfully");
      } else {
        throw new Error("Error saving results");
      }
    } catch (error) {
      console.error("announceResultst error:", error.message);
    }
  };

  return (
    <div className="border-b border-b-stone-300 mb-0">
      <div className="flex justify-between items-center pt-4">
        <div className="flex flex-col gap-2 items-start">
          <h2 className="md:text-2xl md:font-semibold text-xl font-bold">
            {title}
          </h2>
          <h2 className="md:text-md md:font-semibold text-base font-semibold">
            Election Type: {electionType}
          </h2>
        </div>
        <div className="">
          <CountdownTimer
            targetDate={new Date(end)}
            onTimerEnd={announceResultst}
          />
        </div>
      </div>
      <div className="py-2">
        <a className="flex items-center gap-1 text-regal-blue-600">
          Learn more <CgChevronDoubleRight className="h-10 pt-1" />
        </a>
      </div>
    </div>
  );
};

export default ElectionsDetails;
