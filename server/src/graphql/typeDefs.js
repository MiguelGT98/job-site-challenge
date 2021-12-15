const { gql } = require("apollo-server-express");

const typeDefs = gql`
  input JobData {
    title: String
    description: String
  }

  type Job {
    id: String
    title: String
    description: String
    postedAt: Date
    applied: Boolean
  }

  scalar Date

  type Query {
    jobs: [Job]
    job(id: String!): Job
  }

  type Mutation {
    createJob(job: JobData): CreateJobResponse
  }

  type CreateJobResponse {
    success: Boolean
    message: String
  }
`;

module.exports = typeDefs;
