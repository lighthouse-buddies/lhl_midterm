const createVote = require('./create');
const removeVote = require('./remove');
const  getChapterCount = require('./getChapter');
const voteExists = require('./exists');

module.exports = {
  create: createVote,/**
   * Creates a vote for a chapter in the database.
   * @param {number} user_id - The ID of the user.
   * @param {number} chapter_id - The ID of the chapter to vote for.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the vote creation.
   */
  remove: removeVote,/**
   * Removes a vote for a chapter from the database.
   * @param {number} user_id - The ID of the user.
   * @param {number} chapter_id - The ID of the chapter to remove the vote from.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the vote removal.
   */
  getChapter: getChapterCount,/**
   * Retrieves the total count of votes for a given chapter ID.
   *
   * @param {number} chapterId - The ID of the chapter.
   * @returns {Promise<number>} - A promise that resolves to the total count of votes for the specified chapter.
   */
  exists: voteExists
};
