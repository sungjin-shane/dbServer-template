
exports.up = (knex, Promise) => {
  return knex.schema.createTable('profile', (table) => {
    table.increments('id').primary()
    table.string('url')
    table.string('picture')
    table.integer('user_id')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('profile')
}
