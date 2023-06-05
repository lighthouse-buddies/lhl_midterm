// import all functions to do with querying the chapters table
//this file is for exporting all functions to do with retrieving information from the chapters table

//TODO get previous chapter by chapter id
//TODO get next chapters by chapter id -> []
//TODO get approved next chapter by chapter id

const create = require("./createChapter");
const getById = require("./getChapterById");
const getNextChapters = require("./getNextChapters");
const remove = require("./removeChapter");

module.exports = {
  create,
  getById,
  getNextChapters,
  remove,
}
