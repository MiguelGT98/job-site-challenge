import { gql } from "@apollo/client";

const GET_JOBS_PREVIEW = gql`
  query GetJobs {
    jobs {
      id
      title
      description
      applicantCount
    }
  }
`;

const GET_JOB = gql`
  query GetJob($id: String!) {
    job(id: $id) {
      id
      title
      description
      postedAt
      applicantCount
    }
  }
`;

const CREATE_JOB = gql`
  mutation CreateJob($job: JobData!) {
    createJob(job: $job) {
      success
      message
      id
    }
  }
`;

export { GET_JOBS_PREVIEW, GET_JOB, CREATE_JOB };
