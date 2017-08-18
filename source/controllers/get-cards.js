'use strict';

const CardsModel = require('../models/cards');

module.exports = (req, res) => res.json(new CardsModel().getAll());
