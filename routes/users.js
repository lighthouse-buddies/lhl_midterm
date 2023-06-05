/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/queries');


router.get('/', (req, res) => {
  res.render('users');
});

//GET stories from user by id
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const sessionUserId = req.session.userId
  if (sessionUserId === userId) {
  userQueries.getStoriesByUserId(userId)
    .then((stories) => {
      res.json({stories});
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: Could not retrieve stories');
    });
  } else {
    res.status(401).send('Not Allowed')
  }
});

//POST a new user
router.post('/', (req, res) => {
  const { username, email, password } = req.body;
  userQueries.addUser(username, email, password)
    .then((userId) => {
      req.session.userId = userId;
      res.status(201).json({ id: userId });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: Could not create user');
    });
});


module.exports = router;
