
exports.up = async function(knex) {
  await knex.schema.createTable("cars", (tbl) => {
    tbl.increments("id")
    tbl.string("VIN")
      .notNull()
      .unique()
    tbl.string("make")
      .notNull()
    tbl.string("model")
      .notNull()
    tbl.integer("mileage")
      .notNull()
    tbl.text("transmissionType")
    tbl.text("titleStatus")
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("cars")
};
