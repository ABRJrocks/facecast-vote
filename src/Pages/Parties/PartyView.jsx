import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataLine from "../../Components/DataLine";
import { politicalParties } from "../../data/parties.js";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getPartybyId } from "../../utils/parties";
const PartyView = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const partyData = await getPartybyId(id);
        if (!partyData) {
          return setError("No Data Found.");
        }
        setMessage("Data Fetched Successfully");
        console.log("Constituency data:", partyData);

        setData(partyData);
      } catch (error) {
        setError("Error fetching data:", error);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <section className="md:px-8 px-4">
      <div className="py-2">
        <HeaderCard title={data.name} data={data} />
      </div>
      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Contact Information</Tab>
          <Tab>Sybmol</Tab>
        </TabList>
        <TabPanel>
          <h4 className="text-lg font-medium border-b-2 border-gray-300 py-2">
            Overview
          </h4>
          <DataLine title="Acronym" value={data.acronym || "N/A"} />
          <DataLine title="Leader" value={data.leader || "N/A"} />
          <DataLine title="Foundation Year" value={data.founded || "N/A"} />
          <DataLine title="Ideology" value={data.ideology || "N/A"} />
          <DataLine title="Headquarters" value={data.headQuaters || "N/A"} />
          <DataLine title="Manifesto" value={data.manifesto || "N/A"} />
        </TabPanel>
        <TabPanel>
          <h4 className="text-lg font-medium border-b-2 border-gray-300 py-2">
            Contact Information
          </h4>
          <DataLine title="Phone" value={data.phone || "N/A"} />
          <DataLine title="Email" value={data.email || "N/A"} />
          <DataLine title="Address" value={data.address || "N/A"} />
        </TabPanel>
        <TabPanel>
          <DataLine title="Party Symbol" value="" />
          <div>
            <img
              src={data.symbol_url}
              alt={data.name}
              className="w-40 h-40 rounded-sm"
            />
          </div>
        </TabPanel>
      </Tabs>
    </section>
  );
};

const HeaderCard = ({ title, data }) => {
  return (
    <div className="border-b border-b-stone-300 mb-0 py-3">
      <div className="flex justify-between items-center pt-4">
        <div className="flex flex-col gap-2 items-start">
          <h2 className="md:text-2xl md:font-semibold text-xl font-bold">
            {title}
          </h2>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-base font-medium">Registeration Number</p>
            <p className="text-lg font-semibold">{data.reg_number || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyView;
