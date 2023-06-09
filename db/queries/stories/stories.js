const createStory = require("./create");
const removeStory = require("./remove");
const approveChapter = require("./approve");
const getStoriesByUserId = require("./getStoriesByUser");
const getData = require("./getData");
const recentStories = require("./recent");
const completedStories = require("./complete");
const storyOfChapter = require("./storyOfChapter");
const getAuthor = require("./getAuthor");


module.exports = {
  create: createStory,
  /**
   * Creates a story with the first chapter in the database.
   * @param {string} title - The title of the story.
   * @param {number} chapter_id - The ID of the first chapter.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the story creation.
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
  getStoriesByUserId,
  /**
   * Retrieves an array of story IDs associated with a given user ID.
   * @param {number} user_id - The ID of the user.
   * @returns {Promise<number[]>} A promise that resolves to an array of story IDs.
   */
  getData,
  /**
   * Retrieves a row by its ID from the stories table in the database.
   * @param {number} id - The ID of the row.
   * @returns {Promise<Object|null>} A promise that resolves to the row object if found, or null if not found.
   */
  complete: completedStories,
  /**
   * Retrieves the author user ID of a story.
   * @param {number} story_id - The ID of the story.
   * @returns {Promise<number>} A promise that resolves to the author user ID.
   */
  author: getAuthor,
  /**
   * Retrieves an array of story IDs of the most recently updated stories.
   * @param {number} limit - The maximum number of stories to retrieve.
   * @returns {Promise<number[]>} A promise that resolves to an array of story IDs.
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
