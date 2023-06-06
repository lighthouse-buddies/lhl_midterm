
const createStory = require("./create");
const removeStory = require("./remove");
const approveChapter = require("./approve");
const getStoriesByUserId = require("./getStoriesByUser");
// const getTitleById = require("./getTitleById");
const getData = require("./getData");

module.exports = {

  create: createStory,/**
   * Creates a story with the first chapter in the database.
   * @param {string} title - The title of the story.
   * @param {number} chapter_id - The ID of the first chapter.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the story creation.
   */
  remove: removeStory,/**
   * Removes a story from the database.
   * @param {number} id - The ID of the story to remove.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the story removal.
   */
  approve: approveChapter,/**
   * Approves a chapter by adding it as the last chapter of a story in the database.
   * @param {number} story_id - The ID of the story.
   * @param {number} chapter_id - The ID of the chapter to approve.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the approval.
   */
  getStoriesByUserId, /**
   * Retrieves an array of story IDs associated with a given user ID.
   * @param {number} user_id - The ID of the user.
   * @returns {Promise<number[]>} A promise that resolves to an array of story IDs.
   */
  // getTitleById,
  //TODO getData?
  getData: getData , /**
   * Retrieves a row by its ID from the stories table in the database.
   * @param {number} id - The ID of the row.
   * @returns {Promise<Object|null>} A promise that resolves to the row object if found, or null if not found.
   */
}
