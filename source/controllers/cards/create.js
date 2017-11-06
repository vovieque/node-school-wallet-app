'use strict';

module.exports = async (ctx) => {
	const card = ctx.request.body;
	card.userId = ctx.state.user.id;
	const newCard = await ctx.cardsModel.create(card);
	ctx.status = 201;
	ctx.body = newCard;
};
