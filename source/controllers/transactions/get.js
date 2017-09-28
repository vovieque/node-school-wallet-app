'use strict';

const TransactionsModel = require('source/models/transactions');

module.exports = async (ctx) => {
	const cardId = Number(ctx.params['id']);
	ctx.body = await ctx.transactionsModel.getForCard(cardId);
};
