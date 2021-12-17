import React from "react";
import { Link } from "react-router-dom";

const JobPreview = ({ id, title, description, applicantCount }) => {
  return (
    <Link to={`/jobs/${id}`}>
      <li className="border py-2 px-4 rounded shadow mb-4">
        <h3 className="font-bold text-xl text-gray-800">{title}</h3>
        <p className="text-left font-light mt-0 mb-4 text-gray-600 text-sm">
          <span className="text-gray-800 font-bold">{applicantCount}</span>{" "}
          people have applied to this job
        </p>
        <p className="text-gray-600">{description}</p>
      </li>
    </Link>
  );
};

export default JobPreview;
