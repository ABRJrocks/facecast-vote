import React from "react";
import ElectionCard from "../Components/ElectionCard";

import ElectionsDetails from "../Components/ElectionsDetails";
// import ToggleType from "../Components/ToggleType";
const OpenElections = () => {
  return (
    <section className="md:px-8 py-4 px-4">
      
     <div>
        <ElectionsDetails title = 'Open Elections 2024' status='online'/>
     </div>
      <div className="py-4 flex items-center justify-between">
        <h3 className="text-2xl font-semibold">
          PP-<span className="font-bold">156</span>
        </h3>
        <h3 className="text-lg font-normal">
          Date: <span className="font-semibold">Feb 24, 2024</span>
        </h3>
      </div>
      <div className="grid px-4  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <ElectionCard />
        <ElectionCard />
        <ElectionCard />
        <ElectionCard />
        <ElectionCard />
        <ElectionCard />
      </div>
    </section>
  );
};

export default OpenElections;
