'use strict';

module.exports = async (ctx) => {
	const userId = ctx.state.user.id;
	ctx.body = await ctx.cardsModel.getAll(userId);
};
