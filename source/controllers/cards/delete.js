'use strict';

const CardsModel = require('source/models/cards');

module.exports = async (ctx) => {
	const cardId = Number(ctx.params.id);
	const cardsModel = new CardsModel();
	await cardsModel.remove(cardId);
	ctx.status = 200;
};
