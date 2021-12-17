import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { CREATE_JOB } from "../../graphql/jobs";

const CreateJobForm = () => {
  // Use mutation from graphql api
  const [createJob, { data, loading, error }] = useMutation(CREATE_JOB);

  // Variable and function to keep form data up to date
  const [formData, setFormData] = useState({ title: "", description: "" });

  const onChange = (e) => {
    const input = e.currentTarget;

    setFormData({ ...formData, [input.id]: input.value });
  };

  const onSubmit = () => {
    createJob({ variables: { job: formData } });
  };

  if (loading) return "Submitting...";
  if (data && data.createJob && data.createJob.success) {
    return <Navigate to={`/jobs/${data.createJob.id}`} />;
  }

  return (
    <form>
      <div className="mb-4">
        <label
          className="block uppercase text-xs font-medium mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          onChange={onChange}
          className="border shadow rounded-md block py-2 px-4 w-full"
          id="title"
        ></input>
      </div>
      <div className="mb-4">
        <label
          className="block uppercase text-xs font-medium mb-2"
          htmlFor="title"
        >
          Description
        </label>
        <textarea
          onChange={onChange}
          className="border shadow rounded-md block py-2 px-4 w-full h-40"
          id="description"
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          disabled={!formData.description || !formData.title}
          type="button"
          onClick={onSubmit}
          className="h-fit py-3 px-8 bg-gray-800 text-white rounded-md border-0 shadow disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        >
          Post your job!
        </button>
      </div>
      <div className="text-center text-red-500">
        {error ? `Submission error! ${error.message}` : ""}
        {data && data.createJob && !data.createJob.success
          ? data.createJob.message
          : ""}
      </div>
    </form>
  );
};

export default CreateJobForm;
