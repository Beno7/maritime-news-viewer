const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const {ResponseFactory} = require('../factories');
const express = require('express');
const path = require('path');

module.exports = (app) => {
  // Allow Cross Origin Access
  app.use(cors());
  // Define JSON String Parser
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
  // Define Routes
  app.use('/api/news', require('./news'));
  // Set Client Build Path as Static
  app.use(express.static(path.join(__dirname, '../../dist/news-viewer')));
  // Define Default Error Handler
  app.use((req, res, next) => res.status(404).json(ResponseFactory('error', 'FILE_NOT_FOUND')));
};
