const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/queries');

// POST route for user to create a story
const userCreateStoryHandler = (req, res) => {
  const { title, chapterId } = req.body;
  const sessionUserId = req.session.userId;

  if (!sessionUserId) {
    res.status(401).send('Unauthorized');
    return;
  }

  queries.stories.create(title, chapterId, sessionUserId)
    .then((success) => {
      if (!success) {
        throw new Error('Error creating story');
      }
      return queries.stories.getData(success);
    })
    .then((story) => {
      if (!story) {
        throw new Error('Story not found');
      }
      res.render('my_stories', { story });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error creating story');
    });
};


module.exports = userCreateStoryHandler;