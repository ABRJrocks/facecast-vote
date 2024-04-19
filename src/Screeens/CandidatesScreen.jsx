import React from "react";
import { candidates } from "../data/candidates";
import Candidates from "../Components/Candidates";
const CandidatesScreen = () => {
  return (
    <section className="md:px-8 py-4 px-4">
      <div className="py-5">
        <div className="border-b border-b-steal-300 py-4">
          <h1 className="text-3xl font-medium">Candidates</h1>
        </div>
        <div className="grid px-4 py-8  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {candidates.map((candidate) => (
            <Candidates key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CandidatesScreen;
