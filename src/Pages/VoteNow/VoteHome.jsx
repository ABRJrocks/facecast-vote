import React, { useState, useEffect } from "react";
// import ElectionsDetails from "../../Components/Utils/ElectionsDetails";
import { getElections } from "../../utils/elections";
import CountdownTimer from "../../Components/CountdownTimer";
import { getProfileByEmail } from "../../utils/profile";
import Instructions from "../../Components/Instructions";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const VoteHome = () => {
  const { currUser } = useAuth();
  const [elections, setElections] = useState([]);
  const [userElection, setUserElection] = useState([]);
  const [timeRem, setTimeRem] = useState(0);

  // useEffect(() => {

  //   const fetchElections = async () => {
  //     try {
  //       const profile = await getProfileByEmail(currUser.email);
  //       if (!profile) {
  //         console.log("No profile found");
  //         return;
  //       }
  //       const data = await getElectionData();
  //       console.log("found", data);
  //       if (data) {
  //         console.log("Data found", data);
  //         setElections(data);

  //       } else {
  //         console.log("No data found");
  //         return;
  //       }
  //     } catch (error) {
  //       console.error("Error fetching elections", error);
  //     }
  //   };
  //   fetchElections();
  // }, [currUser]);

  // useEffect(() => {
  //   const getElectionsByUserArea = async () => {
  //     try {
  //       const profile = await getProfileByEmail(currUser.email);
  //       if (!profile) {
  //         console.log("No profile found");
  //         return;
  //       }
  //       const data = await getElectionData();
  //       console.log("found", data);
  //       if (data) {
  //         console.log("Data found", data);
  //         setElections(data);

  //         const filteredElections = elections.filter((election) => {
  //           const userArea = profile.address.area;

  //           return election.constituencies.some((constituency) => {
  //             const constituencyArea = constituency.name;
  //             return constituencyArea.includes(userArea);
  //           });
  //         });

  //         console.log("filteredElections", filteredElections);
  //         setUserElection(filteredElections); // Update userElection state with filtered elections
  //       } else {
  //         console.log("No data found");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching elections", error);
  //     }
  //   };
  //   getElectionsByUserArea();
  //   elections && elections.map((election) => {
  //     console.log("constiturenceis", election.constituencies);
  //   });
  //   // console.log(elections.constituencies);
  // }, [currUser.email, setElections]); // Include currUser.email and setElections in the dependency array

  // useEffect(() => {
  //   console.log("elections", elections);
  //   const getElectionsByUserArea = async () => {
  //     try {
  //       const profile = await getProfileByEmail(currUser.email);
  //       if (!profile) {
  //         console.log("No profile found");
  //         return;
  //       }
  //       console.log("user election", elections);
  //       console.log("user election", profile.address.area);

  //       const filteredElections = elections.filter((election) =>
  //         election.constituencies.some(
  //           (constituency) => constituency.name === profile.address.area
  //         )
  //       );
  //       console.log("filteredElections", filteredElections);
  //     } catch (error) {
  //       console.error("Error fetching elections", error);
  //     }
  //   };
  //   getElectionsByUserArea();
  // }, [elections]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getProfileByEmail(currUser.email);
        if (!profile) {
          console.log("No profile found");
          return;
        }
        const electionsData = await getElections();
        if (!electionsData) {
          console.log("No election data found");
          return;
        }
        const currentDate = new Date();
        const userArea = profile.address.area;
        console.log("userArea", userArea);
        const filteredElections = electionsData.filter(
          (election) =>
            election.constituencies.some((constituency) =>
              constituency.name.includes(userArea)
            ) &&
            new Date(election.start_at) <= currentDate &&
            currentDate <= new Date(election.end_at)
        );
        console.log("filteredElections", filteredElections);
        setUserElection(filteredElections);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currUser.email]);
  return (
    <section className="px-4 py-5 md:py-5">
      <div className="py-5">
        <h1 className="pb-4 text-xl font-medium">Instructions</h1>
        <Instructions
          stepNumber={1}
          description="User Needs to Vderify his identity to vote"
        />
        <Instructions
          stepNumber={2}
          description="You have only 30 seconds to cast a vote"
        />
        <Instructions
          stepNumber={4}
          description="You can only vote once for a candidate"
        />
        <Instructions
          stepNumber={3}
          description="You can only vote for the candidates in your area"
        />
      </div>
      <div className="py-3 border-b border-b-slate-300">
        <h1 className="pb-4 text-3xl font-medium">Elections in your Area</h1>
      </div>
      {userElection.length > 0 ? (
        userElection.map((election) => (
          <div key={election.id}>
            <Link to={`${election.id}`}>
              <ElectionsDetails
                title={election.title}
                end={election.end_at}
                electionType={election.type}
              />
            </Link>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center mt-32">
          <h1 className="text-2xl font-sans font-semibold select-none">
            No elections found For Your Area
          </h1>
        </div>
      )}
    </section>
  );
};


const ElectionsDetails = ({ title, end, electionType }) => {
  const announceResults = () => {
    console.log("Time's up!");
  };

  return (
    <div className="border-b border-b-stone-300 mb-0 py-4">
      <div className="flex justify-between items-center pt-4">
        <div className="flex flex-col gap-2 items-start">
          {/* title */}
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
            onTimerEnd={announceResults}
          />
        </div>
      </div>
    </div>
  );
};

export default VoteHome;
