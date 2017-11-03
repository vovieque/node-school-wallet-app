'use strict';

module.exports = async (ctx) => {
	const cardId = ctx.params.id;
	const userId = ctx.state.user.id;

	const operation = ctx.request.body;
	const {target, sum} = operation;

	await ctx.cardsModel.withdraw(cardId, sum);
	await ctx.cardsModel.refill(target, sum);

	const sourceCard = await ctx.cardsModel.get(cardId);
	const targetCard = await ctx.cardsModel.get(target);

	const transaction = await ctx.transactionsModel.create({
		cardId: sourceCard.id,
		userId,
		type: 'withdrawCard',
		data: {
			cardNumber: targetCard.cardNumber
		},
		time: new Date().toISOString(),
		sum
	});

	ctx.status = 200;
	ctx.body = transaction;
};
