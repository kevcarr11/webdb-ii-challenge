exports.up = async function(knex) {
  await knex.schema.alterTable("cars", (tbl) => {
    tbl.integer("year")
  })
};

exports.down = async function(knex) {
  await knex.schema.alterTable("cars", (tbl) => {
    tbl.dropColumn("year")
  })
};
