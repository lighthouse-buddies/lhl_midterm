const express = require('express');
const router = express.Router();
const queries = require('../../../db/queries/queries');

//this is the route for the user (owner) to delete the stories they created

//DELETE owner deleting a story
const storyDeleteHandler = async (req, res) => {

  const storyId = req.params.id;
  const userId = req.session.userId;
  const authorID = await queries.stories.author(storyId);


  console.log('storyId', storyId);
  console.log('sessionUserId', userId);
  console.log('authorID', authorID);
  if (!userId || authorID !== userId) {

    res.status(401).send('Unauthorized');
    return;
  }

  await queries.stories.remove(storyId)
  res.redirect('/stories/'+userId);

};


module.exports = storyDeleteHandler;
