/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const Users = require('../../db/queries/users/users');
const userIdGetHandler = require('./idGet');


// router.getData('/', (req, res) => {
//   res.render('users');
// });

//GET user by id
router.get('/user/:id', userIdGetHandler);

// GET user ID by story ID
router.get('/story/:id', (req, res) => {
  const storyId = req.params.id;
//TODO should be stories
  Users.getData(storyId)
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


// // GET route for the login page
// router.get('/login', (req, res) => {
//   if (!req.session.userId) {
//     return res.render('login');
//   }
//   return res.redirect('/');
// });


// POST route for user registration(working)




module.exports = router;
