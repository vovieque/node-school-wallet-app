'use strict';

module.exports = async (ctx) => {
	const card = ctx.request.body;
	const userId = ctx.state.user.id;
	const newCard = await ctx.cardsModel.create(card, userId);
	ctx.status = 201;
	ctx.body = newCard;
};
