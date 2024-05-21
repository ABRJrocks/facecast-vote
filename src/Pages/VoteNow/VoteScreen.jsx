import React, { useEffect, useState } from "react";
import ElectionsDetails from "../../Components/Utils/ElectionsDetails";
import ElectionCard from "../../Components/ElectionCard";
import { useParams, useNavigate } from "react-router-dom";
import { createUserVote, checkIfUserVoted } from "../../utils/userVotes";
import { getElectiontById } from "../../utils/elections";
import { useAuth } from "../../context/AuthContext";
import Alert from "../../Components/Alert";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { decrementVoteAmount } from "../../config/Slices/walletSlice";
import toast from "react-hot-toast";

const VoteScreen = () => {
  const dispatch = useDispatch();
  const walletValue = useSelector((state) => state.voteAmountWallet.value);

  const { id } = useParams();
  const { currUser } = useAuth();
  const navigate = useNavigate();
  const [election, setElection] = useState({});
  const [constituency, setConstituency] = useState({});
  const [voted, setVoted] = useState(false);
  const [verified, setVerified] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [message, setMessage] = useState("");
  const [authError, setAuthError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(false); // State to handle retry

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const loadFaceIOScript = () => {
    return new Promise((resolve, reject) => {
      if (typeof window.faceIO !== "undefined") {
        console.log("faceIO already loaded");
        resolve(window.faceIO);
        return;
      }

      const existingScript = document.getElementById("faceio-script");
      if (existingScript) {
        existingScript.onload = () => {
          console.log("faceIO script loaded");
          resolve(window.faceIO);
        };
        existingScript.onerror = () => {
          console.error("Failed to load FaceIO script");
          reject(new Error("Failed to load FaceIO script"));
        };
        return;
      }

      const script = document.createElement("script");
      script.id = "faceio-script";
      script.src = "https://cdn.faceio.net/fio.js";
      script.async = true;
      script.onload = () => {
        console.log("faceIO script loaded");
        if (typeof window.faceIO !== "undefined") {
          resolve(window.faceIO);
        } else {
          reject(new Error("faceIO is not defined after script load"));
        }
      };
      script.onerror = () => {
        console.error("Failed to load FaceIO script");
        reject(new Error("Failed to load FaceIO script"));
      };
      document.body.appendChild(script);
    });
  };

  const authenticateUser = async () => {
    setAuthError(false);
    setRetry(false);
    try {
      const faceIO = await loadFaceIOScript();
      if (!faceIO) {
        throw new Error("faceIO is undefined after loading the script");
      }
      const userData = await faceIO.authenticate({ locale: "auto" });
      console.log("Success, user identified", userData);
      setVerified(true);
      faceIO.restartSession();
    } catch (error) {
      console.error("Error authenticating user:", error);
      setAuthError(true); // Set authentication error flag
      toast.error("Authentication failed. Please try again.");
      setRetry(true); // Enable retry option
    }
  };

  useEffect(() => {
    if (!verified) {
      authenticateUser();
    }
  }, [retry]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/voter");
    }, 60000); // 1 minute in milliseconds

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleUserExists = (exists) => {
    if (exists) {
      setUserExists(exists);
      setVerified(true);
    } else {
      setVerified(false);
      setMessage(
        <div className="p-4 bg-red-100 rounded-md">
          Error Validating User Please Try Again.{" "}
          <button onClick={handleNavigateButtonClick} className="text-red-800">
            Go back
          </button>
        </div>
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedElection = await getElectiontById(id);
        const userArea = "Lahore"; // Replace with actual user's area
        const matchingConstituency = fetchedElection.constituencies.find(
          (constituency) => constituency.name.includes(userArea)
        );
        console.log("matchingConstituency", matchingConstituency);
        setElection(fetchedElection);
        setConstituency(matchingConstituency);
      } catch (error) {
        console.error("Error fetching election:", error);
        setMessage("Error fetching election details, please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleNavigateButtonClick = () => {
    navigate("/voter");
  };

  useEffect(() => {
    const difference = +new Date(election.end_at) - +new Date();

    if (difference <= 0) {
      setMessage(
        <div className="p-4 bg-regal-blue-100 rounded-md">
          Election has ended. Results will be announced soon.{" "}
          <button
            onClick={handleNavigateButtonClick}
            className="text-regal-blue-600"
          >
            Go back
          </button>
        </div>
      );
    }
  }, [election, constituency]);

  useEffect(() => {
    const checkIfVoted = async () => {
      try {
        const ifVoted = await checkIfUserVoted(
          currUser.uid,
          constituency.const_id,
          election.id
        );
        setVoted(ifVoted);
        if (ifVoted) {
          setMessage("You have already voted");
        }
      } catch (error) {
        console.error("Error checking if user voted:", error);
        setMessage("Error checking vote status, please try again.");
      }
    };
    if (currUser && constituency.const_id && election.id) {
      checkIfVoted();
    }
  }, [currUser, constituency, election]);

  const handleOtherAuth = () => {
    openModal();
  };

  const handleVote = async (candidateId) => {
    console.log("voted for ", candidateId);
    console.log("user", currUser.uid);
    if (walletValue < 5) {
      toast.error("You don't have enough balance to vote");
      return;
    } else {
      try {
        if (!voted) {
          await createUserVote({
            candidate_id: candidateId,
            election_id: election.id,
            user_id: currUser.uid,
            constituency_id: constituency.const_id,
            dated: new Date().toISOString(),
          });
          dispatch(decrementVoteAmount());
          console.log("voted successfully");
          toast.success("Voted Successfully");
          setVoted(true);
        } else {
          console.log("user has already voted");
        }
      } catch (error) {
        console.log("error", error);
        toast.error("Error voting, please try again.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          onUserExists={handleUserExists}
        />
      )}
      {verified ? (
        <section className="md:px-8 py-4 px-4">
          <div>
            <ElectionsDetails
              title={election.title}
              end={election.end_at}
              electionType={election.type}
              id={id}
            />
          </div>

          <div className="py-4 flex items-center justify-between">
            <h3 className="text-lg font-normal">
              Date:{" "}
              <span className="font-semibold">
                {new Date(election.start_at).toLocaleString() || ""}
              </span>
            </h3>
          </div>
          {message.length > 0 && (
            <Alert
              message={message}
              type="success"
              dismissible={true}
              autoHideDelay={8000}
            />
          )}
          {voted && (
            <div className="bg-green-200 p-4 flex items-center rounded-md my-5">
              <p className="text-green-800 font-semibold">
                You have Voted Successfully
              </p>
            </div>
          )}
          <div className="grid px-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {constituency.candidates &&
              constituency.candidates.map((candidate) => (
                <ElectionCard
                  key={candidate.id}
                  candidate={candidate}
                  onVote={handleVote}
                  disabled={voted}
                />
              ))}
          </div>
        </section>
      ) : (
        <div className="bg-red-200 p-4 flex items-center rounded-md my-5">
          <p className="text-red-950 font-semibold">
            Auth failed. Please try again.
          </p>
          <button className="mx-2" onClick={() => setRetry((prev) => !prev)}>
            Retry Authentication
          </button>
          <button className="mx-2" onClick={handleOtherAuth}>
            Other method
          </button>
        </div>
      )}
    </div>
  );
};

export default VoteScreen;
