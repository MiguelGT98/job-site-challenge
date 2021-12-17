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

      const insertedId = await Job.create(job);

      return {
        success: insertedId !== null,
        message:
          insertedId !== null
            ? "Created job succesfully"
            : "An error happened creating the job",
        id: insertedId,
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

      const token = await User.create(signupData);

      return {
        success: token !== null,
        token,
        message:
          token !== null
            ? "Created user succesfully"
            : "An error happened creating the user",
      };
    },
  },
};

const resolvers = {
  Query: { ...jobResolvers.Query, ...userResolvers.Query },
  Mutation: { ...jobResolvers.Mutation, ...userResolvers.Mutation },
};

module.exports = resolvers;
