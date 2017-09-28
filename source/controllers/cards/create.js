'use strict';

module.exports = async (ctx) => {
	const card = ctx.request.body;
	const newCard = await ctx.cardsModel.create(card);
	ctx.status = 201;
	ctx.body = newCard;
};
