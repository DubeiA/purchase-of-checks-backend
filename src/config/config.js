require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: "Wj6scdK3kcuae23eYggsBHbgLP2d4zPv",
    database: "calculation",
    host: "dpg-cjj283fjbvhs73f1sp90-a.oregon-postgres.render.com",
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: true
    },
  },
  test: {
    username: "root",
    password: "Wj6scdK3kcuae23eYggsBHbgLP2d4zPv",
    database: "calculation",
    host: "dpg-cjj283fjbvhs73f1sp90-a",
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: "Wj6scdK3kcuae23eYggsBHbgLP2d4zPv",
    database: "calculation",
    host: "dpg-cjj283fjbvhs73f1sp90-a",
    dialect: "postgres",
  },
};
