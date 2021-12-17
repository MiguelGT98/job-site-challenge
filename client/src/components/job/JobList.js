import React from "react";
import JobPreview from "./JobPreview";

import { useQuery } from "@apollo/client";
import { GET_JOBS_PREVIEW } from "../../queries/jobs";

const JobList = () => {
  const { loading, error, data } = useQuery(GET_JOBS_PREVIEW);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul>
      {data.jobs.map((job) => (
        <JobPreview {...job}></JobPreview>
      ))}
    </ul>
  );
};

export default JobList;
