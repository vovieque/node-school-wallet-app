'use strict';

const ApplicationError = require('../../../libs/application-error');

const allowedTypes = ['prepaidCard', 'paymentMobile', 'card2Card'];
const requiredFields = ['sum', 'type', 'data'];

module.exports = async (ctx) => {
	const transaction = {
		type: ctx.request.body.type,
		sum: ctx.request.body.sum,
		data: ctx.request.body.data,
		time: ctx.request.body.time
	}
	
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
