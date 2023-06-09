const queries = require("../../db/queries/queries");

// GET Route handler for rendering HTML template stories_show using the chapter data. Also renders the username, story title, and chapter number as template vars.
const chaptersIdGetHandler = (req, res) => {
  const chapterId = req.params.id;

  // Retrieve the chapter data, story ID, and votes using Promise.all
  Promise.all([
    queries.chapters.getData(chapterId),
    queries.stories.storyOfChapter(chapterId),
    queries.votes.getChapter(chapterId),
    queries.chapters.getChapterNumber(chapterId)
  ])
    .then(([chapter, storyId, votes, chapterNumber]) => {
      // Retrieve the user and story data
      Promise.all([
        queries.users.getData(chapter.user_id),
        queries.stories.getData(storyId)
      ])
        .then(([user, story]) => {
          // Prepare the template variables
          const templateVars = {
            chapter,
            complete: story.complete,
            username: user.name,
            storyTitle: story.title,
            currentChapterNumber: chapterNumber,
            storyId,
            votes,
            stories: [],
            userCookie: req.session.userId
          };

          // Render the 'stories_show' template and pass the template variables to the response
          res.render('stories_show', templateVars);
        })
        .catch(error => {
          console.error('Error retrieving user or story data:', error);
          // Handle the error as needed
        });
    })
    .catch(error => {
      console.error('Error retrieving data:', error);
      // Handle the error as needed
    });
};

module.exports = chaptersIdGetHandler;
