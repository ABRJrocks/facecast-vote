import React from "react";

const DataLine = ({ title, value }) => {
  return (
    <div class="flex border-b border-gray-200 py-2">
      <span class="text-gray-500">{title}</span>
      <span class="ml-auto text-gray-900">{value}</span>
    </div>
  );
};

export default DataLine;
