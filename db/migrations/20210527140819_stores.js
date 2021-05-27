exports.up = function (knex) {
  return knex.schema.createTable('stores', (table) => {
    table.increments('store_id').notNullable();
    table.string('name').notNullable();
    table.binary('logo');
    table.string('description').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('stores');
};
