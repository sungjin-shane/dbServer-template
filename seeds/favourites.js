
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('favourites').del()
    .then(function () {
      // Inserts seed entries
      return knex('favourites').insert([
        {id: 1, user_id: 99901, favourite_id: 99917},
        {id: 2, user_id: 99901, favourite_id: 99918},
        {id: 3, user_id: 99902, favourite_id: 99917},
        {id: 4, user_id: 99902, favourite_id: 99920}
      ])
    })
}
