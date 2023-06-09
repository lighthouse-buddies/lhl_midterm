/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../../db/queries/queries');


router.get('/', (req, res) => {
  res.render('users');
});

//GET user by id
router.get('/user/:id', (req, res) => {
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

// GET route for the registration
router.get('/register', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/');
  }
  return res.render('register');
});

// GET route for the login page
router.get('/login', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/');
  }
  return res.render('login');
});

// POST user login with authentication
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  userQueries.users.authenticate(email, password)
    .then((userId) => {
      if (userId) {
        req.session.userId = userId;
        res.redirect('/');
      } else {
        res.redirect('/login');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error authenticating user');
    });
});

// POST route for user registration
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  userQueries.users.create(username, email, password)
    .then((userId) => {
      if (userId) {
        userQueries.users.authenticate(email, password)
          .then(userId => {
            if (userId) {
              req.session.userId = userId;
              res.redirect('/home');
            } else {
              res.redirect('/register');
            }
          })
          .catch((error) => {
            console.log(error);
            res.redirect('/register');
          });
      } else {
        res.redirect('/register');
      }
    })
    .catch((error) => {
      console.log(error);
      res.redirect('/register');
    });
});

// POST route for logging out user
router.post('/logout', (req, res) => {
  res.clearCookie('session');
  res.clearCookie('session.sig');
  return res.redirect('/');
});


module.exports = router;
