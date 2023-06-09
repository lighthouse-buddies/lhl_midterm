const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/queries');

//this is the route for the user (owner) to delete the stories they created

//DELETE owner deleting a story
const ownerDeleteHandler = (req, res) => {
  const storyId = req.params.id;
  const sessionUserId = req.session.userId;

  if (!sessionUserId) {
    res.status(401).send('Unauthorized');
    return;
  }

  queries.chapters.getById(storyId)
    .then((ownerId) => {
      if (ownerId !== sessionUserId) {
        throw new Error('You do not have permission to remove this story');
      }
      return queries.stories.remove(storyId, email, password);
    })
    .then((success) => {
      if (success) {
        res.redirect('my_stories');
      } else {
        throw new Error('Error removing story');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error removing story');
    });
};


module.exports = ownerDeleteHandler;