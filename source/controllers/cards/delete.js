'use strict';

module.exports = async (ctx) => {
	const cardId = Number(ctx.params['id']);
	await ctx.CardsModel.remove(cardId);
	ctx.status = 200;
};
