import React from "react";
import { Link } from "react-router-dom";
import JobList from "../components/job/JobList";
import Layout from "../components/layout/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="flex justify-between items-end">
        <h1 className="font-bold text-6xl">Job portal ✨</h1>
        <Link
          to="/post"
          className="h-fit py-3 px-8 bg-gray-800 text-white rounded-md border-0 shadow"
        >
          Post your job!
        </Link>
      </div>
      <hr className="my-4 text-gray-500"></hr>
      <JobList></JobList>
    </Layout>
  );
};

export default HomePage;
