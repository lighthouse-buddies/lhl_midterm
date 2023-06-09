//HELPER FUNCTIONS for stories-api:

//check if the story is complete or not
//then the story data and last chapter data to appropriate category
//in order to make rendering to template easier
const queries = require("../db/queries/queries");
const compileLastStoryData = (stories, lastChapters) => {
  let storyData = {
    completed: [],
    inProgress: []
  };

  for (let i = 0; i < stories.length; i++) {
    for (let j = 0; j < lastChapters.length; j++) {
      if (stories[i].last_chapter_id === lastChapters[j].id) {
        if (!stories[i].complete) {
          storyData.inProgress.push(
            {
              story: stories[i],
              lastChapter: lastChapters[j]
            }
          );
        } else {
          storyData.completed.push(
            {
              story: stories[i],
              lastChapter: lastChapters[j]
            }
          );
        }
      }
    }
  }
  return storyData;
};


//does the same thing as compileLastStoryData but for first chapters (which we will be rendering via client on homepage)
const compileFirstStoryData = (stories, firstChapters) => {
  let storyData = {
    completed: [],
    inProgress: [],
  };

  for (let i = 0; i < stories.length; i++) {
    for (let j = 0; j < firstChapters.length; j++) {
      if (stories[i].first_chapter_id === firstChapters[j].id) {
        if (!stories[i].complete) {
          storyData.inProgress.push(
            {
              story: stories[i],
              firstChapter: firstChapters[j]
            }
          );
        } else {
          storyData.completed.push(
            {
              story: stories[i],
              firstChapter: firstChapters[j]
            }
          );
        }
      }
    }
  }
  return storyData;
};


//HELPER FUNCTIONS for chapters-api...
// //HELPER FUNCTIONS:
// // Function to fetch chapter data.
// // RETURNS: an object {username, chapterNumber, chapter object {id, content, prev, user_id, created_at, deleted_at}, story title}
const fetchChapterData = (chapterId, nextApprovedPromise, nextChaptersPromise) => {
  const chapterData = {};

  return queries.chapters.getData(chapterId)
    .then((chapter) => {
      if (chapter !== null) {
        const userId = chapter.user_id;
        const currentChapterNumber = chapter.prev + 1;

        const usernamePromise = queries.users.getData(userId).then((user) => user.username);
        const storyIdPromise = queries.stories.storyOfChapter(chapterId).then((story) => story.story_id);
        const storyTitlePromise = queries.stories.getData(storyIdPromise).then((story) => story.title);

        return Promise.all([usernamePromise, storyTitlePromise, nextApprovedPromise, nextChaptersPromise])
          .then(([username, storyTitle, nextApprovedChapter, nextChapters]) => {
            chapterData.currentChapter = {
              username,
              chapterNumber: currentChapterNumber,
              chapter,
              storyTitle,
            };
            chapterData.nextChapters = nextChapters;
            chapterData.nextApproved = nextApprovedChapter;

            return chapterData;
          });
      } else {
        throw new Error('Chapter not found');
      }
    })
    .catch((error) => {
      console.error(error);
      throw new Error('Error retrieving chapter');
    });
};




module.exports = { compileLastStoryData, fetchChapterData, compileFirstStoryData };
