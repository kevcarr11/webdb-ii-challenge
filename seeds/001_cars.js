
exports.seed = async function(knex) {
  await knex("cars").insert([
    { vin: "", make: "", model: "", year: "", mileage: "", transmissionType: "", titleStatus: "" }
  ])
};
