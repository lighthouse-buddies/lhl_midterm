const create = require("./create");
const getData = require("./getData");
const nextChapters = require("./nextChapters");
const remove = require("./remove");
const getUsername = require("./getUsername")
const nextApproved = require("./nextApproved");
// const nextApproved = require("./*nextApproved");
const chapterNumber = require("./chapterNumber");
const getPreviewData = require("./getPreviewData");

module.exports = {
  create: create,/**
   * Creates a new chapter in the database.
   * @param {string} content - The content of the chapter.
   * @param {number|null} prev - The ID of the previous chapter (if any).
   * @param {number} user_id - The ID of the user creating the chapter.
   * @returns {Promise<object>} A promise that resolves to the chapter ID (as a number) if the chapter is created successfully, or null if the chapter creation fails.
   */
  getData: getData, //TODO? change to getData data?
  /**
   * Retrieves a chapter by its ID.
   * @param {number} id - The ID of the chapter.
   * @returns {Promise<Object|null>} A promise that resolves to an object containing the chapter details if found, or null if not found.
   */
  getNextChapters: nextChapters,/**
   * Retrieves the next chapter IDs for a given chapter ID.
   * @param {number} chapter_id - The ID of the current chapter.
   * @returns {Promise<Array<number>>} A promise that resolves to an array of next chapter IDs if found, or an empty array if not found.
   */
  remove: remove,/**
   * Soft deletes a story from the database by setting the "deleted_at" field.
   * @param {number} id - The ID of the story to be soft deleted.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the operation.
   */
  getUsername,
  /**
 * Retrieves the username of a user based on the user_id in the chapters table.
 * @param {number} user_id - The ID of the user.
 * @returns {Promise<string>} A promise that resolves to the username.
 */
  nextApproved: nextApproved,/**
   * Retrieves the next chapter IDs for a given chapter ID.
   * @param {number} chapter_id - The ID of the current chapter.
   * @returns {Promise<number>} A promise that resolves to the next approved chapter ID if found, or null if not found.
   */
  getChapterNumber: chapterNumber,

  getPreviewData: getPreviewData,

};
