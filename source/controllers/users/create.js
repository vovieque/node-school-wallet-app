'use strict';

module.exports = async (ctx) => {
	const user = ctx.request.body;
	const newCard = await ctx.usersModel.create(user);
	ctx.status = 201;
	ctx.body = newCard;
};
