const knexConfig = require("./knex.config");
const knex = require("knex");

const connectionPool = knex.default(knexConfig);

module.exports = connectionPool;
