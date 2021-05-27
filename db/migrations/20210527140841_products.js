exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('product_id');
    table.integer('store_id').notNullable();
    table.integer('category_id').notNullable();
    table.string('name').notNullable();
    table.string('img');
    table.integer('price').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  knex.schema.dropTableIfExists('products');
};
