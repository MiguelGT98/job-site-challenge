const knex = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

class Job {
  id;
  title;
  description;
  postedAt;
  applied;

  constructor(id, title, description, postedAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.postedAt = new Date(postedAt);
    this.applied = false;
  }

  static create(jobData) {
    const newJob = new Job();
    newJob.title = jobData.title;
    newJob.description = jobData.description;

    return newJob.insert();
  }

  static getAll() {
    return knex("jobs")
      .select()
      .then((jobs) => {
        return jobs.map(
          (job) => new Job(job.id, job.title, job.description, job.created_at)
        );
      });
  }

  static get(id) {
    return knex("jobs")
      .where({ id })
      .then((jobs) => {
        if (jobs.length === 0) return null;

        const job = jobs[0];
        return new Job(job.id, job.title, job.description, job.created_at);
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
