const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/queries');
const { compileLastStoryData } = require('.route-helpers');

//this is the route handler for passing the completed and in progress stories for the user to my_stories template
//with their associated data for last chapters  
//(my_stories template will show the in progress and completed stories for that user)
//the stories will be shown with preview of the last chapter on my_stories
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
            const lastChaptersPromise = stories.map((story) => queries.chapters.getData(story.last_chapter_id));

            Promise.all(lastChaptersPromise)
              .then((lastChapters) => {

                const storyData = compileLastStoryData(stories, lastChapters);


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


module.exports = router;