import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataLine from "../../Components/DataLine";
import { getElectiontById } from "../../utils/elections";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const ElectionPreview = () => {
  const { id } = useParams();
  const [election, setElection] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getElectiontById(id);
        if (data) {
          setElection(data);
        }
      } catch (error) {
        console.error("Error fetching election:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!election) {
    return <div>No election found with the provided id.</div>;
  }

  return (
    <section>
      <ElectionDetails
        title={election.title}
        status={election.status}
        startdate={election.start_at}
        enddate={election.end_at}
        election_Date={election.election_date}
      />
      <Tabs>
        <TabList>
          <Tab>Constituencies</Tab>
          {election.constituencies.map((constituency) => (
            <Tab key={constituency.id}>{constituency.name}</Tab>
          ))}
        </TabList>

        <TabPanel>
          <ConstituenciesTabPanel election={election} />
        </TabPanel>
        {election.constituencies.map((constituency) => (
          <TabPanel key={constituency.id}>
            <CandidatesTabPanel candidates={constituency.candidates} />
          </TabPanel>
        ))}
      </Tabs>
    </section>
  );
};

const ElectionDetails = ({ title, startdate, enddate, election_Date }) => {
  return (
    <div className="border-b border-b-stone-300 mb-0 py-3">
      <div className="flex justify-between items-center pt-4">
        <div className="flex flex-col gap-2 items-start">
          <h2 className="md:text-2xl md:font-semibold text-xl font-bold">
            {title}
          </h2>
          <StatusBadge electionDate={election_Date} />
          <p className="text-sm text-gray-500">{election_Date}</p>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-base font-medium">Start time</p>
            <p className="text-lg font-semibold">{startdate}</p>
          </div>
          <div>
            <p className="text-base font-medium">End time</p>
            <p className="text-lg font-semibold">{enddate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ electionDate }) => {
  const currentDate = new Date().getDate();
  const electionDateObj = new Date(electionDate).getDate();
  console.log("election date obj", electionDateObj, "currentDAte", currentDate);

  if (electionDateObj < currentDate) {
    return (
      <span className="inline-block text-xs px-2 py-1 leading-none text-white bg-blue-500 rounded-full uppercase font-semibold">
        Upcoming
      </span>
    );
  } else if (electionDateObj > currentDate) {
    return (
      <span className="inline-block text-xs px-2 py-1 leading-none text-white bg-gray-500 rounded-full uppercase font-semibold">
        Offline
      </span>
    );
  } else {
    return (
      <span className="inline-block text-xs px-2 py-1 leading-none text-white bg-green-500 rounded-full uppercase font-semibold">
        Online
      </span>
    );
  }
};
const ConstituenciesTabPanel = ({ election }) => {
  return (
    <div>
      {election.constituencies.map((constituency) => (
        <div key={constituency.id}>
          <DataLine title={constituency.name} />
        </div>
      ))}
    </div>
  );
};

const CandidatesTabPanel = ({ candidates }) => {
  return (
    <div>
      {candidates.map((candidate) => (
        <div key={candidate.id}>
          <DataLine title="Candidate" value={candidate.name} />
        </div>
      ))}
    </div>
  );
};

export default ElectionPreview;
