import React from "react";
import CreateJobForm from "../components/job/CreateJobForm";
import Layout from "../components/layout/Layout";

const CreateJobPage = () => {
  return (
    <Layout>
      <h1 className="font-bold text-6xl">Post a job ✨</h1>
      <hr className="my-4 text-gray-500"></hr>

      <CreateJobForm></CreateJobForm>
    </Layout>
  );
};

export default CreateJobPage;
