const Job = require("../models/job");
const User = require("../models/user");

// Job resolvers
const jobResolvers = {
  Query: {
    jobs: async () => {
      const jobs = await Job.getAll();

      return jobs;
    },
    job: async (_, args) => {
      const { id } = args;
      const job = await Job.get(id);

      if (!job) throw new Error(`Job with id ${id} not found.`);

      return job;
    },
  },
  Mutation: {
    createJob: async (_, args) => {
      const { job } = args;

      const inserted = await Job.create(job);

      return {
        success: inserted,
        message: inserted
          ? "Created job succesfully"
          : "An error happened creating the job",
      };
    },
  },
};

const userResolvers = {
  Mutation: {
    login: async (_, args) => {
      const { loginData } = args;

      const token = await User.login(loginData);

      return {
        success: token !== null,
        token,
        message: token !== null ? "Logged in succesfully" : "Wrong credentials",
      };
    },
    signup: async (_, args) => {
      const { signupData } = args;

      const inserted = await User.create(signupData);

      return {
        success: inserted,
        message: inserted
          ? "Created user succesfully"
          : "An error happened creating the user",
      };
    },
  },
};

resolvers = { ...jobResolvers, ...userResolvers };

module.exports = resolvers;
