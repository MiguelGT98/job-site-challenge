import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import Job from "../components/job/Job";
import Layout from "../components/layout/Layout";
import { GET_JOB } from "../graphql/jobs";

const JobPage = () => {
  // Get id using params from react router
  let { id } = useParams();

  // Fetch for the specific job data
  const { loading, error, data } = useQuery(GET_JOB, {
    variables: { id },
    pollInterval: 3000,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Layout>
      <Job {...data.job}></Job>
    </Layout>
  );
};

export default JobPage;
