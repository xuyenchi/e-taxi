const Pool = require('pg').Pool;
const config = require('../../config');

// tạo kết nối tới database postges
const pgPool = new Pool({
  host: config.HOST, // host của postgres
  database: config.DATABASE, // database name
  user: config.USER, // user login
  password: config.PASSWORD, // password login
  port: config.PORT // port của postgres
});

module.exports = pgPool;