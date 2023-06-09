const express = require('express');
const router = express.Router();
const queries = require('../db/queries/queries');
const { compileStoryData } = require('./route-helpers');


//TODO 
//not working because db functions are still messed up
//HOWEVER, without adding any of the variables from the template to the database, this does work. 
//GET stories for user by userID 
//This route will be used to render stories to the My_Stories template. 
//The purpose is to show the user's in progress and completed stories on the template.
//Uses a helper function from route-helpers to organize storyData.
//Should pass an object with the following structure to my_stories:
//const storyData = {
//   completed: [
//     {
//       story: {
//         id: 2,
//         title: 'Story 2',
//         first_chapter_id: 15,
//         last_chapter_id: 25,
//         complete: true,
//         deleted_at: null
//       },
//       lastChapter: {
//         id: 25,
//         story_id: 2,
//         chapter_number: 5,
//         title: 'Chapter 5',
//         content: 'This is the content of Chapter 5',
//         created_at: '2022-01-01 10:00:00',
//         updated_at: '2022-01-02 09:00:00'
//       }
//     },
//     // Additional completed stories...
//   ],
//   inProgress: [
//     {
//       story: {
//         id: 1,
//         title: 'Story 1',
//         first_chapter_id: 10,
//         last_chapter_id: 20,
//         complete: false,
//         deleted_at: null
//       },
//       lastChapter: {
//         id: 20,
//         story_id: 1,
//         chapter_number: 4,
//         title: 'Chapter 4',
//         content: 'This is the content of Chapter 4',
//         created_at: '2022-01-01 08:00:00',
//         updated_at: '2022-01-01 09:30:00'
//       }
//     },
//     // Additional in-progress stories...
//   ]
// };
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const sessionUserId = req.session.userId;

  if (sessionUserId === userId) {
    queries.stories.getStoriesByUserId(userId)
      .then((storyIds) => {
        const storyPromises = storyIds.map((storyId) => queries.stories.getData(storyId));
        Promise.all(storyPromises)
          .then((stories) => {
            const lastChaptersPromise = stories.map((story) => queries.chapters.getById(story.last_chapter_id));

            Promise.all(lastChaptersPromise)
              .then((lastChapters) => {

                const storyData = compileStoryData(stories, lastChapters);


                return res.render('my_stories', { storyData, sessionUserId });
              });
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
