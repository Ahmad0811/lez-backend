exports.up = function (knex) {
  return knex.schema.createTable('categories', (table) => {
    table.increments('category_id');
    table.integer('store_id').notNullable();
    table.string('name').notNullable();
    table.string('logo');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('categories');
};
