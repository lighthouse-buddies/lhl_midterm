const express = require('express');
const router  = express.Router();
const storyQueries = require('../db/queries/queries');


//GET stories from user by id
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const sessionUserId = req.session.userId
  if (sessionUserId === userId) {
  storyQueries.stories.getStoriesByUserId(userId)
    .then((stories) => {
      res.json({stories});
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: Could not retrieve stories');
    });
  } else {
    res.status(401).send('Not Allowed')
  }
});

module.exports = router;
