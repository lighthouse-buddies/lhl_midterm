const createStory = require("./create");
const removeStory = require("./remove");
const approveChapter = require("./approve");
const getStoriesByUserId = require("./storiesOfUser");
const getData = require("./getData");
const recentStories = require("./recent");
// const completedStories = require("./complete");
const storyOfChapter = require("./storyOfChapter");
const getAuthor = require("./author");
const setCompletion = require("./setCompletion");


module.exports = {
  create: createStory,
  /**
   * Creates a story with the first chapter in the database.
   * @param {string} title - The title of the story.
   * @param {number} chapter_id - The ID of the first chapter.
   * @returns {Promise<number|null>} A promise that resolves to the ID of the created story, or null if creation fails.
   */
  remove: removeStory,
  /**
   * Removes a story from the database.
   * @param {number} id - The ID of the story to remove.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the story removal.
   */
  approve: approveChapter,
  /**
   * Approves a chapter by adding it as the last chapter of a story in the database.
   * @param {number} story_id - The ID of the story.
   * @param {number} chapter_id - The ID of the chapter to approve.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the approval.
   */
  storiesOfUser: getStoriesByUserId,
  /**
   * Retrieves an array of story IDs associated with a given user ID.
   * @param {number} user_id - The ID of the user.
   * @returns {Promise<number[]>} A promise that resolves to an array of story IDs.
   */
  getData: getData,
  /**
   * Retrieves a row by its ID from the stories table in the database.
   * @param {number} id - The ID of the row.
   * @returns {Promise<Object|null>} A promise that resolves to the row object if found, or null if not found.
   */
  // completion: completedStories,
  setCompletion: setCompletion,
  /**
   * takes in story id and bool for completion value
   */

  author: getAuthor,
  /**
   * Retrieves the author user ID of a story.
   * @param {number} story_id - The ID of the story.
   * @returns {Promise<number>} A promise that resolves to the author user ID.
   */
  recent: recentStories,
  // recent: (limit) => {
  //   return new Promise((resolve, reject) => {
  //     let arr = [];
  //     for (let i = 0; i < limit; i++) {
  //       arr.push(1);
  //     }
  //     resolve(arr);
  //   });
  // },
  /**
   * Retrieves the story ID associated with a given chapter ID.
   * @param {number} chapter_id - The ID of the chapter.
   * @returns {Promise<number>} A promise that resolves to the story ID.
   */
  storyOfChapter: storyOfChapter,
};
