'use strict';

module.exports = async (ctx) => {
	const user = ctx.state.user;
	const cards = await ctx.cardsModel.getByUserId(user.id);
	ctx.body = await ctx.transactionsModel.getByCardIds(cards.map(c => c.id));
};
