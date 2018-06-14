const express = require('express')

const db = require('../db')

const router = express.Router()

router.get('/', (req, res) => {
  db.getUsers()
    .then(users => {
      res.render('index', {users: users})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/profile/:id', (req, res) => {
  const id = req.params.id
  db.getProfiles(id)
    .then(user => {
      // console.log(user)
      res.render('profile', {user: user[0]})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/adduser', (req, res) => {
  res.render('adduser')
})

router.post('/adduser', (req, res) => {
  const username = req.body.username
  const email = req.body.email
  const url = req.body.url
  const picture = req.body.picture

  db.addUser(username, email)
    .then((userid) => {
      return db.addProfile(userid, url, picture)
        // .then(() => {
        //   res.redirect('/')
        // })
        .catch(err => {
          res.status(500).send('DATABASE ERROR: ' + err.message)
        })
    })
    .then(() => {
      res.redirect('/')
    })
})

router.get('/blog/:id', (req, res) => {
  const id = req.params.id
  db.getBlog(id)
    .then(blog => {
    // console.log(user)
      res.render('blog', {blog: blog})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/bloglist', (req, res) => {
  db.getBlogs()
    .then(blogs => {
      console.log(blogs)
      res.render('bloglist', {blogs: blogs})
    })
    .catch(err => {
      res.status(500).send('Database Error: ' + err.message)
    })
})

router.get('/createblog', (req, res) => {
  db.getUsers()
    .then(users => {
      res.render('createblog', {users: users})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/createblog', (req, res) => {
  const id = req.body.users
  const title = req.body.title
  const content = req.body.content
  console.log(req.body)
  db.createblog(id, title, content)
    .then(() => {
      res.redirect('/bloglist')
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/favourites/:id', (req, res) => {
  const id = req.params.id
  db.getFavourites(id)
    .then(users => {
      const user = {
        name: users[0].name1,
        userdata: users
      }
      console.log(users)
      res.render('favourites', {user: user})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/favouriteposts/:id', (req, res) => {
  const id = req.params.id
  db.getFavouritepost(id)
    .then(users => {
      const user = {
        name: users[0].name1,
        userdata: users
      }
      console.log(users)
      res.render('favouriteposts', {user: user})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
