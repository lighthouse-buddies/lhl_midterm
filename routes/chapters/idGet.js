const queries = require("../../db/queries/queries");

// GET Route handler for rendering HTML template stories_show using the chapter data. Also renders the username, story title, and current chapter number as template vars.
const chaptersIdGetHandler = (req, res) => {
  const chapterId = req.params.id;

  // Retrieve the chapter data from the database using queries.chapters.getData function
  queries.chapters.getData(chapterId)
    .then(chapter => {
      // Retrieve the story ID associated with the chapter using queries.stories.storyOfChapter function
      queries.stories.storyOfChapter(chapterId)
        .then(storyId => {
          // Retrieve the title of the story using queries.stories.getData function
          queries.stories.getData(storyId)
            .then(story => {
              // Retrieve the user ID from the chapter data
              const userId = chapter.user_id;

              // Retrieve the user's name using queries.users.getData function
              queries.users.getData(userId)
                .then(user => {
                  // Assuming you have the currentChapterNumber available
                  const currentChapterNumber = 1;

                  // Prepare the template variables
                  const templateVars = {
                    chapter,
                    username: user.name,
                    storyTitle: story.title,
                    currentChapterNumber,
                    storyId,
                    //IMPLEMENT
                    stories : [],
                    userCookie: req.session.userId
                  };

                  // Render the 'stories_show' template and pass the template variables to the response
                  res.render('stories_show', templateVars);
                })
                .catch(error => {
                  console.error('Error retrieving user data:', error);
                  // Handle the error as needed
                });
            })
            .catch(error => {
              console.error('Error retrieving story data:', error);
              // Handle the error as needed
            });
        })
        .catch(error => {
          console.error('Error retrieving story ID:', error);
          // Handle the error as needed
        });
    })
    .catch(error => {
      console.error('Error retrieving chapter:', error);
      // Handle the error as needed
    });
};

module.exports = chaptersIdGetHandler;
