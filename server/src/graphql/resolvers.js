const Job = require("../models/job");

const resolvers = {
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

module.exports = resolvers;
