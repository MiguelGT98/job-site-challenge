import React from "react";
import ApplyToJobButton from "./ApplyToJobButton";

const Job = ({ title, applicantCount, description, id }) => {
  return (
    <>
      <h1 className="font-bold text-6xl text-gray-800">
        {title}
        <p className="text-left font-light mt-1 mb-4 text-gray-600 text-base">
          <span className="text-gray-800 font-bold">{applicantCount}</span>{" "}
          {applicantCount === 1 ? "person has" : "people have"} applied to this
          job
        </p>
      </h1>
      <hr className="my-4 text-gray-500"></hr>
      <p className="text-gray-600 mb-8">{description}</p>
      <div className="flex justify-end">
        <ApplyToJobButton applicantCount={applicantCount} id={id}>
          Apply to this job
        </ApplyToJobButton>
      </div>
    </>
  );
};

export default Job;
