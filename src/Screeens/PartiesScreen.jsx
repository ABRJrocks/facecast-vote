import React from "react";
import { parties } from "../data/parties";
import PartyCard from "../Components/PartyCard";
const PartiesScreen = () => {
  return (
    <section>
      <div className="py-5">
        <div className="border-b border-b-steal-300 py-4">
          <h1 className="text-3xl font-medium">Parties</h1>
        </div>
        <div className="">
          {parties.map((party) => (
            <PartyCard key={party.id} party={party} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartiesScreen;
