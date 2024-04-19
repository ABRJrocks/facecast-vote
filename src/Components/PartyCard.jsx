import React from "react";
import { CgChevronDoubleRight } from "react-icons/cg";
import { BsBoxArrowUpRight } from "react-icons/bs";
const PartyCard = ({ party }) => {
  return (
    <div className="border-b border-b-stone-300 mb-0">
      <div className=" flex justify-between items-center pt-4 ">
        <div className="flex flex-col gap-2 items-start">
          <h2 className="md:text-2xl md:font-semibold text-xl font-bold">
            {party.name}
          </h2>
        </div>
        <div className="">
          {/* timer (rem) time*/}
          <p className="text-lg">
            <a href={party.website} target="_blank" className="flex items-center gap-2">
              website <BsBoxArrowUpRight />
            </a>
          </p>
        </div>
      </div>
      <div className="py-2 flex items-center gap-10">
        <p>{party.symbol}</p>
        <a className="flex items-center gap-1 text-regal-blue-600">
          Learn more <CgChevronDoubleRight className="h-10 pt-1" />
        </a>
      </div>
    </div>
  );
};

export default PartyCard;
