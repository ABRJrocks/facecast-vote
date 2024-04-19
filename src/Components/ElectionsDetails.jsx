import React from "react";
import StatusBadge from "./StatusBadge";
import Timer from "./Timer";
import { CgChevronDoubleRight } from "react-icons/cg";
const ElectionsDetails = (props) => {
  const { title, status } = props;
  return (
    <div className="border-b border-b-stone-300 mb-0">
      <div className=" flex justify-between items-center pt-4 ">
        <div className="flex flex-col gap-2 items-start">
          {/* title */}
          <h2 className="md:text-2xl md:font-semibold text-xl font-bold">
            {title}
          </h2>
          <StatusBadge status={status} />
        </div>
        <div className="">
          {/* timer (rem) time*/}
          <p>Time Remaining</p>
          <Timer />
        </div>
      </div>
      <div className="py-2">
        <a href="" className="flex items-center gap-1 text-regal-blue-600">
          Learn more <CgChevronDoubleRight className="h-10 pt-1" />
        </a>
      </div>
    </div>
  );
};

export default ElectionsDetails;
