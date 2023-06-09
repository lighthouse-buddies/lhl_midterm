const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/queries');
const { compileFirstStoryData } = require('.route-helpers');


//GET recent stories to render from front-end to homepage
//This route should return a JSON object containing the 15 most recent stories' information, and corresponding chapter information, as well as the username for each first chapter which can then be accessed by the front end.
router.get('/recent/json', (req, res) => {
  queries.stories.recent(15)
    .then(recentStoryIds => {
      const recentStoryPromises = recentStoryIds.map(storyId => queries.stories.getData(storyId));
      Promise.all(recentStoryPromises)
        .then(recentStories => {
          const firstChaptersPromise = recentStories.map(story => {
            return queries.chapters.getById(story.first_chapter_id)
              .then(firstChapter => {
                return queries.users.get(firstChapter.user_id)
                  .then(user => {
                    firstChapter.username = user ? user.username : null;
                    return firstChapter;
                  });
              });
          });
          Promise.all(firstChaptersPromise)
            .then(firstChapters => {
              const storyData = compileFirstStoryData(recentStories, firstChapters);
              res.json({ storyData });
            });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error: Could not retrieve stories');
    });
});


module.exports = router;