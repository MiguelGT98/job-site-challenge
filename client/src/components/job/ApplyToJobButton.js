import React from "react";

const ApplyToJobButton = ({ id, applicantCount, children }) => {
  return (
    <button className="relative w-fit h-fit py-3 px-8 bg-gray-800 text-white rounded-md border-0 shadow shrink-0">
      {children}
      <div className="absolute -top-2 -right-2 bg-red-700 rounded-full w-6 h-6">
        {applicantCount}
      </div>
    </button>
  );
};

export default ApplyToJobButton;
