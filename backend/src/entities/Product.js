const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Product",
  tableName: "products",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
    },
    price: {
      type: "float",
    },
    image: {
      type: "text",
    },
    category: {
      type: "varchar",
    },
  },
});