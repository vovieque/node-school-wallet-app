'use strict';

const TransactionsModel = require('source/models/transactions');

module.exports = async (ctx) => {
	const cardId = Number(ctx.params['id']);
	const transactionsModel = new TransactionsModel();
	ctx.body = await transactionsModel.get(cardId);
};
