'use strict';

const CardsModel = require('../models/cards');

module.exports = async (ctx) => {
	ctx.body = new CardsModel().getAll();
};
