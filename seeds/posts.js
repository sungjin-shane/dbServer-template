
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, title: 'First blog', content: 'lots of words', user_id: 99901},
        {id: 2, title: 'Another blog', content: 'lots of words', user_id: 99909},
        {id: 3, title: 'One more blog', content: 'lots of words', user_id: 99917},
        {id: 4, title: 'New blog', content: 'lots of words', user_id: 99917}
      ])
    })
}
