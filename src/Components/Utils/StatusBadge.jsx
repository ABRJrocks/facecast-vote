import React from 'react';

const StatusBadge = ({ status }) => {
  // Determine the background and text color based on the status
  let bgColor = '';
  let textColor = '';

  switch (status) {
    case 'online':
      bgColor = 'bg-green-600';
      textColor = 'text-white';
      break;
    case 'offline':
      bgColor = 'bg-red-600';
      textColor = 'text-white';
      break;
    case 'upcoming':
      bgColor = 'bg-yellow-500';
      textColor = 'text-white';
      break;
    default:
      bgColor = 'bg-gray-600';
      textColor = 'text-white';
  }

  return (
    <span className={`inline-block px-2 py-1 text-sm rounded-md ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
