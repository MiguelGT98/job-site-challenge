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

export { GET_JOBS_PREVIEW, GET_JOB };
