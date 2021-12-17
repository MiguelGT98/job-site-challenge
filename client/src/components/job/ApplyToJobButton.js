import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { APPLY_TO_JOB } from "../../graphql/jobs";

const ApplyToJobButton = ({ id, applicantCount, children }) => {
  // Use mutation from graphql api
  const [applyToJob, { data, loading, error }] = useMutation(APPLY_TO_JOB);

  const user = useAuth();

  useEffect(() => {
    if (data !== undefined && data.applyToJob) {
      if (data.applyToJob.success) {
        window.alert(
          "Applied to job :) You'll hear back from the company soon!"
        );
      } else {
        window.alert(
          `${data.applyToJob.message}. Are you sure you aren't trying to reapply?`
        );
      }
    }
  }, [data]);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  if (!user) {
    return (
      <Link
        className="relative w-fit h-fit py-3 px-8 bg-gray-800 text-white rounded-md border-0 shadow shrink-0"
        to="/auth"
      >
        Sign in to apply for the job
        <div className="absolute -top-2 -right-2 bg-red-700 rounded-full w-6 h-6 text-center">
          {applicantCount}
        </div>
      </Link>
    );
  }

  return (
    <button
      onClick={() =>
        applyToJob({
          variables: { application: { id, token: user.token } },
        })
      }
      className="relative w-fit h-fit py-3 px-8 bg-gray-800 text-white rounded-md border-0 shadow shrink-0"
    >
      {children}
      <div className="absolute -top-2 -right-2 bg-red-700 rounded-full w-6 h-6 text-center">
        {applicantCount}
      </div>
    </button>
  );
};

export default ApplyToJobButton;
