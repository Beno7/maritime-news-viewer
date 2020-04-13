'use strict';

var express = require('express');
var controller = require('./news.controller');
// Retrieve express router
var router = express.Router();
// Define Route
router.get('/', controller.getNews);
router.get('/sources', controller.getSources);
// Expose configurated Router
module.exports = router;
