'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const getCardsController = require('./controllers/get-cards');
const createCardController = require('./controllers/create-card');
const deleteCardController = require('./controllers/delete-card');
const errorController = require('./controllers/error');

const app = express();

app.use(bodyParser.json());
app.param(['id'], (req, res, next) => next());

app.get('/cards/', getCardsController);
app.post('/cards/', createCardController);
app.delete('/cards/:id', deleteCardController);
app.all('/error', errorController);

app.listen(3000, () => {
	console.log('Application started');
});
