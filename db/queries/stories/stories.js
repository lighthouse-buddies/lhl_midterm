//import all functions to do with querying stories from the database to this file
// this file is for exporting all those functions

//TODO get story by id
//TODO get story ids by user id
//TODO get story by chapter id

const createStory = require("./createStory");
const removeStory = require("./removeStory");
const approveChapter = require("./approveChapter");
const getStoriesByUserId = require("./getStoriesByUserId");
const getTitleById = require("./getTitleById");

module.exports = {
  create: createStory,
  remove: removeStory,
  approve: approveChapter,
  getStoriesByUserId,
  getTitleById
}
