//takes in story id and returns a promise (number) which is the user id
// const db = require('../../connection');
const {Story, Chapter} = require("../../sequelize");
/**
 * Retrieves the author user ID of a story.
 * @param {number} story_id - The ID of the story.
 * @returns {Promise<number>} A promise that resolves to the author user ID.
 */
async function author(story_id){
  const story = await Story.findByPk(story_id);
  if(!story){
    throw new Error(`Story with id ${story_id} not found`);
  }
  const chapter = await Chapter.findByPk(story.first_chapter_id);
  return chapter.user_id;

}

module.exports = author;
