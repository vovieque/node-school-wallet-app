'use strict';

module.exports = async (ctx) => {
	ctx.body = await ctx.CardsModel.getAll();
};
