const express = require('express');
const router = express.Router();
const queries = require('../db/queries/queries');


//GET stories for user by userID 
//This route will be used to render stories to the My_Stories template. 
//The purpose is to show the user's in progress and completed stories. 
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const sessionUserId = req.session.userId;

  if (sessionUserId === userId) {
    queries.stories.getStoriesByUserId(userId)
      .then((storyIds) => {
        const storyPromises = storyIds.map((storyId) => {
          const storyPromise = storyQueries.stories.getById(storyId);
          const chaptersPromise = storyQueries.chapters.getChaptersByStoryId(storyId);
          return Promise.all([storyPromise, chaptersPromise]);
        });

        Promise.all(storyPromises)
          .then((stories) => {
            res.render('my_stories', { stories, sessionUserId });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send('Error: Could not retrieve stories');
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send('Error: Could not retrieve story IDs');
      });
  } else {
    res.status(401).send('Not Allowed');
  }
});

// GET completed stories
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

// POST creating a story
router.post('/', (req, res) => {
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
      res.render('my-stories', { story });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error creating story');
    });
});

//DELETE owner deleting a story
router.delete('/:id', (req, res) => {
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
        res.redirect('/my_stories');
      } else {
        throw new Error('Error removing story');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error removing story');
    });
});


module.exports = router;
