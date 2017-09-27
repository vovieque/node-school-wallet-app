'use strict';

const TransactionsModel = require('source/models/transactions');

module.exports = async (ctx) => {
	const transaction = ctx.request.body;
	const transactionsModel = new TransactionsModel();
	const newTransaction = await transactionsModel.create(transaction);
	ctx.status = 201;
	ctx.body = newTransaction;
};
