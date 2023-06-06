/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/queries');


router.get('/', (req, res) => {
  res.render('users');
});

//GET user by id
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const sessionUserId = req.session.userId;

  if (sessionUserId === userId) {
    userQueries.users.getUserById(userId)
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).send('User not found');
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send('Error retrieving user');
      });
  } else {
    res.status(401).send('Unauthorized');
  }
});

// GET user ID by story ID
router.get('/story/:id', (req, res) => {
  const storyId = req.params.id;

  userQueries.users.getIdByStoryId(storyId)
    .then((userId) => {
      if (userId) {
        res.json({ user_id: userId });
      } else {
        res.status(404).send('User ID not found');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error retrieving user ID');
    });
});

// POST user authentication
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  userQueries.users.authenticate(email, password)
    .then((userId) => {
      if (userId) {
        req.session.userId = userId;
        res.json({ message: 'Authentication successful' });
      } else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error authenticating user');
    });
});

//POST a new user
router.post('/', (req, res) => {
  const { username, email, password } = req.body;

  userQueries.users.create(username, email, password)
    .then((userId) => {
      req.session.userId = userId;
      res.status(201).json({ id: userId });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error: Could not create user');
    });
});


module.exports = router;
