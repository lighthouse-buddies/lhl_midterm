const express = require('express');
const router = express.Router();
const votesDeleteHandler = require('./delete');
const votesPostHandler = require('./post');
const votesChapterCountGetHandler = require('./chapterCountGet');
const votesExistsGetHandler = require('./existsGet');
// POST creating a vote
router.post('/', votesPostHandler);

// GET route for vote count of a chapter
router.get('/chapter/count', votesChapterCountGetHandler);

// DELETE removing a vote
router.delete('/', votesDeleteHandler);

router.get('/exists',votesExistsGetHandler)

module.exports = router;
