import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataLine from "../../Components/DataLine";
// import { constituencies } from "../../data/const.js";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getConstituencyById } from "../../utils/constituency.js";

const ConstPreview = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const constData = await getConstituencyById(id);
        if (!constData) {
          return <div>No Data Found.</div>;
        }
        console.log("Constituency data:", constData);
        setData(constData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <section className="md:px-8 px-4">
      <div className="py-2">
        <ConstituencyHeaderCard title={data.name} data={data} />
      </div>
      <Tabs>
        <TabList>
          <Tab>Demographics</Tab>
          <Tab>Age Distribution</Tab>
          <Tab>Gender Distribution</Tab>
          <Tab>Education Levels</Tab>
        </TabList>

        <TabPanel>
          <DataLine title="Registered Voters" value={data.voters || "N/A"} />
        </TabPanel>
        <TabPanel>
          <h4 className="text-lg font-medium border-b-2 border-gray-300 py-2">
            Population by Age
          </h4>
          {data.age_distribution && (
            <>
              <DataLine
                title="Young Adults (18yo - 25yo)"
                value={data.age_distribution.young_adults || "N/A"}
              />
              <DataLine
                title="Adults (26yo - 40yo)"
                value={data.age_distribution.adults || "N/A"}
              />
              <DataLine
                title="Middle Ages (41yo - 60yo)"
                value={data.age_distribution.middleaged || "N/A"}
              />
              <DataLine
                title="Seniors (60yo +)"
                value={data.age_distribution.seniors || "N/A"}
              />
            </>
          )}
        </TabPanel>
        <TabPanel>
          <h4 className="text-lg font-medium border-b-2 border-gray-300 py-2">
            Population by Gender
          </h4>
          <DataLine
            title="Male"
            value={data.gender_distribution.male || "N/A"}
          />
          <DataLine
            title="Female"
            value={data.gender_distribution.female || "N/A"}
          />
          <DataLine
            title="Others"
            value={data.gender_distribution.other || "N/A"}
          />
        </TabPanel>
        <TabPanel>
          <h4 className="text-lg font-medium border-b-2 border-gray-300 py-2">
            Population by Education Levels
          </h4>
          <DataLine
            title="Primary School"
            value={data.education_levels.primary_school || "N/A"}
          />
          <DataLine
            title="Secondary School"
            value={data.education_levels.secondary_school || "N/A"}
          />
          <DataLine
            title="Higher Education"
            value={data.education_levels.higher_education || "N/A"}
          />
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
          <h2 className="md:text-2xl md:font-semibold text-xl font-bold">
            {title}
          </h2>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-base font-medium">Area</p>
            <p className="text-lg font-semibold">{data.region || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstPreview;
