const knex = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

class Job {
  id;
  title;
  description;
  postedAt;
  applicantCount;

  constructor(id, title, description, postedAt, applicantCount) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.postedAt = new Date(postedAt);
    this.applicantCount = applicantCount;
  }

  // Create a new job and insert it into the database.
  static create(jobData) {
    const newJob = new Job(uuidv4(), jobData.title, jobData.description);

    return newJob.insert();
  }

  // Retrieve all jobs from the database with their applicantCount
  // Returns an array of job instances
  static getAll() {
    return knex("jobs AS j")
      .leftJoin("applications AS a", "j.id", "=", "a.job_id")
      .select(["j.id", "j.description", "j.title", "j.created_at"])
      .groupBy(["j.id", "j.description", "j.title", "j.created_at"])
      .count("a.id", { as: "applicant_count" })
      .then((jobs) =>
        jobs.map(
          (job) =>
            new Job(
              job.id,
              job.title,
              job.description,
              job.created_at,
              job.applicant_count
            )
        )
      );
  }

  // Retrieve a job with the given id from the database with it's applicantCount
  // Returns a job instance
  static get(id) {
    return knex("jobs as j")
      .where("j.id", "=", id)
      .leftJoin("applications AS a", "j.id", "=", "a.job_id")
      .select(["j.id", "j.description", "j.title", "j.created_at"])
      .groupBy(["j.id", "j.description", "j.title", "j.created_at"])
      .count("a.id", { as: "applicant_count" })
      .then((jobs) => {
        if (jobs.length === 0) return null;

        const job = jobs[0];
        return new Job(
          job.id,
          job.title,
          job.description,
          job.created_at,
          job.applicant_count
        );
      });
  }

  // Insert a job object into the database
  // Return the id if job was inserted and null if it was not
  insert() {
    return knex("jobs")
      .insert({
        id: this.id,
        title: this.title,
        description: this.description,
        created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      })
      .then((response) => {
        console.log(response);
        return this.id;
      })
      .catch((e) => {
        console.error("Error:", e);
        return null;
      });
  }
}

module.exports = Job;
