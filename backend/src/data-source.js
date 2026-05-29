const { DataSource } = require("typeorm");
const Product = require("./entities/Product");
const Order = require("./entities/Order");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "mens_store",
  synchronize: true,
  logging: false,
  entities: [Product, Order],
});

module.exports = { AppDataSource };