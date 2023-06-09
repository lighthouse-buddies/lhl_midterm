const queries = require("../../db/queries/queries");

//NOT WORKING because of queries.chapters.getById. Everything else working fine. Issue with db function
// GET Route handler for rendering HTML template stories_show using the chapter data. Also renders the username and storytitle as template vars.
const chaptersIdGetHandler = (req, res) => {
  const chapterId = req.params.id;

  queries.chapters.getData(chapterId)
    .then((chapter) => {
      if (chapter !== null) {
        const userId = chapter.user_id;
        const currentChapterNumber = chapter.prev + 1;

        const usernamePromise = queries.users.getData(userId).then((user) => user.username);
        const storyIdPromise = queries.stories.storyOfChapter(chapterId).then((story) => story.story_id);
        const storyTitlePromise = queries.stories.getData(storyIdPromise).then((story) => story.title);

        Promise.all([usernamePromise, storyTitlePromise])
          .then(([username, storyTitle, chapterCount]) => {
            const templateVars = {
              chapter,
              username,
              storyTitle,
              currentChapterNumber
            };
            res.render('stories_show', templateVars);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error retrieving data');
          });
      } else {
        res.status(404).send('Chapter not found');
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error retrieving chapter');
    });
}

module.exports = chaptersIdGetHandler;
