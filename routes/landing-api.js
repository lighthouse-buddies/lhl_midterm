const express = require('express');
const loginHandler = require("./landing/login");
const registerHandler = require("./landing/login");
const storiesIndexHandler = require("./landing/storiesIndex");
const logoutGetHandler = require("./landing/logoutGet");
const landingApi = express.Router();

landingApi.get('/login', loginHandler.get);
landingApi.post('/login', loginHandler.post);
landingApi.get('/register', registerHandler.get);
landingApi.post('/register', registerHandler.post);
landingApi.get('/logout', logoutGetHandler);
landingApi.get('/', storiesIndexHandler);

module.exports = landingApi;
