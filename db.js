const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getUser: getUser,
  getUsers: getUsers,
  getProfiles,
  addUser,
  addProfile,
  getBlog,
  getBlogs,
  createblog,
  getFavourites,
  getFavouritepost
}

function getUsers (testConn) {
  const conn = testConn || connection
  return conn('users').select()
}

function getUser (id, testConn) {
  const conn = testConn || connection
  return conn('users').where('id', id).first()
}

function getProfiles (id, testConn) {
  const conn = testConn || connection
  return conn('users')
    .join('profile', 'users.id', 'profile.user_id')
    .select()
    .where('users.id', id)
}

function addUser (username, email, testConn) {
  const conn = testConn || connection
  return conn('users').insert([
    {name: username, email: email}
  ])
}

function addProfile (userid, url, picture, testConn) {
  // console.log(userid[0], url, picture)
  const conn = testConn || connection
  return conn('profile').insert([
    {url: url, picture: picture, user_id: userid[0]}
  ])
}

function getBlog (id, conn = connection) {
  return conn('posts')
    .select()
    .where('id', id)
}

function getBlogs (conn = connection) {
  return conn('users')
    .join('posts', 'posts.user_id', 'users.id')
    .select('users.name', 'posts.title')
}

function createblog (id, title, content, conn = connection) {
  return conn('posts').insert([
    {title: title, content: content, user_id: id}
  ])
}

function getFavourites (id, conn = connection) {
  return conn('users as u1')
    .join('favourites as f', 'u1.id', 'f.user_id')
    .join('users as u2', 'u2.id', 'f.favourite_id')
    .select('f.user_id', 'u1.name as name1', 'f.favourite_id', 'u2.name as name2')
    .where('u1.id', id)
}

function getFavouritepost (id, conn = connection) {
  return conn('users as u1')
    .join('favourites as f', 'u1.id', 'f.user_id')
    .join('users as u2', 'u2.id', 'f.favourite_id')
    .join('posts as p', 'p.user_id', 'u2.id')
    .select('u1.name as name1', 'p.title as title', 'u2.name as name2')
    .where('u1.id', id)
}
