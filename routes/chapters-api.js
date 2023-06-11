const express = require('express');
const chaptersApi = express.Router();

const chaptersNewGetHandler = require('./chapters/page/newGet');
const chaptersNewPostHandler = require('./chapters/newPost');
const chaptersIdGetHandler = require('./chapters/page/idGet');
const chaptersDeleteHandler = require('./chapters/idDelete');
const chaptersIdGetJsonHandler = require('./chapters/data/idGetJson');
const chaptersPreviewGetHandler = require('./chapters/data/previewGet');

// GET route to create new chapter
chaptersApi.get('/new', chaptersNewGetHandler);
// POST route to create a new chapter
chaptersApi.post('/new', chaptersNewPostHandler);
// GET route to get JSON data from chapter by id

chaptersApi.get('/preview', chaptersPreviewGetHandler);
chaptersApi.get('/:id/json', chaptersIdGetJsonHandler);
// GET route to render chapter by id

// Route to remove a chapter by ID
chaptersApi.post('/:id/delete', chaptersDeleteHandler);
chaptersApi.get('/:id', chaptersIdGetHandler);

module.exports = chaptersApi;
