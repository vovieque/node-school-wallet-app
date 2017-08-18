'use strict';

const CardsModel = require('source/models/cards');

module.exports = async (ctx) => {
	ctx.body = await new CardsModel().getAll();
};
