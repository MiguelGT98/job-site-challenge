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

  static create(jobData) {
    const newJob = new Job();
    newJob.title = jobData.title;
    newJob.description = jobData.description;

    return newJob.insert();
  }

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

  insert() {
    return knex("jobs")
      .insert({
        id: uuidv4(),
        title: this.title,
        description: this.description,
        created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      })
      .then((response) => {
        console.log(response);
        return true;
      })
      .catch((e) => {
        console.error("Error:", e);
        return false;
      });
  }

  delete() {}
}

module.exports = Job;
