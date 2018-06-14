
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('profile').del()
    .then(function () {
      // Inserts seed entries
      return knex('profile').insert([
        {id: 1, url: 'www.google.com', picture: 'https://tinyurl.com/ybeh5gxk', user_id: '99901'},
        {id: 2, url: 'www.flickr.com', picture: 'https://tinyurl.com/ybro2anz', user_id: '99903'},
        {id: 3, url: 'https://devacademy.co.nz', picture: 'https://tinyurl.com/yd4lhpx3', user_id: '99909'}
      ])
    })
}
