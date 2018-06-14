exports.up = (knex, Promise) => {
  return knex.schema.createTable('favourites', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.integer('favourite_id')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('favourites')
}
