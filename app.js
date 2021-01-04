const express = require('express');

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(notFound);
app.use(errorHandler);

module.exports = app;
