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
    message: String
  }

  type Query {
    jobs: [Job]
    job(id: String!): Job
  }

  type Mutation {
    createJob(job: JobData): CreateJobResponse
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
    token: Token
  }

  scalar Token

  input LoginData {
    email: String
    password: String
  }

  type SignupResponse {
    success: Boolean
    message: String
  }

  input SignupData {
    name: String
    email: String
    password: String
  }

  type Mutation {
    login(loginData: LoginData): LoginResponse
    signup(signupData: SignupData): SignupResponse
  }
`;

module.exports = typeDefs;
