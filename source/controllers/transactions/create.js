'use strict';

const ApplicationError = require('../../../libs/application-error');
const _ = require('lodash');

const allowedTypes = ['prepaidCard', 'paymentMobile', 'card2Card'];
const requiredFields = ['sum', 'type', 'data'];
const postTransactionFields = ['type', 'time', 'sum', 'data'];

module.exports = async (ctx) => {
	const transaction = _.pick(ctx.request.body, postTransactionFields);
	const cardId = Number(ctx.params.id);

	const card = await ctx.cardsModel.get(cardId);
	if (!card) {
		throw new ApplicationError(`No card with id ${cardId}`, 404);
	}
	transaction.cardId = cardId;

	const missingFields = requiredFields.filter((field) => !Object.prototype.hasOwnProperty.call(transaction, field));

	if (missingFields.length) {
		throw new ApplicationError(`No required fields: ${missingFields.join()}`, 400);
	}

	if (!allowedTypes.includes(transaction.type)) {
		throw new ApplicationError(`forbidden transaction type: ${transaction.type}`, 403);
	}

	if (transaction.time && !Date.parse(transaction.time)) {
		throw new ApplicationError('Invalid transaction time', 400);
	}

	if (!transaction.time) {
		transaction.time = (new Date()).toISOString();
	}

	const newTransaction = await ctx.transactionsModel.create(transaction);
	ctx.status = 201;
	ctx.body = newTransaction;
};
