import React from "react";
import ElectionsDetails from "../Components/ElectionsDetails";
import Instructions from "../Components/Instructions";
// import axios from 'axios'
const ElectionsScreen = () => {

    return (
    <section className="px-4 py-5 md:py-5">
      <div className="py-5">
        <h1 className="pb-4 text-xl font-medium">Instructions</h1>
        <Instructions
          stepNumber={1}
          description="Lorem ipsum dolor sit amet."
        />
        <Instructions
          stepNumber={2}
          description="Consectetur adipiscing elit."
        />
        <Instructions
          stepNumber={4}
          description="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <Instructions
          stepNumber={3}
          description="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </div>
      <div className="py-3 border-b border-b-slate-300">
        <h1 className="pb-4 text-3xl font-medium">Elections in your Area</h1>
      </div>
      <ElectionsDetails title="National Assembly 2023" status="online" />
      <ElectionsDetails title="National Assembly 2023" status="offline" />
      <ElectionsDetails title="National Assembly 2023" status="upcoming" />
      <ElectionsDetails title="National Assembly 2023" status="online" />
    </section>
  );
};

export default ElectionsScreen;
