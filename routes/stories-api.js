const express = require('express');
const router = express.Router();
const storyQueries = require('../db/queries/queries');


//GET stories from user by id
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const sessionUserId = req.session.userId;
  if (sessionUserId === userId) {
    storyQueries.stories.getStoriesByUserId(userId)
      .then((stories) => {
        res.render('my_stories', { stories });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send('Error: Could not retrieve stories');
      });
  } else {
    res.status(401).send('Not Allowed');
  }
});

// POST creating a story
router.post('/', (req, res) => {
  const { title, chapterId } = req.body;
  const sessionUserId = req.session.userId;

  if (!sessionUserId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  storyQueries.stories.create(title, chapterId, sessionUserId)
    .then((success) => {
      if (success) {
        res.redirect('/home');
      } else {
        res.status(500).json({ message: 'Error creating story' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error creating story');
    });
});

// POST author approved chapter from any other user
router.post('/approve-chapter', requireAuth, (req, res) => {
  const { story_id, chapter_id, email, password } = req.body;

  storyQueries.stories.approve(story_id, chapter_id, email, password)
    .then((success) => {
      if (success) {
        res.json({ message: 'Chapter approved successfully' });
      } else {
        res.status(401).json({ message: 'Chapter approval failed' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error approving chapter');
    });
});

// GET story title by ID
router.get('/:id', (req, res) => {
  const storyId = req.params.id;

  storyQueries.stories.getTitleById(storyId)
    .then((title) => {
      if (title) {
        res.render('story', { title: title });
      } else {
        res.status(404).send('Story not found');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error retrieving story title');
    });
});


//DELETE owner deleting a story
router.delete('/:id', (req, res) => {
  const storyId = req.params.id;
  const sessionUserId = req.session.userId;
  const { email, password } = req.body;

  if (!sessionUserId) {
    res.status(401).send('Unauthorized');
    return;
  }

  storyQueries.chapters.getById(storyId)
    .then((ownerId) => {
      if (ownerId === sessionUserId) {
        storyQueries.stories.remove(storyId, email, password)
          .then((success) => {
            if (success) {
              res.redirect('/my_stories');
            } else {
              res.status(500).send('Error removing story');
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send('Error removing story');
          });
      } else {
        res.status(401).send('Unauthorized: You do not have permission to remove this story');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving owner information');
    });
});


module.exports = router;
