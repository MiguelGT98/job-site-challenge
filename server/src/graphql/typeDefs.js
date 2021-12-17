const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Job definitions
  type Job {
    id: String
    title: String
    description: String
    postedAt: Date
    applicantCount: Int
  }

  scalar Date

  input JobData {
    title: String
    description: String
  }

  type CreateJobResponse {
    success: Boolean
    id: String
    message: String
  }

  # User definitions
  input UserData {
    id: String
    name: String
    email: String
    password: String
  }

  type LoginResponse {
    success: Boolean
    message: String
    token: String
  }

  input LoginData {
    email: String
    password: String
  }

  type SignupResponse {
    success: Boolean
    message: String
    token: String
  }

  input SignupData {
    name: String
    email: String
    password: String
  }

  input ApplicationData {
    id: String
    token: String
  }

  type ApplyToJobResponse {
    success: Boolean
    message: String
  }

  # Queries and mutations for both models
  type Query {
    jobs: [Job]
    job(id: String!): Job
  }

  type Mutation {
    login(loginData: LoginData): LoginResponse
    signup(signupData: SignupData): SignupResponse
    createJob(job: JobData): CreateJobResponse
    applyToJob(application: ApplicationData): ApplyToJobResponse
  }
`;

module.exports = typeDefs;
