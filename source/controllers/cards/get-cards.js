'use strict';

module.exports = async (ctx) => {
	ctx.body = await ctx.cardsModel.getByUserId(ctx.state.user.id);
};
