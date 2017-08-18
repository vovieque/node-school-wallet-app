'use strict';

const CardsModel = require('../models/cards');

module.exports = async (ctx) => {
	const card = ctx.request.body;
	const cardsModel = new CardsModel();
	const newCard = await cardsModel.create(card);
	ctx.status = 201;
	ctx.body = newCard;
};
