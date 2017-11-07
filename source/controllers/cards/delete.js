'use strict';

module.exports = async (ctx) => {
	const cardId = Number(ctx.params.id);
	await ctx.cardsModel.remove(cardId, ctx.state.user.id);
	ctx.status = 200;
};