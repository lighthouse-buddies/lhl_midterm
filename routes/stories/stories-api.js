const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/queries');
const recentStoriesJsonHandler = require('./indexGet');
const myStoriesGetHandler = require('./myStoriesGet');
const ownerDeleteHandler = require('./ownerDelete');
const userCreateStoryHandler = require('./userIdCreate');

//get recent stories as json (for homepage)
router.get('/recent/json', recentStoriesJsonHandler);

//get create new story page (stories_create)
router.get('/new', (req, res) => {
  const userSession = req.session.userId;

  if (!userSession) {
    res.status(401).send('Unauthorized');
    return;
  }

  res.render('stories_create', { userCookie: userSession });
});

//get stories for user 
router.get('/:id', myStoriesGetHandler);

//owner deletes their stories
router.delete('/:id', ownerDeleteHandler);

//user creates new story
router.post('/new', userCreateStoryHandler);




//**NOT USING
//GET completed stories
router.get('/completed', (req, res) => {
  const storyId = req.params.storyId;

  queries.stories.complete(storyId)
    .then(story => {
      if (story) {
        const mark = story.complete ? 'Completed' : 'In-Progress';
        res.json({ mark, story });
      } else {
        res.status(404).send('Story not found');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('An error occurred');
    });
});



module.exports = router;
