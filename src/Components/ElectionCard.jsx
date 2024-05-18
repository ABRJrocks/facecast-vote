// ElectionCard.jsx
import React from "react";

const ElectionCard = ({ candidate, onVote, disabled }) => {
  const handleVoteClick = () => {
    onVote(candidate.id);
  };
  console.log("Candidate qqq2233", candidate);

  return (
    <section className="text-gray-600 mb-4">
      <div className="">
        <div className="flex flex-wrap">
          <div className="">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img
                className="lg:h-48 md:h-36  object-cover object-center"
                src={candidate.partyImg || "https://via.placeholder.com/150"}
                alt="blog"
              />
              <div className="p-6">
                <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                  {candidate.name}
                </h1>
                {/* <p className="leading-relaxed mb-3">{party}</p> */}
                <div className="flex items-center flex-wrap ">
                  <button
                    onClick={handleVoteClick}
                    className={`text-regal-blue-50 bg-regal-blue-700 rounded-md w-full text-center py-2 inline-flex items-center justify-center md:mb-2 lg:mb-0 ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={disabled}
                  >
                    Vote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElectionCard;
