import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Alert from "../../Components/Alert";
import { getCandidatesbyId } from "../../utils/candidates";
import DataLine from "../../Components/DataLine";
const CandPreview = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const candData = await getCandidatesbyId(id);
        if (!candData) {
          return setError("No Data Found.");
        }
        setMessage("Data Fetched Successfully");
        console.log("Constituency data:", candData);

        setData(candData);
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
      {message && (
        <Alert
          message={message}
          type="success"
          dismissible={true}
          autoHideDelay={3000}
        />
      )}
      {error && (
        <Alert
          message={error}
          type="error"
          dismissible={true}
          autoHideDelay={3000}
        />
      )}
      <div className="py-2">
        <ConstituencyHeaderCard title={data.name || "N/A"} data={data} />
      </div>
      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Education</Tab>
          <Tab>Assets</Tab>
        </TabList>

        <TabPanel>
          <div>
            <h4 className="text-lg font-medium border-b-2 border-gray-300 py-2">
              Overview
            </h4>

            <DataLine title="Affiliation" value={data.affiliation.name || "N/A"} />
            <div>
            <img
              src={data.affiliation.symbol_url}
              alt={data.name}
              className="w-16 h-16 rounded-full mr-4"
            />
          </div>
            <DataLine title="Email" value={data.email || "N/A"} />
            <DataLine title="Phone" value={data.phone || "N/A"} />
            <DataLine
              title="Address"
              value={
                `${data.address.houseNo} ${data.address.area} ${data.address.city} ${data.address.province}` ||
                "N/A"
              }
            />
            <DataLine title="Province" value={data.address.province || "N/A"} />
            {/* Add more DataLine components for other data */}
          </div>
        </TabPanel>
        <TabPanel>
          {/* Render education data */}
          <h4 className="text-lg font-medium border-b-2 border-gray-300 py-2">
            Education Details
          </h4>
          <div>
            {data.education.map((edu, index) => (
              <div key={index}>
                <DataLine title="Degree" value={edu.degree} />
                <DataLine title="Institution" value={edu.institute} />
                <DataLine title="Year" value={edu.year} />
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          {/* Render assets data */}
          <h4 className="text-lg font-medium border-b-2 border-gray-300 py-2">
            Assets
          </h4>
          <div>
            <DataLine title="Total Assets" value={data.assets} />
          </div>
        </TabPanel>
      </Tabs>
    </section>
  );
};

const ConstituencyHeaderCard = ({ title, data }) => {
  return (
    <div className="border-b border-b-stone-300 mb-0 py-3">
      <div className="flex justify-between items-center pt-4">
        <div className="flex flex-col gap-2 items-start">
          <div className="flex items-center">
            <h2 className="md:text-2xl md:font-semibold text-xl font-bold">
              {title}
            </h2>
          </div>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div>
            <img
              src={data.imageURL}
              alt={data.name}
              className="w-16 h-16 rounded-full mr-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandPreview;
