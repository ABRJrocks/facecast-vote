import React from 'react';

const Instructions = ({ stepNumber, description }) => {
  return (
    <div className="flex items-center mb-2">
      <div className="flex-shrink-0 h-5 w-5 rounded-md bg-slate-200 flex items-center justify-center text-slate-700">
        {stepNumber}
      </div>
      <div className="ml-4">
        <p className="text-base font-medium text-gray-900">{description}</p>
      </div>
    </div>
  );
};

export default Instructions;
