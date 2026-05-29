const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Order",
  tableName: "orders",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    customer: {
      type: "json",
    },
    items: {
      type: "json",
    },
    total: {
      type: "float",
    },
    status: {
      type: "varchar",
      default: "pending",
    },
  },
});