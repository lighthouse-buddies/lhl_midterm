

const queries = require('../db/queries/queries');
// Helper functions for stories-api:

/**
 * Compiles the last story data and last chapter data into appropriate categories
 * in order to make rendering to a template easier.
 * @param {Array} stories - Array of story objects
 * @param {Array} lastChapters - Array of last chapter objects
 * @returns {Object} - Object containing completed and in-progress story data
 */
const compileLastStoryData = (stories, lastChapters) => {
  let storyData = {
    completed: [],
    inProgress: []
  };

  for (let i = 0; i < stories.length; i++) {
    for (let j = 0; j < lastChapters.length; j++) {
      if (stories[i].last_chapter_id === lastChapters[j].id) {
        if (!stories[i].complete) {
          storyData.inProgress.push({
            story: stories[i],
            lastChapter: lastChapters[j]
          });
        } else {
          storyData.completed.push({
            story: stories[i],
            lastChapter: lastChapters[j]
          });
        }
      }
    }
  }
  return storyData;
};


/**
 * Compiles the first story data and first chapter data into appropriate categories
 * in order to make rendering via client on the homepage easier.
 * @param {Array} stories - Array of story objects
 * @param {Array} firstChapters - Array of first chapter objects
 * @returns {Object} - Object containing completed and in-progress story data
 */
const compileFirstStoryData = (stories, firstChapters) => {
  let storyData = {
    completed: [],
    inProgress: []
  };

  for (let i = 0; i < stories.length; i++) {
    for (let j = 0; j < firstChapters.length; j++) {
      if (stories[i].first_chapter_id === firstChapters[j].id) {
        if (!stories[i].complete) {
          storyData.inProgress.push({
            story: stories[i],
            firstChapter: firstChapters[j]
          });
        } else {
          storyData.completed.push({
            story: stories[i],
            firstChapter: firstChapters[j]
          });
        }
      }
    }
  }
  return storyData;
};


// Helper functions for chapters-api...

/**
 * Fetches chapter data for a given chapter ID.
 * @param {number} chapterId - ID of the chapter to fetch data for
 * @param {Promise} nextApprovedPromise - Promise for fetching the next approved chapter
 * @param {Promise} nextChaptersPromise - Promise for fetching the next chapters
 * @returns {Promise} - Promise that resolves to an object containing the chapter data
 */
const fetchChapterData = (chapterId, nextApprovedPromise, nextChaptersPromise) => {
  const chapterData = {};

  return queries.chapters.getData(chapterId)
    .then(async (chapter) => {
      if (chapter !== null) {
        const userId = chapter.user_id;
        const currentChapterNumber = chapter.prev + 1;

        const usernamePromise = queries.users.getData(userId).then((user) => user.username);
        const storyIdPromise = queries.stories.storyOfChapter(chapterId).then((story) => story.story_id);
        const storyTitlePromise = queries.stories.getData(await storyIdPromise).then((story) => story.title);

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
